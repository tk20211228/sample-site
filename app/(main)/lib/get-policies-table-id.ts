import "server-only";

import { createClient } from "@/lib/supabase/server";

/**
 * 企業IDを取得
 * @param enterpriseName
 * @returns enterpriseId
 */
export const getPoliciesTableId = async (policyName: string) => {
  console.log("policyName", policyName);
  const supabase = await createClient();
  const { data } = await supabase
    .from("policies")
    .select("id")
    .eq("policy_name", policyName)
    .single();
  if (!data) {
    throw new Error("Policy table id not found");
  }
  return data.id;
};
