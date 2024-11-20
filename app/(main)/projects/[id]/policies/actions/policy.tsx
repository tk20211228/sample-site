import "server-only";

import { createClient } from "@/lib/supabase/server";
import { getEnterprisesTableId } from "@/app/(main)/lib/get-enterprises-table-id";
import { Policy } from "../types/policy";
/**
 * ポリシーを取得
 * @param enterpriseName
 * @returns policies
 * 最大で1000ポリシーまで取得
 */
export const getPolicies = async (enterpriseName: string) => {
  const BATCH_SIZE = 1000; // DBへの一括保存サイズに合わせている
  const supabase = await createClient();
  const enterprisesTableId = await getEnterprisesTableId(enterpriseName);
  // 同期完了後、DBから最新の1000件を取得
  const { data: policies } = await supabase
    .from("policies")
    .select("*")
    // .select(
    //   `
    //   id,
    //   device_name,
    //   policy_name,
    //   device_config_data
    // `
    // )
    .eq("enterprise_table_id", enterprisesTableId)
    .order("policy_name", { ascending: true })
    .limit(BATCH_SIZE);

  if (!policies) {
    throw new Error("Failed to fetch policies from database");
  }
  // 取得したデータをフロントが期待するPolicy型に変換
  return policies as Policy[];
};
