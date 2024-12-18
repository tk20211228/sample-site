import "server-only";

import { createClient } from "@/lib/supabase/server";

/**
 * 企業IDを取得
 * @param enterpriseName
 * @returns enterpriseId
 */
export const getEnterprisesTableId = async (enterpriseName: string) => {
  // console.log("getEnterprisesTableId", enterpriseName);
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
