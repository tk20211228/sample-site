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

  const { data, error } = await supabase
    .from("apps")
    .upsert(
      {
        app_details: appData as Json,
        enterprise_table_id: enterpriseTableId,
        name: appData.name,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "name",
      }
    )
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
