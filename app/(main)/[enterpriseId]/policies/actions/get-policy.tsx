"use server";

import { formPolicySchema } from "@/app/(main)/schema/policy";
import { createClient } from "@/lib/supabase/server";
// import { PolicyForm } from "@/app/(main)/types/policy";

/**
 * ポリシー情報をDBから取得
 * @param policyId
 * @returns policy_config_data
 */
export const getPolicyData = async (policyId: string) => {
  console.log("policyId", policyId);
  const supabase = await createClient();
  const { data } = await supabase
    .from("policies")
    .select(
      `
      policyDisplayName:policy_display_name,
      policyData:policy_data
      `
    )
    .eq("policy_id", policyId)
    .single();

  if (!data) {
    throw new Error("Policy not found");
  }
  // console.log("data", data);

  const response = formPolicySchema.parse(data);

  return response;
};
