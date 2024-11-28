import { z } from "zod";
import { publicAppsTableSchema } from "../schema/apps";
import { androidmanagement_v1 } from "googleapis";

export type PublicAppsTableType = z.infer<typeof publicAppsTableSchema>;

export type AppData = androidmanagement_v1.Schema$Application;
