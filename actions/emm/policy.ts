import "server-only";

import { defaultPolicyRequestBody } from "@/data/default-policy-request-body";
import { createClient } from "@/lib/supabase/server";
import { androidmanagement_v1 } from "googleapis";
import { createAndroidManagementClient } from "./client";
import { Json } from "@/types/database";
import { AndroidManagementPolicy } from "@/app/types/policy";

export const createDefaultPolicy = async (
  enterpriseName: string,
  enterpriseTableId: string
) => {
  // ユーザー認証
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }

  // ポリシー作成
  const requestBody: AndroidManagementPolicy = defaultPolicyRequestBody;
  const androidmanagement = await createAndroidManagementClient();
  const { data: PolicyResponseData } =
    // const { data }: { data: PolicyDataSchema } =
    await androidmanagement.enterprises.policies
      .patch({
        name: `${enterpriseName}/policies/default`,
        requestBody,
      })
      .catch((error) => {
        console.error("Error creating signup URL:", error.message);
        throw new Error(error.message);
      });
  if (!PolicyResponseData?.name) {
    throw new Error("Policy name is required");
  }

  // ポリシー情報をDBに保存
  const { data: policyUpsertDate, error: policyError } = await supabase
    .from("policies")
    .upsert(
      {
        enterprise_id: enterpriseTableId,
        policy_display_name: "デフォルトポリシー",
        policy_data: PolicyResponseData as Json,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "policy_id",
      }
    )
    .select()
    .single();

  if (policyError) {
    console.error("Error saving policy:", policyError);
    throw new Error("Error saving policy");
  }

  // 応答文を　policies_historiesテーブルに保存
  const { error: policyHistoryError } = await supabase
    .from("policies_histories")
    .insert({
      policy_id: policyUpsertDate.policy_id,
      policy_request_data: requestBody as Json,
      policy_response_data: PolicyResponseData as Json,
    });
  if (policyHistoryError) {
    console.error("Error inserting policy_histories:", policyHistoryError);
    throw new Error("Error inserting policy_histories");
  }
};
