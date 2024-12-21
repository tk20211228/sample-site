"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const deleteApp = async (appName: string) => {
  const supabase = await createClient();
  const { error } = await supabase.from("apps").delete().eq("name", appName);
  if (error) {
    throw new Error(error.message);
  }
  return error;
};

/**
 * 選択したデバイスを削除
 * @param deviceNames
 * @returns
 */
export const deleteSelectedDevices = async (
  deviceNames: string[],
  enterpriseId: string
) => {
  // console.log("deviceNames", deviceNames);
  const supabase = await createClient();
  const { error } = await supabase
    .from("devices")
    .delete()
    .in("device_name", deviceNames);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/projects/${enterpriseId}/devices`);
};
