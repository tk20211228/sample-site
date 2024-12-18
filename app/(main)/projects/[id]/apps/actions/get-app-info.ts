"use server";

import { SheetAppInfo } from "@/app/(main)/types/apps";
import { createClient } from "@/lib/supabase/server";

/**
 * Sheetコンポーネントで使用するアプリケーション情報を取得する
 * @param appName
 * @returns SheetAppInfo
 */
export const getSheetAppInfo = async (appName: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("apps")
    .select(
      `
      app_details,
      app_type
      `
    )
    .eq("name", appName)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data as SheetAppInfo;
};
