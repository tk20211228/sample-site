"use server";

import { createAndroidManagementClient } from "@/actions/emm/client";
import { defaultPolicyPattern } from "@/app/(main)/data/policy";
import { createClient } from "@/lib/supabase/server";
import { Json } from "@/types/database";

/**
 * ポリシーを削除
 * @param policyName
 * @returns
 */
export const deletePolicy = async (policyName: string) => {
  if (defaultPolicyPattern.test(policyName)) {
    throw new Error("デフォルトポリシーは削除できません。");
  }
  //認証
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  // DBから対象のポリシーを使用している端末を取得
  const devices = await getDevicesByPolicyName(policyName);

  // あればGoogle側デフォルトポリシーに変更する。
  // 変更したらDBにも反映
  if (devices) {
    for (const device of devices) {
      await updateDevicePolicyToDefault(device.device_name);
    }
  }

  // GoogleとDBからポリシーを削除
  const data = await deletePolicyFromGoogleAndSupabase(policyName);
  return data;
};

/**
 * 選択したポリシーを削除
 * @param policyNames
 * @returns
 */
export const deleteSelectedPolicies = async (policyNames: string[]) => {
  const policiesTableIds = [];
  for (const policyName of policyNames) {
    // デフォルトポリシーは削除できないのでスキップ
    if (defaultPolicyPattern.test(policyName)) continue;
    const data = await deletePolicy(policyName);
    policiesTableIds.push(data.split("/")[3]);
  }
  return policiesTableIds;
};

// DBから対象のポリシーを使用している端末を取得
async function getDevicesByPolicyName(policyName: string) {
  const supabase = await createClient();
  const { data: devices } = await supabase
    .from("devices")
    .select(
      `
      device_name,
      policy_name
      `
    )
    .eq("policy_name", policyName);
  return devices;
}

/**
 * 端末のポリシーをデフォルトポリシーに変更
 * @param deviceName
 * @return void
 */
async function updateDevicePolicyToDefault(deviceName: string) {
  const supabase = await createClient();
  const androidManagementClient = await createAndroidManagementClient();
  await androidManagementClient.enterprises.devices
    .patch({
      name: deviceName,
      updateMask: "policyName",
      requestBody: {
        policyName: "default",
      },
    })
    .then(async (res) => {
      const { error } = await supabase
        .from("devices")
        .update({
          policy_name: res.data.policyName,
          updated_at: new Date().toISOString(),
          device_config_data: res.data as Json,
        })
        .eq("device_name", deviceName);
      if (error) {
        console.error(error);
        throw new Error("Failed to update device on Supabase");
      }
    })
    .catch((error) => {
      console.error(error);
      throw new Error("Failed to update policy on Google");
    });
}

/**
 * GoogleとDBからポリシーを削除
 * @param policyName
 * @return policyName
 */
async function deletePolicyFromGoogleAndSupabase(policyName: string) {
  // Googleでポリシーを削除
  const androidManagementClient = await createAndroidManagementClient();
  await androidManagementClient.enterprises.policies
    .delete({
      name: policyName,
    })
    .catch((error) => {
      console.error(error);
      throw new Error("Failed to delete policy from Google");
    });

  // DBからポリシーを削除
  const supabase = await createClient();
  const { error } = await supabase
    .from("policies")
    .delete()
    .eq("policy_name", policyName);
  if (error) {
    console.error(error);
    throw new Error("Failed to delete policy from Supabase");
  }

  return policyName;
}
