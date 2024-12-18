import {
  formPolicySchema,
  policyDisplayNameSchema,
  policySchema,
} from "@/app/(main)/schema/policy";
import { androidmanagement_v1 } from "googleapis";
import { z } from "zod";

export type AndroidManagementPolicy = androidmanagement_v1.Schema$Policy;
export type Policy = z.infer<typeof policySchema>;
export type PolicyDisplayName = z.infer<typeof policyDisplayNameSchema>;
export type FormPolicy = z.infer<typeof formPolicySchema>;

export type PolicyApps = androidmanagement_v1.Schema$ApplicationPolicy;
export type Apps = {
  id: string;
  name: string;
  title: string;
  iconUrl: string;
  appType: string;
  installType?: string | null; //"BLOCKED" | "REQUIRED_FOR_SETUP";
  disabled?: boolean | null;
};
