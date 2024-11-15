import "server-only";

import { defaultPolicyRequestBody } from "@/data/default-policy-request-body";
import { createClient } from "@/lib/supabase/server";
import { androidmanagement_v1 } from "googleapis";
import { createAndroidManagementClient } from "./client";

type Policy = androidmanagement_v1.Schema$Policy;

const recordPolicy = async (enterpriseName: string, data: Policy) => {
  const supabase = await createClient();
};

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
  const requestBody: Policy = defaultPolicyRequestBody;
  const androidmanagement = await createAndroidManagementClient();
  const { data } = await androidmanagement.enterprises.policies
    .patch({
      name: `${enterpriseName}/policies/default`,
      requestBody,
    })
    .catch((error) => {
      console.error("Error creating signup URL:", error.message);
      throw new Error(error.message);
    });
  console.log("data", data);
  if (!data.name) {
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
        policy_config_data: JSON.stringify(data),
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
