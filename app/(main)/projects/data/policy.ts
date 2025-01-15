import { createClient } from "@/lib/supabase/server";
import { PolicySummary } from "../../../types/policy";

/**
 * ポリシー名とIDのマッピングを取得
 * @returns ポリシー名とIDのマッピング
 * ポリシーの作成上限が100であるため、最大で100件のポリシーを取得する
 */
export const listPolicyDetails = async (
  enterpriseId: string
): Promise<PolicySummary[]> => {
  console.log("listPolicyDetails enterpriseId", enterpriseId);
  const supabase = await createClient();
  const { data: policyIds, error } = await supabase
    .from("policies")
    .select(
      `
      policyId:policy_id,
      policy_data->>name,
      policyDisplayName:policy_display_name
      `
    )
    .eq("enterprise_id", enterpriseId);
  console.log("listPolicyDetails policyIds", policyIds);
  if (error) {
    console.error("Error fetching policy names:", error);
    throw new Error("Failed to fetch policies from database");
  }

  return policyIds ?? [];
};
/**
 * defaultPolicyとIDのマッピングを取得
 * @returns {policyId: string, name: string}[]
 */
export const getDefaultPolicyId = async (
  enterpriseId: string
): Promise<{
  policyId: string;
  name: string;
}> => {
  const searchPolicyName = `enterprises/${enterpriseId}/policies/default`;
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  const { data: policyIds, error } = await supabase
    .from("policies")
    .select(
      `
      policyId:policy_id,
      name:policy_data->>name
      `
    )
    .match({
      enterprise_id: enterpriseId,
      "policy_data->>name": searchPolicyName,
    })
    .single();
  if (error) {
    console.error("Error fetching policy names:", error);
    throw new Error("Failed to fetch policies from database");
  }

  return policyIds ?? [];
};
