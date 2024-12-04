"use server";

import { createClient } from "@/lib/supabase/server";
import { getEnterprisesTableId } from "@/app/(main)/lib/get-enterprises-table-id";

export const getDbApps = async (enterpriseName: string, appType?: string) => {
  // console.log("appType", appType);
  // IDを取得時、RLSでユーザー認証を実施
  const enterpriseTableId = await getEnterprisesTableId(enterpriseName);
  const supabase = await createClient();
  /// update_atで降順に並び替え
  let query = supabase
    .from("apps")
    .select(
      `
    app_details->>name,
    app_details->>title,
    app_details->>iconUrl,
    app_details->>updateTime,
    app_details->>minAndroidSdkVersion,
    app_details->>playStoreUrl,
    appType:app_type
  `
    )
    .eq("enterprise_table_id", enterpriseTableId)
    .order("updated_at", { ascending: false });

  if (appType) {
    query = query.eq("app_type", appType);
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(error.message);
  }
  // console.log("appType", appType);
  // console.log("getDbApps", data);
  return data;
};
