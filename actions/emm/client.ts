import {
  androidenterprise_v1,
  androidmanagement_v1,
  androidpublisher_v3,
  google,
} from "googleapis";
import { googleServiceAuth } from "./auth";

export async function createAndroidManagementClient() {
  const auth = await googleServiceAuth();
  const androidmanagement: androidmanagement_v1.Androidmanagement =
    google.androidmanagement({
      version: "v1",
      auth,
    });
  return androidmanagement;
}

export async function createAndroidEnterpriseClient() {
  const auth = await googleServiceAuth();
  const androidmanagement: androidenterprise_v1.Androidenterprise =
    google.androidenterprise({
      version: "v1",
      auth,
    });
  return androidmanagement;
}

export async function createAndroidPublisherClient() {
  const auth = await googleServiceAuth();
  const androidpublisher: androidpublisher_v3.Androidpublisher =
    google.androidpublisher({
      version: "v3",
      auth,
    });
  return androidpublisher;
}
