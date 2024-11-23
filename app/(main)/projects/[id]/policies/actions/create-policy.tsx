"use server";

import { createAndroidManagementClient } from "@/actions/emm/client";
import { getEnterprisesTableId } from "@/app/(main)/lib/get-enterprises-table-id";
import { defaultPolicyRequestBody } from "@/data/default-policy-request-body";
import { createClient } from "@/lib/supabase/server";
import { Json } from "@/types/database";
import { androidmanagement_v1 } from "googleapis";
import { policyTableSchema } from "../types/policy";

export const createPolicy = async (
  policyDisplayName: string,
  enterpriseName: string,
  requestBody: androidmanagement_v1.Schema$Policy
) => {
  // console.log(policyDisplayName);
  // 認証
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);

  // ポリシーを作成
  const androidmanagement = await createAndroidManagementClient();
  const policyId = crypto.randomUUID();
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
  const { data: policy, error } = await supabase
    .from("policies")
    .insert({
      id: policyId,
      enterprise_table_id: enterpriseTableId,
      policy_name: `${enterpriseName}/policies/${policyId}`,
      display_name: policyDisplayName,
      policy_config_data: data as Json,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
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

  // フロントが期待する、データにパースし、返却
  const policyData = policyTableSchema.parse(policy);

  return policyData;
};
