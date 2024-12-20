"use server";

import { getEnterprisesTableId } from "@/app/(main)/lib/get-enterprises-table-id";
import { createClient } from "@/lib/supabase/server";

/**
 * ポリシーを取得
 * @param enterpriseName
 * @returns policies
 * DBからポリシーを取得
 */
export const getPoliciesTableData = async (enterpriseName: string) => {
  const supabase = await createClient();
  const enterprisesTableId = await getEnterprisesTableId(enterpriseName);
  const { data: policies } = await supabase
    .from("policies")
    // .select("*")
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
    .eq("enterprise_table_id", enterprisesTableId)
    .order("policy_name", { ascending: true });

  if (!policies) {
    throw new Error("Failed to fetch policies from database");
  }
  // 取得したデータをフロントが期待するPolicy型に変換
  return policies;
};
