import "server-only";

import { createClient } from "@/lib/supabase/server";
import { androidmanagement_v1 } from "googleapis";
import { getEnterprisesTableId } from "@/app/(main)/lib/get-enterprises-table-id";
import { Json } from "@/types/database";

type AppData = androidmanagement_v1.Schema$Application;

// DBにアプリの情報を保存する
export const saveApp = async (appData: AppData, enterpriseName: string) => {
  if (!appData.name) {
    throw new Error("App name is required");
  }
  const supabase = await createClient();
  // IDを取得する際に、RLSにより認証を行っている
  const enterpriseTableId = await getEnterprisesTableId(enterpriseName);

  // appDate.author に”Private”が含まれている場合は、アプリの種別を”PRIVATE”とする
  // appDate.author に”Web”が含まれている場合は、アプリの種別を”WEB”とする
  // 上記以外は、アプリの種別を”PUBLIC”とする
  const appType = appData.author?.includes("Private")
    ? "PRIVATE"
    : appData.author?.includes("Web")
    ? "WEB"
    : "PUBLIC";

  const { data, error } = await supabase
    .from("apps")
    .upsert(
      {
        app_details: appData as Json,
        app_type: appType,
        enterprise_table_id: enterpriseTableId,
        name: appData.name,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "name",
      }
    )
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
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
