"use server";

import { createClient } from "@/lib/supabase/server";

export const getPolicyApps = async (enterpriseId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("apps")
    .select(
      `
      appId:app_id,
      enterpriseId:enterprise_id,
      appType:app_type,
      iconUrl:app_data->>iconUrl,
      title:app_data->>title,
      updatedAt:updated_at
      `
    )
    .eq("enterprise_id", enterpriseId);
  if (error) {
    console.error(error);
    return [];
  }
  console.log("getApps data", data);
  return data;
};
