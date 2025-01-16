import "server-only";

import { getGooglePolicyData } from "@/app/(main)/lib/get-policy-data";
import { AndroidManagementDevice } from "@/app/types/device";

import { createAdminClient } from "@/lib/supabase/admin";
import { Json } from "@/types/database";

import { PolicySummary } from "@/app/types/policy";

const getAdminListPolicyDetails = async (
  enterpriseId: string
): Promise<PolicySummary[]> => {
  // console.log("listPolicyDetails enterpriseId", enterpriseId);
  const supabase = createAdminClient();
  const { data: policyIds, error } = await supabase
    .from("policies")
    .select(
      `
      policyId:policy_id,
      policy_data->>name,
      policyDisplayName:policy_display_name
      `
    )
    .eq("enterprise_id", enterpriseId);
  // console.log("listPolicyDetails policyIds", policyIds);
  if (error) {
    console.error("Error fetching policy names:", error);
    throw new Error("Failed to fetch policies from database");
  }

  return policyIds ?? [];
};
/**
 * ポリシーの存在確認と必要に応じて保存
 * @param enterpriseId エンタープライズID
 * @param policyName ポリシー名
 * @param policyDetails ポリシーのリスト
 * @returns policy_id ポリシーID
 */
const ensurePolicy = async ({
  enterpriseId,
  policyName,
  policyDetails,
}: {
  enterpriseId: string;
  policyName?: string | null;
  policyDetails: PolicySummary[];
}): Promise<string> => {
  // console.log("ensurePolicy", policyName);
  // console.log("policyDetails", policyDetails);
  const existingPolicy = policyDetails.find(
    (policy) => policy.name === policyName
  );
  if (existingPolicy) return existingPolicy.policyId;
  const supabase = createAdminClient();
  let policyData;
  if (policyName) {
    policyData = await getGooglePolicyData({ policyName });
  }
  const { data, error } = await supabase
    .from("policies")
    .insert({
      policy_display_name: "不明なポリシー",
      enterprise_id: enterpriseId,
      policy_data: (policyData as Json) ?? {},
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to save policy: ${error.message}`);
  }
  return data.policy_id;
};

/**
 * デバイスデータから不要なイベントデータを除外
 */
const prepareDeviceData = (device: AndroidManagementDevice) => {
  const mainDeviceData = { ...device };
  delete mainDeviceData.applicationReports;
  delete mainDeviceData.memoryEvents;
  delete mainDeviceData.powerManagementEvents;
  return mainDeviceData;
};

/** この関数は試作中
 * PubSubからの通知で1端末のデータを保存する関数
 */
export const saveDeviceStatus = async ({
  enterpriseId,
  deviceIdentifier,
  device,
}: {
  enterpriseId: string;
  deviceIdentifier: string;
  device: AndroidManagementDevice;
}) => {
  const supabase = createAdminClient();
  const policyDetails = await getAdminListPolicyDetails(enterpriseId);
  const policyName = device.policyName;

  try {
    // ポリシーの確認と保存
    const policyId = await ensurePolicy({
      enterpriseId,
      policyName,
      policyDetails,
    });

    // デバイスデータの準備
    const deviceData = {
      device_identifier: deviceIdentifier,
      enterprise_id: enterpriseId,
      policy_id: policyId,
      is_licensed: true,
      device_data: prepareDeviceData(device) as Json,
      updated_at: new Date().toISOString(),
    };

    // 関連データの準備
    const applicationReportData = {
      device_identifier: deviceIdentifier,
      enterprise_id: enterpriseId,
      application_report_data: {
        applicationReports: device.applicationReports,
      } as Json,
      updated_at: new Date().toISOString(),
    };

    const memoryEventData = {
      device_identifier: deviceIdentifier,
      enterprise_id: enterpriseId,
      memory_event_data: { memoryEvents: device.memoryEvents } as Json,
      updated_at: new Date().toISOString(),
    };

    const powerManagementData = {
      device_identifier: deviceIdentifier,
      enterprise_id: enterpriseId,
      power_management_event_data: {
        powerManagementEvents: device.powerManagementEvents,
      } as Json,
      updated_at: new Date().toISOString(),
    };

    const deviceHistoryData = {
      enterprise_id: enterpriseId,
      device_identifier: deviceIdentifier,
      device_response_data: device as Json,
    };

    // トランザクション処理の実行
    const { error } = await supabase.rpc("upsert_device_data", {
      devices: [deviceData],
      application_reports: [applicationReportData],
      memory_events: [memoryEventData],
      power_management_events: [powerManagementData],
      device_histories: [deviceHistoryData],
    });
    if (error) throw error;
  } catch (error) {
    console.error(`Failed to save device ${deviceIdentifier}:`, error);
    throw new Error(`Failed to save device ${deviceIdentifier}: ${error}`);
  }
};
