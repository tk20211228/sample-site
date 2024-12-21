"use server";

import { createAndroidManagementClient } from "@/actions/emm/client";
import { createClient } from "@/lib/supabase/server";
import { Json } from "@/types/database";
/**
 * 選択したデバイスをロストモードにする
 * @param deviceNames
 * @returns
 */
export const startLostModeSelectedDevice = async (deviceName: string) => {
  const androidmanagement = await createAndroidManagementClient();
  const { data } = await androidmanagement.enterprises.devices
    .issueCommand({
      name: deviceName,
      requestBody: {
        type: "START_LOST_MODE",
        startLostModeParams: {
          lostOrganization: {
            defaultMessage: "test 会社",
            localizedMessages: {
              "ja-JP": "test 会社",
            },
          },
          lostMessage: {
            defaultMessage: "端末が紛失しました。連絡お願いします。",
            localizedMessages: {
              "ja-JP": "端末が紛失しました。連絡お願いします。",
            },
          },
          lostPhoneNumber: {
            defaultMessage: "09037549016",
            localizedMessages: {
              "ja-JP": "09037549016",
            },
          },
          lostEmailAddress: "t3kuboki@gmail.com",
          lostStreetAddress: {
            defaultMessage: "東京都渋谷区渋谷1-1-1",
            localizedMessages: {
              "ja-JP": "東京都渋谷区渋谷1-1-1",
            },
          },
        },
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

/**
 * 選択したデバイスをロストモードにする
 * @param deviceNames
 * @returns
 */
export const stopLostModeSelectedDevice = async (deviceName: string) => {
  const androidmanagement = await createAndroidManagementClient();
  const { data } = await androidmanagement.enterprises.devices
    .issueCommand({
      name: deviceName,
      requestBody: {
        type: "STOP_LOST_MODE",
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
