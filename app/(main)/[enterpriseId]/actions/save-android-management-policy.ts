import "server-only";

import { AndroidManagementPolicy } from "@/app/types/policy";
import { createClient } from "@/lib/supabase/server";
import { Json } from "@/types/database";

export const saveAndroidManagementPolicy = async ({
  enterpriseId,
  policyDisplayName,
  policyData,
}: {
  enterpriseId: string;
  policyDisplayName: string;
  policyData?: AndroidManagementPolicy;
}) => {
  // console.log("policyData", policyData);
  const policyIdentifier = policyData?.name?.split(
    `enterprises/${enterpriseId}/policies/`
  )[1];
  const supabase = await createClient();
  // ポリシーデータをDBに保存
  const { data: saveData, error } = await supabase
    .from("policies")
    .insert({
      enterprise_id: enterpriseId,
      policy_identifier: policyIdentifier,
      policy_display_name: policyDisplayName,
      policy_data: (policyData as Json) ?? {}, // ポリシーデータが取得できない場合は、空のオブジェクトを保存する
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();
  if (error) {
    throw new Error(`Failed to save policies: ${error.message}`);
  }
  return saveData;
};
