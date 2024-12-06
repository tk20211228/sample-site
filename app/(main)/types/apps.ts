import { z } from "zod";
import { AppsTableSchema, AppTypeSchema } from "../schema/apps";
import { androidmanagement_v1 } from "googleapis";

export type AppsTableType = z.infer<typeof AppsTableSchema>;

export type AppData = androidmanagement_v1.Schema$Application;

export type AppType = z.infer<typeof AppTypeSchema>;

/**
 * iframeの種類
 * https://developers.google.com/android/management/reference/rest/v1/enterprises.webTokens?hl=ja#iframefeature
 */
export type IframeType =
  | "PLAY_SEARCH"
  | "PRIVATE_APPS"
  | "WEB_APPS"
  | "STORE_BUILDER"
  | "MANAGED_CONFIGURATIONS"
  | "ZERO_TOUCH_CUSTOMER_MANAGEMENT";
