"use server";

import { createClient } from "@/lib/supabase/server";

export const deleteApp = async (appName: string) => {
  const supabase = await createClient();
  const { error } = await supabase.from("apps").delete().eq("name", appName);
  if (error) {
    throw new Error(error.message);
  }
  return error;
};

/**
 * 選択したアプリを削除
 * @param appNames
 * @returns
 */
export const deleteSelectedApps = async (appNames: string[]) => {
  console.log("appNames", appNames);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("apps")
    .delete()
    .in("name", appNames);
  if (error) {
    throw new Error(error.message);
  }

  return data;
};
