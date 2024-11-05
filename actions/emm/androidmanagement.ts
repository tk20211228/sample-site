import { androidmanagement_v1, google } from "googleapis";
import { googleServiceAuth } from "./auth";

export function createAndroidManagementClient() {
  const auth = googleServiceAuth();
  const androidmanagement: androidmanagement_v1.Androidmanagement =
    google.androidmanagement({
      version: "v1",
      auth,
    });
  return androidmanagement;
}
