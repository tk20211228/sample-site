"use server";

import { createAndroidManagementClient } from "@/actions/emm/client";
import { createClient } from "@/lib/supabase/server";
import { Json } from "@/types/database";

/**
 * ポリシーを削除
 * @param policyName
 * @returns
 */
export const deletePolicy = async (policyName: string) => {
  if (policyName === "デフォルトポリシー") {
    throw new Error("デフォルトポリシーは削除できません。");
  }
  //認証
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  // DBから対象のポリシーを使用している端末を取得
  const { data: devices } = await supabase
    .from("devices")
    .select(
      `
      device_name,
      policy_name
      `
    )
    .eq("policy_name", policyName);

  // あればGoogle側デフォルトポリシーに変更する。
  // 変更したらDBにも反映
  const androidManagementClient = await createAndroidManagementClient();
  if (devices) {
    for (const device of devices) {
      await androidManagementClient.enterprises.devices
        .patch({
          name: device.device_name,
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
            .eq("device_name", device.device_name);
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
  }

  // Googleでポリシーを削除
  await androidManagementClient.enterprises.policies
    .delete({
      name: policyName,
    })
    .catch((error) => {
      console.error(error);
      throw new Error("Failed to delete policy from Google");
    });

  // DBからポリシーを削除
  const data = await supabase
    .from("policies")
    .delete()
    .eq("policy_name", policyName);

  return data;
};
