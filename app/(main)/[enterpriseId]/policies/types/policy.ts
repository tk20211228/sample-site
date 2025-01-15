import { z } from "zod";

// export type AndroidManagementPolicySchema = androidmanagement_v1.Schema$Policy;

// データベースの型定義をそのまま使用
// export type PolicyTable = Tables<"policies">;

export type PolicyTableType = z.infer<typeof policyTableSchema>;
export const policyTableSchema = z.object({
  policyId: z.string(),
  enterpriseId: z.string(),
  policyDisplayName: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  version: z.string(),
  name: z.string(),
});
