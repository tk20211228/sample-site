// import "server-only";

// import { AndroidManagementPolicy } from "@/app/types/policy";
// import { createClient } from "@/lib/supabase/server";
// import { Json } from "@/types/database";

// export const savePolicy = async ({
//   enterpriseId,
//   policyDisplayName,
//   policyData,
// }: {
//   enterpriseId: string;
//   policyDisplayName: string;
//   policyData: AndroidManagementPolicy;
// }) => {
//   const currentPolicyName = policyData?.name;
//   if (!currentPolicyName) {
//     console.error("currentPolicyName is undefined");
//     throw new Error("currentPolicyName is undefined");
//   }
//   const policyIdentifier = currentPolicyName.split(
//     `enterprises/${enterpriseId}/policies/`
//   )[1];
//   // ポリシーデータをDBに保存
//   const supabase = await createClient();
//   const { data: saveData, error } = await supabase
//     .from("policies")
//     .insert({
//       enterprise_id: enterpriseId,
//       policy_identifier: policyIdentifier,
//       policy_display_name: policyDisplayName,
//       policy_data: (policyData as Json) ?? {}, // ポリシーデータが取得できない場合は、空のオブジェクトを保存する
//       updated_at: new Date().toISOString(),
//     })
//     .select(
//       `
//       policyIdentifier: policy_identifier,
//       policyDisplayName: policy_display_name
//       `
//     )
//     .single();
//   if (error) {
//     throw new Error(`Failed to save policies: ${error.message}`);
//   }
//   return saveData;
// };
