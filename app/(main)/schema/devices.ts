import { z } from "zod";

export const DevicesTableSchema = z.object({
  id: z.string(),
  device_name: z.string(),
  display_name: z.string(),
  policy_name: z.string().nullable(),
  state: z.string(),
  lastSyncTime: z.string(),
  policyCompliant: z.string(),
  enrollmentTime: z.string(),
  lastStatusReportTime: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

/**
 *  id: string;
    device_name: string;
    display_name: string;
    policy_name: string | null;
    state: string;
    lastSyncTime: string;
    policyCompliant: string;
    enrollmentTime: string;
    lastStatusReportTime: string;
    created_at: string;
    updated_at: string;
 */
