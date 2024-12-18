import "server-only";

import { defaultPolicyRequestBody } from "@/data/default-policy-request-body";
import { createClient } from "@/lib/supabase/server";
import { androidmanagement_v1 } from "googleapis";
import { createAndroidManagementClient } from "./client";
import { Json } from "@/types/database";
import { AndroidManagementPolicy } from "@/app/(main)/types/policy";

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
  const { data } =
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
  console.log("data", data);
  if (!data?.name) {
    throw new Error("Policy name is required");
  }

  // ポリシー情報をDBに保存
  const { error: policyError } = await supabase
    .from("policies")
    .upsert(
      {
        enterprise_table_id: enterpriseTableId,
        policy_name: data.name,
        display_name: "デフォルトポリシー",
        policy_config_data: data as Json,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "policy_name",
      }
    )
    .select()
    .single();

  if (policyError) {
    console.error("Error saving policy:", policyError);
    throw new Error("Error saving policy");
  }

  console.log("Policy created:", data);
};
