import { editPolicyFormSchema } from "@/app/(main)/schema/policy";
import { z } from "zod";

// export type CreatePolicy = z.infer<typeof createPolicySchema>;
// export type CreatePolicyForm = z.infer<typeof createPolicyFormSchema>;
export type CreatePolicyForm = z.infer<typeof editPolicyFormSchema>;
