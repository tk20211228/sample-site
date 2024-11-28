import "server-only";

import { createClient } from "@/lib/supabase/server";
import { getEnterprisesTableId } from "@/app/(main)/lib/get-enterprises-table-id";

export const getDbApps = async (enterpriseName: string) => {
  // IDを取得時、RLSでユーザー認証を実施
  const enterpriseTableId = await getEnterprisesTableId(enterpriseName);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("apps")
    .select(
      `
      app_details->>name,
      app_details->>title,
      app_details->>iconUrl,
      app_details->>updateTime,
      app_details->>minAndroidSdkVersion,
      app_details->>playStoreUrl
    `
    )
    .eq("enterprise_table_id", enterpriseTableId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
