"use server";

import { getPoliciesTableId } from "@/app/(main)/lib/get-policies-table-id";
import { formPolicySchema } from "@/app/(main)/schema/policy";
import { createClient } from "@/lib/supabase/server";
// import { PolicyForm } from "@/app/(main)/types/policy";

/**
 * ポリシー情報をDBから取得
 * @param policyTableId
 * @returns policy_config_data
 */
export const getPolicyFromDB = async (
  enterpriseName: string,
  policyId: string
) => {
  let policyTableId = policyId;
  console.log("policyId", policyId);
  if (policyId === "default") {
    policyTableId = await getPoliciesTableId(
      `${enterpriseName}/policies/default`
    );
  }
  console.log("policyTableId", policyTableId);
  const supabase = await createClient();
  const { data } = await supabase
    .from("policies")
    .select(
      `
      display_name,
      policy_config_data
      `
    )
    .eq("id", policyTableId)
    .single();

  if (!data) {
    throw new Error("Policy not found");
  }

  const response = formPolicySchema.parse(data);

  return response;
};
