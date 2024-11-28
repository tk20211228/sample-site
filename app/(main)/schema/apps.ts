import { z } from "zod";

export const publicAppsTableSchema = z.object({
  name: z.string(),
  title: z.string(),
  iconUrl: z.string(),
  updateTime: z.string(),
  minAndroidSdkVersion: z.string(),
  playStoreUrl: z.string(),
});
