import "server-only";

import { createClient } from "@/lib/supabase/server";

/**
 * 企業IDを取得
 * @param enterpriseName
 * @returns enterpriseId
 */
export const getEnterpriseId = async (enterpriseName: string) => {
  const supabase = await createClient();
  const { data: enterpriseData } = await supabase
    .from("enterprises")
    .select("id")
    .eq("enterprise_name", enterpriseName)
    .single();
  if (!enterpriseData) {
    throw new Error("Enterprise not found");
  }
  return enterpriseData.id;
};

/**
 * デバイスを取得
 * @param enterpriseName
 * @returns devices
 * 最大で1000端末まで取得
 */
export const getDevices = async (enterpriseName: string) => {
  const BATCH_SIZE = 1000; // DBへの一括保存サイズ
  const supabase = await createClient();
  const enterpriseId = await getEnterpriseId(enterpriseName);
  // 同期完了後、DBから最新の1000件を取得
  const { data: devices } = await supabase
    .from("devices")
    .select("*", { count: "exact" })
    .eq("enterprise_table_id", enterpriseId)
    .order("device_name", { ascending: true })
    .limit(BATCH_SIZE);

  if (!devices) {
    throw new Error("Failed to fetch devices from database");
  }

  return devices;
};
