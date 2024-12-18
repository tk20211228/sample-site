"use server";

import { createAndroidManagementClient } from "@/actions/emm/client";
import { createClient } from "@/lib/supabase/server";
import { Json } from "@/types/database";
/**
 * 選択したデバイスをロストモードにする
 * @param deviceNames
 * @returns
 */
export const lostModeSelectedDevice = async (deviceName: string) => {
  const androidmanagement = await createAndroidManagementClient();
  const { data } = await androidmanagement.enterprises.devices
    .issueCommand({
      name: deviceName,
      requestBody: {
        type: "START_LOST_MODE",
      },
    })
    .catch((error) => {
      console.error("Error lost mode device", error.message);
      throw new Error(error.message);
    });

  const supabase = await createClient();
  const { data: supabaseData, error } = await supabase
    .from("devices")
    .update({
      command_config_data: data as Json,
      updated_at: new Date().toISOString(),
    })
    .eq("device_name", deviceName)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return supabaseData;
};
