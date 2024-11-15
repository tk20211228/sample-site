"use server";

import { firstPolicyRequestBody } from "@/data/firstPolicyRequestBody";
import { createClient } from "@/lib/supabase/server";
import { androidmanagement_v1 } from "googleapis";
import { createAndroidManagementClient } from "./client";

export const getPolicies = async (parent: string) => {
  // 認証
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }
  // ポリシー一覧取得
  const androidmanagement = await createAndroidManagementClient();
  const { data } = await androidmanagement.enterprises.policies
    .list({
      parent,
    })
    .catch((error) => {
      console.error("Error get policies:", error.message);
      throw new Error(error.message);
    });
  console.log("data", data);
  if (!data) {
    throw new Error("Get policies failed");
  }
  console.log("Get policies list:", data);

  return data;
  /**
   * data {
        devices: [
          {
            name: 'enterprises/LC0283n6ru/devices/32a2dcff8061070f',
            managementMode: 'DEVICE_OWNER',
            state: 'ACTIVE',
            appliedState: 'ACTIVE',
            policyCompliant: true,
            enrollmentTime: '2024-11-06T10:59:23.515Z',
            lastStatusReportTime: '2024-11-06T12:54:33.715Z',
            lastPolicySyncTime: '2024-11-07T00:52:43.694Z',
            appliedPolicyVersion: '8',
            apiLevel: 31,
            hardwareInfo: [Object],
            policyName: 'enterprises/LC0283n6ru/policies/first-policy',
            appliedPolicyName: 'enterprises/LC0283n6ru/policies/first-policy',
            memoryInfo: [Object],
            userName: 'enterprises/LC0283n6ru/users/106882746189117267782',
            enrollmentTokenName: 'enterprises/LC0283n6ru/enrollmentTokens/1W-LgHgGEQL798qbrR9Ntcph9QxhGQX6b74apgoJLJA',
            securityPosture: [Object],
            ownership: 'COMPANY_OWNED'
          },
    ...
   */
};
