"use server";

import { createAndroidManagementClient } from "@/actions/emm/client";
import { getGooglePolicyData } from "@/app/(main)/lib/get-policy-data";
import { PolicySummary } from "@/app/types/policy";
import { createClient } from "@/lib/supabase/server";
import { Json } from "@/types/database";
import { androidmanagement_v1 } from "googleapis";
import { revalidatePath } from "next/cache";
import { listPolicyDetails } from "../../../projects/data/policy";
import { AndroidManagementDevice } from "@/app/types/device";
import { saveAndroidManagementPolicy } from "../../actions/save-android-management-policy";

type NextPageToken = string | null | undefined;
type ListDevicesResponse = androidmanagement_v1.Schema$ListDevicesResponse;

/**
 * ポリシーをDBに保存する関数
 * @param allDevices デバイスの配列
 * @param enterprisesTableId エンタープライズID
 * @param supabase Supabaseクライアント
 */
const saveDevicesToDB = async (
  devices: AndroidManagementDevice[],
  enterpriseId: string,
  policyDetails: PolicySummary[]
) => {
  const supabase = await createClient();

  // デバイスリストを作成
  const devicesList = devices.map(async (device: AndroidManagementDevice) => {
    if (!device.name || !device.policyName) return;

    // policyTableにないデータがある場合は、googleサーバーから不明なポリシーデータを取得する。
    // Googleサーバーとの同期では、デバイスのポリシーがない場合があるため、ポリシーデータを取得できない場合は、'不明なポリシー'としてDBに保存する。
    if (!policyDetails.find((policy) => policy.name === device.policyName)) {
      // ポリシーデータを取得
      const policyData = await getGooglePolicyData({
        policyName: device.policyName,
      });
      // ポリシーデータをDBに保存
      const saveData = await saveAndroidManagementPolicy({
        enterpriseId,
        policyDisplayName: "不明なポリシー",
        policyData,
      });
      // policyTableIdsに追加
      policyDetails.push({
        policyId: saveData.policy_id,
        name: device.policyName,
        policyDisplayName: saveData.policy_display_name,
      });
    }

    return {
      enterprise_id: enterpriseId,
      policy_id: policyDetails.find(
        (policy) => policy.name === device.policyName
      )?.policyId,
      device_identifier: device.name.split(
        `enterprises/${enterpriseId}/devices/`
      )[1],
      is_licensed: true, // あとで、subscription_idを取得して、subscription_idがある場合はtrue,ない場合はfalseにする
      device_data: device,
      updated_at: new Date().toISOString(),
    };
  });
  // undefinedを除外
  const resolvedDevicesList = (await Promise.all(devicesList)).filter(
    (device): device is NonNullable<typeof device> => device !== undefined
  );
  type ResolvedDeviceData = {
    enterprise_id: string;
    policy_id: string | undefined;
    device_identifier: string;
    is_licensed: boolean;
    device_data: AndroidManagementDevice;
    updated_at: string;
  };
  // upsertする共通データを作成
  const createBaseDeviceData = (device: ResolvedDeviceData) => ({
    device_identifier: device.device_identifier,
    enterprise_id: device.enterprise_id,
    updated_at: device.updated_at,
  });
  // デバイス履歴データの作成
  const devicesHistoriesList = resolvedDevicesList.map((device) => ({
    enterprise_id: device.enterprise_id,
    device_identifier: device.device_identifier,
    device_response_data: device.device_data as Json,
  }));
  // デバイスデータの作成
  const upsertDevices = resolvedDevicesList.map((device) => {
    const baseData = createBaseDeviceData(device);
    const deviceData = device.device_data as AndroidManagementDevice;
    // 特定のイベントデータを除外
    const mainDeviceData = { ...deviceData };
    delete mainDeviceData.applicationReports;
    delete mainDeviceData.memoryEvents;
    delete mainDeviceData.powerManagementEvents;
    return {
      ...baseData,
      policy_id: device.policy_id,
      is_licensed: device.is_licensed,
      device_data: mainDeviceData as Json,
    };
  });

  // アプリケーションデータの作成
  const upsertApplicationReports = resolvedDevicesList.map((device) => ({
    ...createBaseDeviceData(device),
    application_report_data: {
      applicationReports: (device.device_data as AndroidManagementDevice)
        .applicationReports,
    } as Json,
  }));
  // メモリデータの作成
  const upsertMemoryEvents = resolvedDevicesList.map((device) => ({
    ...createBaseDeviceData(device),
    memory_event_data: {
      memoryEvents: (device.device_data as AndroidManagementDevice)
        .memoryEvents,
    } as Json,
  }));
  // デバイスの電源管理データの作成
  const upsertPowerManagementEvents = resolvedDevicesList.map((device) => ({
    ...createBaseDeviceData(device),
    power_management_event_data: {
      powerManagementEvents: (device.device_data as AndroidManagementDevice)
        .powerManagementEvents,
    } as Json,
  }));

  const { error } = await supabase.rpc("upsert_device_data", {
    devices: upsertDevices,
    application_reports: upsertApplicationReports,
    memory_events: upsertMemoryEvents,
    power_management_events: upsertPowerManagementEvents,
    device_histories: devicesHistoriesList,
  });

  if (error) {
    throw new Error(`Failed to save device data: ${error.message}`);
  }
};

/**
 * Googleサーバーとデバイス情報を同期する関数
 * @param enterpriseId
 * @returns デバイスの配列
 * 参考URL:https://developers.google.com/android/management/reference/rest/v1/enterprises.devices/list
 * ライブラリ:https://googleapis.dev/nodejs/googleapis/latest/androidmanagement/classes/Resource$Enterprises$Devices.html#list
 */
export const syncDevicesWithGoogle = async (enterpriseId: string) => {
  // 認証
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }
  let nextPageToken: NextPageToken = undefined;
  const policyDetails = await listPolicyDetails(enterpriseId);
  const enterpriseName = `enterprises/${enterpriseId}`;
  const androidmanagement = await createAndroidManagementClient();
  do {
    const { data } = await androidmanagement.enterprises.devices
      .list({
        parent: enterpriseName,
        pageSize: 20, // 1回のAPI呼び出しで取得する端末数
        pageToken: nextPageToken,
      })
      .catch((error) => {
        console.error("Error Get device list:", error.message);
        throw new Error(error.message);
      });
    const { devices, nextPageToken: token } = data as ListDevicesResponse;
    if (!devices?.length) break; //空の[]も除外

    // 新しく取得したデバイスのみを保存
    await saveDevicesToDB(devices, enterpriseId, policyDetails);
    nextPageToken = token;
  } while (nextPageToken);
  revalidatePath(`/${enterpriseId}/devices`);
};
