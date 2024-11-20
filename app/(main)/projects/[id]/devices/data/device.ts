"use server";

import { createAndroidManagementClient } from "@/actions/emm/client";
import { createClient } from "@/lib/supabase/server";
import { androidmanagement_v1 } from "googleapis";
import { SupabaseClient } from "@supabase/supabase-js";
import { getEnterprisesTableId } from "@/app/(main)/lib/get-enterprises-table-id";

type NextPageToken = string | null | undefined;
type Device = androidmanagement_v1.Schema$Device | undefined;
type DeviceListData = {
  devices?: Device[];
  nextPageToken?: NextPageToken;
};

export const getDevices = async (enterpriseName: string) => {
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
  const devicesToUpsert = allDevices.map((device) => {
    if (!device) return;
    return {
      enterprise_table_id: enterpriseId,
      device_name: device.name,
      display_name: device.name,
      policy_name: device.policyName,
      device_config_data: device,
    };
  });

  const { error } = await supabase.from("devices").upsert(devicesToUpsert, {
    onConflict: "device_name",
  });

  if (error) {
    throw new Error(`Failed to save devices: ${error.message}`);
  }
};
