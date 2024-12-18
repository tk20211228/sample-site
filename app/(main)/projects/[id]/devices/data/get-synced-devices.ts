"use server";

import { createAndroidManagementClient } from "@/actions/emm/client";
import { getEnterprisesTableId } from "@/app/(main)/lib/get-enterprises-table-id";
import { createClient } from "@/lib/supabase/server";
import { Json } from "@/types/database";
import { androidmanagement_v1 } from "googleapis";
import { selectDevicesTableFields } from "./select-device-fields";

type NextPageToken = string | null | undefined;
type Device = androidmanagement_v1.Schema$Device;
type DeviceListData = {
  devices?: Device[];
  nextPageToken?: NextPageToken;
};

/**
 * Googleサーバーとデバイス情報を同期後、DBからポバイスを取得する関数
 * @param enterpriseName ex) enterprises/{enterpriseId}
 * @returns デバイスの配列
 */
export const getSyncedDevices = async (enterpriseName: string) => {
  // 認証
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }

  let allDevices: Device[] = [];
  let nextPageToken: NextPageToken = undefined;
  const enterprisesTableId = await getEnterprisesTableId(enterpriseName);

  const androidmanagement = await createAndroidManagementClient();
  try {
    do {
      const {
        data: { devices, nextPageToken: token },
      }: { data: DeviceListData } = await androidmanagement.enterprises.devices
        .list({
          parent: enterpriseName,
          pageSize: 20, // 1回のAPI呼び出しで取得するポリシー数
          pageToken: nextPageToken,
        })
        .catch((error) => {
          console.error("Error Get device list:", error.message);
          throw new Error(error.message);
        });

      if (!devices || devices.length === 0) break;

      allDevices = [...allDevices, ...devices];
      nextPageToken = token;

      // １ページ毎にDBに保存
      await saveDevicesToDB(devices, enterprisesTableId)
        .then(() => {
          allDevices = []; // メモリをクリア
        })
        .catch((error) => {
          console.error("Error Save devices to DB:", error);
          throw new Error(error);
        });
    } while (nextPageToken);
    // 残りのポリシーをDBに保存
    if (allDevices.length > 0) {
      await saveDevicesToDB(allDevices, enterprisesTableId);
    }

    // 同期完了後、DBからポリシーを取得する
    const { data } = await supabase
      .from("devices")
      .select(selectDevicesTableFields)
      .eq("enterprise_table_id", enterprisesTableId)
      .order("display_name", { ascending: true });

    if (!data) {
      throw new Error("Failed to fetch devices from database");
    }

    return data;
  } catch (error) {
    console.error("Error Get devices list:", error);
    throw error;
  }
};

/**
 * ポリシーをDBに保存する関数
 * @param allDevices デバイスの配列
 * @param enterprisesTableId エンタープライズID
 * @param supabase Supabaseクライアント
 */
const saveDevicesToDB = async (
  allDevices: Device[],
  enterprisesTableId: string
) => {
  const supabase = await createClient();
  const devicesList = allDevices
    .map((device) => {
      if (!device.name) return;
      return {
        enterprise_table_id: enterprisesTableId,
        device_name: device.name,
        display_name: device.name,
        device_config_data: device as Json,
        updated_at: new Date().toISOString(),
        policy_name: device.policyName,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== undefined);

  const { error } = await supabase.from("devices").upsert(devicesList, {
    onConflict: "device_name",
  });

  if (error) {
    throw new Error(`Failed to save policies: ${error.message}`);
  }
};
