import { Tables } from "@/types/database";
import { androidmanagement_v1 } from "googleapis";
import PoliciesTable from "../components/table/policies-table";

export type AndroidManagementPolicySchema = androidmanagement_v1.Schema$Policy;

// データベースの型定義をそのまま使用
export type PolicyTable = Tables<"policies">;

// // アプリケーション内で使用する拡張された型定義
// export type Policy = Omit<PolicyTable, "policy_config_data"> & {
//   policy_config_data: AndroidManagementPolicySchema;
// };

export type PoliciesDbTableSchema = {
  id: string;
  enterprise_table_id: string;
  policy_name: string;
  display_name: string | null;
  created_at: string;
  updated_at: string;
  version: string;
};
