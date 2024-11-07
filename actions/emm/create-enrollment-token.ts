"use server";

import { createClient } from "@/lib/supabase/server";
import { createAndroidManagementClient } from "./androidmanagement";

/**
 * エンロールメントトークンを作成
 * @param parent エンタープライズID
 * @returns エンロールメントトークン
 * 参考ドキュメント：https://developers.google.com/android/management/reference/rest/v1/enterprises.enrollmentTokens?hl=ja
 *
 */
export const createEnrollmentToken = async (parent: string) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }
  const androidmanagement = createAndroidManagementClient();
  const { data } = await androidmanagement.enterprises.enrollmentTokens
    .create({
      parent, // parent: "enterprises/my-enterprise",
      requestBody: {
        // request body parameters
        // {
        //   "additionalData": "my_additionalData",
        allowPersonalUsage: "ALLOW_PERSONAL_USAGE_UNSPECIFIED",
        //   "duration": "my_duration",
        //   "expirationTimestamp": "my_expirationTimestamp",
        //   "name": "my_name",
        oneTimeOnly: false,
        policyName: `${parent}/policies/first-policy`,
        //   "qrCode": "my_qrCode",
        //   "user": {},
        //   "value": "my_value"
        // }
      },
    })
    .catch((error) => {
      console.error("Error creating enrollment token", error.message);
      throw new Error(error.message);
    });
  console.log("enrollment token data", data);
  // return data.value;
  return data.qrCode;
};
