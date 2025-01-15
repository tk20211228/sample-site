"use server";

import { createAndroidManagementClient } from "@/actions/emm/client";
import { AndroidManagementDevice } from "@/app/types/device";
import { createClient } from "@/lib/supabase/server";
import { Json } from "@/types/database";
import { revalidatePath } from "next/cache";
import { selectDevicesTableFields } from "./select-device-fields";

type getDevicesDataProps = {
  enterpriseId: string;
  firstSize?: number;
  maxDeviceSize?: number;
};

/**
 * デバイスを取得
 * @param enterpriseName
 * @returns devices
 * 最大で100端末まで取得
 */
export const getDevicesData = async ({
  enterpriseId,
  firstSize = 0,
  maxDeviceSize = 99,
}: getDevicesDataProps) => {
  const supabase = await createClient();
  const { data: devices, error } = await supabase
    .from("devices")
    .select(selectDevicesTableFields)
    .eq("enterprise_id", enterpriseId)
    .order("updated_at", { ascending: true })
    .range(firstSize, maxDeviceSize);
  // console.log("devices", devices);

  // エラーが発生した場合の処理
  if (error) {
    console.error("Database query error:", error);
    throw new Error(`Failed to fetch devices: ${error.message}`);
  }

  if (!devices) {
    throw new Error("Failed to fetch devices from database");
  }

  return devices;
};

/**
 * デバイスを取得
 * @param deviceTableId
 * @returns device
 * デバイスの詳細情報を取得
 */
export const fetchDeviceInfoFromDB = async (deviceId: string) => {
  const supabase = await createClient();
  const { data: device } = await supabase
    .from("devices")
    .select("device_data")
    .eq("deviceId", deviceId)
    .single();

  if (!device) {
    throw new Error("Failed to fetch device from database");
  }

  return device.device_data as AndroidManagementDevice;
};

export const syncDeviceInfoFromDB = async ({
  deviceIdentifier,
  enterpriseId,
}: {
  deviceIdentifier: string;
  enterpriseId: string;
}) => {
  const androidmanagement = await createAndroidManagementClient();
  const name = `enterprises/${enterpriseId}/devices/${deviceIdentifier}`;
  const { data: device } = await androidmanagement.enterprises.devices.get({
    name,
  });
  if (!device) {
    throw new Error("Failed to fetch device from Google EMM");
  }
  const supabase = await createClient();
  const { error } = await supabase
    .from("devices")
    .update({ device_data: device as Json })
    .match({
      enterprise_id: enterpriseId,
      device_identifier: deviceIdentifier,
    });

  if (error) {
    throw new Error("Failed to update device in database");
  }
  //http://localhost:3000/XXXXXX/devices のバスを更新する
  revalidatePath(`/${enterpriseId}/devices`);
};
