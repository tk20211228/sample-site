import { z } from "zod";

// export type AndroidManagementPolicySchema = androidmanagement_v1.Schema$Policy;

// データベースの型定義をそのまま使用
// export type PolicyTable = Tables<"policies">;

export type PolicyTableType = z.infer<typeof policyTableSchema>;

// export type PolicyTableType = {
//   id: string;
//   enterprise_table_id: string;
//   policy_name: string;
//   display_name: string | null;
//   created_at: string;
//   updated_at: string;
//   version: string;
// };

export const policyTableSchema = z.object({
  id: z.string(),
  enterprise_table_id: z.string(),
  policy_name: z.string(),
  display_name: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  version: z.string(),
});
