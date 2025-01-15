// import "server-only";

// import { getEnterprisesTableId } from "@/app/(main)/lib/get-enterprises-table-id";
// import { createClient } from "@/lib/supabase/server";
// import { Device } from "../../../../../types/device";

// /**
//  * デバイスを取得
//  * @param enterpriseName
//  * @returns devices
//  * 最大で1000端末まで取得
//  */
// export const fetchDevicesFromDB = async (enterpriseName: string) => {
//   const BATCH_SIZE = 1000; // DBへの一括保存サイズに合わせている
//   const supabase = await createClient();
//   const enterprisesTableId = await getEnterprisesTableId(enterpriseName);
//   // 同期完了後、DBから最新の1000件を取得
//   const { data: devices } = await supabase
//     .from("devices")
//     .select("*")
//     // .select(
//     //   `
//     //   id,
//     //   device_name,
//     //   policy_name,
//     //   device_config_data
//     // `
//     // )
//     .eq("enterprise_table_id", enterprisesTableId)
//     .order("device_name", { ascending: true })
//     .limit(BATCH_SIZE);

//   if (!devices) {
//     throw new Error("Failed to fetch devices from database");
//   }
//   // 取得したデータをフロントが期待するDevice型に変換
//   // 取得したデータのdevice_config_dataの型がJsonであるため、JSON型をAndroidManagementDeviceSchema型に変換
//   return devices as Device[];
// };

// /**
//  * export const getDevices = async (
//   enterpriseName: string,
//   page: number = 1,
//   pageSize: number = 50
// ): Promise<{ devices: Device[]; total: number }> => {
//   const supabase = await createClient();
//   const enterprisesTableId = await getEnterprisesTableId(enterpriseName);

//   // 総件数を取得
//   const { count } = await supabase
//     .from("devices")
//     .select("*", { count: "exact", head: true })
//     .eq("enterprise_table_id", enterprisesTableId);

//   // ページネーションを適用してデータを取得
//   const { data: devices } = await supabase
//     .from("devices")
//     .select("*")
//     .eq("enterprise_table_id", enterprisesTableId)
//     .order("device_name", { ascending: true })
//     .range((page - 1) * pageSize, page * pageSize - 1);

//   if (!devices) {
//     throw new Error("Failed to fetch devices from database");
//   }

//   return {
//     devices: devices.map(device => ({
//       ...device,
//       device_config_data: device.device_config_data as AndroidManagementDeviceSchema
//     })),
//     total: count ?? 0
//   };
// };

// // ページネーションの実装例
// const { devices, total } = await getDevices(enterpriseName, 1, 50);
//  */
