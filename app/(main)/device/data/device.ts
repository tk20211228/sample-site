"use server";

import { createClient } from "@/lib/supabase/server";
import { createAndroidManagementClient } from "../../../../actions/emm/client";

export const getDevices = async (parent: string) => {
  // 認証
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }
  // デバイス一覧取得
  const androidmanagement = await createAndroidManagementClient();
  const { data } = await androidmanagement.enterprises.devices
    .list({
      parent,
    })
    .catch((error) => {
      console.error("Error Get device list:", error.message);
      throw new Error(error.message);
    });
  console.log("data", data);
  if (!data) {
    throw new Error("Get device list failed");
  }

  if (!data.devices) {
    return data;
  }
  // enterprise_name(parent) で　enterprisesテーブルからテーブルIDを取得

  const { data: enterpriseData } = await supabase
    .from("enterprises")
    .select("id")
    .eq("enterprise_name", parent)
    .single();
  if (!enterpriseData) {
    throw new Error("Enterprise not found");
  }
  const enterpriseId = enterpriseData.id;

  // dataにあるname（device_name）を使用し、devicesテーブルにアップサーとする。
  // デバイスデータをDBに保存
  const devicesToUpsert = data.devices.map((device) => ({
    enterprise_id: enterpriseId,
    device_name: device.name,
    display_name: device.name,
    // policy_table_id: device.policyName,

    //全データをJSONとして保存
    data: device, // 全データをJSONとして保存
    updated_at: new Date().toISOString(),
  }));

  const { data: deviceData } = await supabase.from("devices").insert({
    enterprise_table_id: enterpriseId,
    device_name: data.devices[0].name,
  });

  if (!data) {
    throw new Error("Get device list failed");
  }
  console.log("Get device list:", data);

  return data;
  /**data {
  devices: [
    {
      name: 'enterprises/LC00hjtlss/devices/39315584558ebe6b',
      managementMode: 'DEVICE_OWNER',
      state: 'ACTIVE',
      appliedState: 'ACTIVE',
      policyCompliant: true,
      enrollmentTime: '2024-11-12T09:06:33.658Z',
      lastStatusReportTime: '2024-11-12T18:50:27.847Z',
      lastPolicySyncTime: '2024-11-13T08:06:46.019Z',
      appliedPolicyVersion: '9',
      apiLevel: 31,
      enrollmentTokenData: '登録トークンに関連付けられた任意のデータ',
      softwareInfo: [Object],
      hardwareInfo: [Object],
      displays: [Array],
      applicationReports: [Array],
      policyName: 'enterprises/LC00hjtlss/policies/first-policy',
      appliedPolicyName: 'enterprises/LC00hjtlss/policies/first-policy',
      networkInfo: [Object],
      memoryInfo: [Object],
      memoryEvents: [Array],
      powerManagementEvents: [Array],
      hardwareStatusSamples: [Array],
      userName: 'enterprises/LC00hjtlss/users/110776456171360865967',
      enrollmentTokenName: 'enterprises/LC00hjtlss/enrollmentTokens/4jOojojIDqDw5qe5IAIysTOFOosPG1_V8-RfXk0idE0',
      previousDeviceNames: [Array],
      deviceSettings: [Object],
      systemProperties: [Object],
      securityPosture: [Object],
      ownership: 'COMPANY_OWNED',
      commonCriteriaModeInfo: [Object]
    },,
    ...
   */
};
