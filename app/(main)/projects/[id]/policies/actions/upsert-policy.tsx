"use server";

import { createAndroidManagementClient } from "@/actions/emm/client";
import { getEnterprisesTableId } from "@/app/(main)/lib/get-enterprises-table-id";
import { getPoliciesTableId } from "@/app/(main)/lib/get-policies-table-id";
import { AndroidManagementPolicy } from "@/app/(main)/types/policy";
import { createClient } from "@/lib/supabase/server";
import { Json } from "@/types/database";
import { policyTableSchema } from "../types/policy";

/**
 * ポリシーを更新しDBに保存
 * @param policyId
 * @param policyDisplayName
 * @param enterpriseName
 * @param requestBody
 * @returns policyData
 */
export const upsertPolicy = async (
  policyId: string,
  policyDisplayName: string,
  enterpriseName: string,
  requestBody: AndroidManagementPolicy
) => {
  // ポリシーを作成
  let policiesTableId = policyId;
  const androidmanagement = await createAndroidManagementClient();
  if (policyId === "new") {
    policyId = crypto.randomUUID();
    policiesTableId = policyId;
  } else if (policyId === "default") {
    policiesTableId = await getPoliciesTableId(
      `${enterpriseName}/policies/default`
    );
  }
  console.log("requestBody", requestBody);
  const { data } = await androidmanagement.enterprises.policies
    .patch({
      name: `${enterpriseName}/policies/${policyId}`,
      requestBody,
    })
    .catch((error) => {
      console.error("Error creating policy:", error.message);
      throw new Error(error.message);
    });
  console.log("data", data);

  // ポリシーをデータベースに保存と取得
  const enterpriseTableId = await getEnterprisesTableId(enterpriseName);
  const supabase = await createClient();
  const { data: policy, error } = await supabase
    .from("policies")
    .upsert(
      {
        id: policiesTableId,
        enterprise_table_id: enterpriseTableId,
        policy_name: `${enterpriseName}/policies/${policyId}`,
        display_name: policyDisplayName,
        policy_config_data: data as Json,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "id",
      }
    )
    .select(
      `
      id,
      enterprise_table_id,
      policy_name,
      display_name,
      created_at,
      updated_at,
      policy_config_data->>version
      `
    )
    .single();
  if (error) {
    console.error("Error inserting policy:", error.message);
    throw new Error(error.message);
  }
  console.log("policy", policy);

  const policyData = policyTableSchema.parse(policy); // フロントが管理しているテーブルデーの型にパースし、返却
  // const policyData = formPolicySchema.parse(policy);　// フロントが管理しているフォームの型にパースし、返却

  return policyData;
};
