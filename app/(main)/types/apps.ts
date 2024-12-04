import { z } from "zod";
import { AppsTableSchema } from "../schema/apps";
import { androidmanagement_v1 } from "googleapis";

export type AppsTableType = z.infer<typeof AppsTableSchema>;

export type AppData = androidmanagement_v1.Schema$Application;
