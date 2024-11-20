import { Tables } from "@/types/database";
import { androidmanagement_v1 } from "googleapis";

export type AndroidManagementPolicySchema = androidmanagement_v1.Schema$Policy;

// データベースの型定義をそのまま使用
export type PolicyTable = Tables<"policies">;

// アプリケーション内で使用する拡張された型定義
export type Policy = Omit<PolicyTable, "policy_data"> & {
  policy_data: AndroidManagementPolicySchema;
};
