import { z } from "zod";

export const AppsTableSchema = z.object({
  name: z.string(),
  title: z.string(),
  iconUrl: z.string(),
  updateTime: z.string(),
  minAndroidSdkVersion: z.string(),
  playStoreUrl: z.string(),
  appType: z.string(),
});
