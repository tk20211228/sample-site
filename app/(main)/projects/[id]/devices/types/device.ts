import { Tables } from "@/types/database";
import { androidmanagement_v1 } from "googleapis";

export type Device = Tables<"devices">;

export type AndroidManagementDeviceSchema = androidmanagement_v1.Schema$Device;

// デバイスの表示用データ 作成中
export type DisplayData = {
  created_at: string;
  device_name: string;
  display_name: string;
  enterprise_table_id: string;
  id: string;
  policy_name: string;
  policy_table_id: string | null;
  updated_at: string;
  device_config_data: AndroidManagementDeviceSchema;
};
