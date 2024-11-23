import { z } from "zod";
import {
  createPolicyFormSchema,
  createPolicySchema,
} from "@/app/(main)/schema/policy";

// export type CreatePolicy = z.infer<typeof createPolicySchema>;
export type CreatePolicyForm = z.infer<typeof createPolicyFormSchema>;
