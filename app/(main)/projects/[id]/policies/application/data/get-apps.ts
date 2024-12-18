"use server";

import { getEnterprisesTableId } from "@/app/(main)/lib/get-enterprises-table-id";
import { createClient } from "@/lib/supabase/server";

export const getApps = async (enterpriseName: string) => {
  const enterpriseTableId = await getEnterprisesTableId(enterpriseName);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("apps")
    .select(
      `
      id,
      name,
      app_details->>title,
      app_details->>iconUrl,
      appType:app_type
      `
    )
    .eq("enterprise_table_id", enterpriseTableId);
  if (error) {
    console.error(error);
    return [];
  }
  console.log("getApps data", data);
  return data;
};
