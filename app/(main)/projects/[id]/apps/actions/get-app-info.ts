"use server";

import { createClient } from "@/lib/supabase/server";
import { androidmanagement_v1 } from "googleapis";

type AppInfo = androidmanagement_v1.Schema$Application;

export const getAppInfo = async (appName: string): Promise<AppInfo> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("apps")
    .select("app_details")
    .eq("name", appName)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data?.app_details as AppInfo;
};
