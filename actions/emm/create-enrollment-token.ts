"use server";

import { createClient } from "@/lib/supabase/server";
import { createAndroidManagementClient } from "./androidmanagement";

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
      // parent: "enterprises/my-enterprise",
      parent,
      requestBody: {
        // request body parameters
        // {
        //   "additionalData": "my_additionalData",
        //   "allowPersonalUsage": "my_allowPersonalUsage",
        //   "duration": "my_duration",
        //   "expirationTimestamp": "my_expirationTimestamp",
        //   "name": "my_name",
        //   "oneTimeOnly": false,
        //   "policyName": "my_policyName",
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
  return data.qrCode;
};
