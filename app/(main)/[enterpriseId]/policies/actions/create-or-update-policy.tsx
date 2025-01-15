"use server";

import { createAndroidManagementClient } from "@/actions/emm/client";
import { AndroidManagementPolicy } from "@/app/types/policy";
import { createClient } from "@/lib/supabase/server";
import { Json } from "@/types/database";
import { revalidatePath } from "next/cache";

/**
 * ポリシーを更新しDBに保存
 * @param policyId
 * @param policyDisplayName
 * @param enterpriseId
 * @param requestBody
 * @returns
 */
export const createOrUpdateEnterprisePolicy = async ({
  enterpriseId,
  policyId,
  policyDisplayName,
  requestBody,
}: {
  enterpriseId: string;
  policyId: string;
  policyDisplayName: string;
  requestBody: AndroidManagementPolicy;
}) => {
  // ポリシーを作成
  let uniquePolicyId = policyId;
  const androidmanagement = await createAndroidManagementClient();
  if (policyId === "new") {
    policyId = crypto.randomUUID();
    uniquePolicyId = policyId;
  }
  // console.log("requestBody", requestBody);
  const enterpriseName = `enterprises/${enterpriseId}`;
  const { data } = await androidmanagement.enterprises.policies
    .patch({
      name: `${enterpriseName}/policies/${uniquePolicyId}`,
      requestBody,
    })
    .catch((error) => {
      console.error("Error creating policy:", error.message);
      throw new Error(error.message);
    });

  // ポリシーをデータベースに保存と取得
  const supabase = await createClient();
  const { data: policy, error } = await supabase
    .from("policies")
    .upsert({
      policy_id: uniquePolicyId,
      enterprise_id: enterpriseId,
      policy_display_name: policyDisplayName,
      policy_data: data as Json,
      updated_at: new Date().toISOString(),
    })
    .select(
      `
    policy_id
    `
    )
    .single();
  if (error) {
    console.error("Error inserting policy:", error.message);
    throw new Error(error.message);
  }

  revalidatePath(`/${enterpriseId}/policies`);
  return policy.policy_id;
};
