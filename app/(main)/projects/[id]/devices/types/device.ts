import { Tables } from "@/types/database";
import { androidmanagement_v1 } from "googleapis";

export type AndroidManagementDeviceSchema = androidmanagement_v1.Schema$Device;

// データベースの型定義をそのまま使用
export type DeviceTable = Tables<"devices">;

// アプリケーション内で使用する拡張された型定義
export type Device = Omit<DeviceTable, "device_config_data"> & {
  device_config_data: AndroidManagementDeviceSchema;
};
