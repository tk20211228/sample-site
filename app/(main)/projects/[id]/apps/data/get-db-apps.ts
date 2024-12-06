"use server";

import { createClient } from "@/lib/supabase/server";
import { getEnterprisesTableId } from "@/app/(main)/lib/get-enterprises-table-id";
import { AppType } from "@/app/(main)/types/apps";
import { selectAppFields } from "./select-app-fields";

export const getDbApps = async (enterpriseName: string, appType?: AppType) => {
  // console.log("appType", appType);
  // IDを取得時、RLSでユーザー認証を実施
  const enterpriseTableId = await getEnterprisesTableId(enterpriseName);
  const supabase = await createClient();
  /// update_atで降順に並び替え
  let query = supabase
    .from("apps")
    .select(selectAppFields)
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
