import { z } from "zod";

export const AppTypeSchema = z.enum(["PUBLIC", "PRIVATE", "WEB"]);

export const AppsTableSchema = z.object({
  name: z.string(),
  title: z.string(),
  iconUrl: z.string(),
  updateTime: z.string(),
  minAndroidSdkVersion: z.string(),
  playStoreUrl: z.string(),
  appType: z.string(),
  distributionChannel: z.string(),
  // appType: AppTypeSchema, // DBから取得した際にはstring型で取得されるため、zodで型を定義していない
  updated_at: z.string(),
  created_at: z.string(),
});
