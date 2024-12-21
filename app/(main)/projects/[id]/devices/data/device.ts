"use server";

import { createAndroidManagementClient } from "@/actions/emm/client";
import { createClient } from "@/lib/supabase/server";
import { androidmanagement_v1 } from "googleapis";
import { SupabaseClient } from "@supabase/supabase-js";
import { getEnterprisesTableId } from "@/app/(main)/lib/get-enterprises-table-id";
import { selectDevicesTableFields } from "./select-device-fields";
import { DeviceConfigData } from "@/app/(main)/types/device";
import { Json } from "@/types/database";
import { revalidatePath } from "next/cache";

type NextPageToken = string | null | undefined;
type Device = androidmanagement_v1.Schema$Device | undefined;
type DeviceListData = {
  devices?: Device[];
  nextPageToken?: NextPageToken;
};

export const fetchDevicesFromGoogle = async (enterpriseName: string) => {
  // 認証
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }

  const BATCH_SIZE = 1000; // DBへの一括保存サイズ
  let allDevices: Device[] = [];
  let nextPageToken: NextPageToken = undefined;
  const enterprisesTableId = await getEnterprisesTableId(enterpriseName);

  try {
    // ページネーションを使用してすべてのデバイスを取得
    const androidmanagement = await createAndroidManagementClient();
    do {
      // const data= await androidmanagement.enterprises.devices
      const {
        data: { devices, nextPageToken: token },
      }: { data: DeviceListData } = await androidmanagement.enterprises.devices
        .list({
          parent: enterpriseName,
          pageSize: 100, // 1回のAPI呼び出しで取得する最大デバイス数
          pageToken: nextPageToken,
        })
        .catch((error) => {
          console.error("Error Get device list:", error.message);
          throw new Error(error.message);
        });
      // console.log("devices", devices);

      if (!devices || devices.length === 0) break;

      allDevices = [...allDevices, ...devices];
      nextPageToken = token;

      // BATCH_SIZEに達したらDBに保存
      if (allDevices.length >= BATCH_SIZE) {
        await saveDevicesToDB(allDevices, enterprisesTableId, supabase);
        allDevices = []; // メモリをクリア
      }
    } while (nextPageToken);
    // 残りのデバイスをDBに保存
    if (allDevices.length > 0) {
      await saveDevicesToDB(allDevices, enterprisesTableId, supabase);
    }
    // 同期完了後、DBから最新の1000件を取得
    const { data: latestDevices, count } = await supabase
      .from("devices")
      .select("*", { count: "exact" })
      .eq("enterprise_table_id", enterprisesTableId)
      .order("device_name", { ascending: true })
      .limit(BATCH_SIZE);

    if (!latestDevices) {
      throw new Error("Failed to fetch devices from database");
    }

    return {
      devices: latestDevices, // 端末データ
      total: count, // 全件数
      hasMore: (count || 0) > BATCH_SIZE, // 全件数が1000件以上かどうか
    };
  } catch (error) {
    console.error("Error in getDevices:", error);
    throw error;
  }
};

// デバイスデータをDBに保存する関数を分離
const saveDevicesToDB = async (
  allDevices: Device[],
  enterpriseId: string,
  supabase: SupabaseClient
) => {
  const devicesList = allDevices.map((device) => {
    if (!device) return;
    return {
      enterprise_table_id: enterpriseId,
      device_name: device.name,
      display_name: device.name,
      policy_name: device.policyName,
      device_config_data: device,
    };
  });

  const { error } = await supabase.from("devices").upsert(devicesList, {
    onConflict: "device_name",
  });

  if (error) {
    throw new Error(`Failed to save devices: ${error.message}`);
  }
};

/**
 * デバイスを取得
 * @param enterpriseName
 * @returns devices
 * 最大で1000端末まで取得
 */
export const fetchDevicesFromDB = async (enterpriseName: string) => {
  const BATCH_SIZE = 1000; // DBへの一括保存サイズに合わせている
  const supabase = await createClient();
  const enterprisesTableId = await getEnterprisesTableId(enterpriseName);
  // 同期完了後、DBから最新の1000件を取得
  const { data: devices } = await supabase
    .from("devices")
    // .select("*")
    .select(selectDevicesTableFields)
    .eq("enterprise_table_id", enterprisesTableId)
    .order("device_name", { ascending: true })
    .limit(BATCH_SIZE);

  if (!devices) {
    throw new Error("Failed to fetch devices from database");
  }

  return devices;
};

/**
 * export const getDevices = async (
  enterpriseName: string,
  page: number = 1,
  pageSize: number = 50
): Promise<{ devices: Device[]; total: number }> => {
  const supabase = await createClient();
  const enterprisesTableId = await getEnterprisesTableId(enterpriseName);

  // 総件数を取得
  const { count } = await supabase
    .from("devices")
    .select("*", { count: "exact", head: true })
    .eq("enterprise_table_id", enterprisesTableId);

  // ページネーションを適用してデータを取得
  const { data: devices } = await supabase
    .from("devices")
    .select("*")
    .eq("enterprise_table_id", enterprisesTableId)
    .order("device_name", { ascending: true })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (!devices) {
    throw new Error("Failed to fetch devices from database");
  }

  return {
    devices: devices.map(device => ({
      ...device,
      device_config_data: device.device_config_data as AndroidManagementDeviceSchema
    })),
    total: count ?? 0
  };
};

// ページネーションの実装例
const { devices, total } = await getDevices(enterpriseName, 1, 50);
 */

/**
 * デバイスを取得
 * @param deviceTableId
 * @returns device
 * デバイスの詳細情報を取得
 */
export const fetchDeviceInfoFromDB = async (deviceTableId: string) => {
  const supabase = await createClient();
  const { data: device } = await supabase
    .from("devices")
    .select("device_config_data")
    .eq("id", deviceTableId)
    .single();

  if (!device) {
    throw new Error("Failed to fetch device from database");
  }

  return device.device_config_data as DeviceConfigData;
};

export const syncDeviceInfoFromDB = async (
  deviceName: string,
  enterpriseId: string
) => {
  const androidmanagement = await createAndroidManagementClient();
  const { data: device } = await androidmanagement.enterprises.devices.get({
    name: deviceName,
  });
  if (!device) {
    throw new Error("Failed to fetch device from Google EMM");
  }
  const supabase = await createClient();
  const { error } = await supabase
    .from("devices")
    .update({ device_config_data: device as Json })
    .eq("device_name", deviceName);

  if (error) {
    throw new Error("Failed to update device in database");
  }
  //http://localhost:3000/projects/XXXXXX/devices のバスを更新する
  revalidatePath(`/projects/${enterpriseId}/devices`);
};
