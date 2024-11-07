"use server";

import { firstPolicyRequestBody } from "@/data/firstPolicyRequestBody";
import { createClient } from "@/lib/supabase/server";
import { androidmanagement_v1 } from "googleapis";
import { createAndroidManagementClient } from "./androidmanagement";

export const createPolicy = async (
  enterpriseName: string,
  policyName: string
) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }
  const requestBody: androidmanagement_v1.Schema$Policy =
    firstPolicyRequestBody;
  const androidmanagement = createAndroidManagementClient();
  const { data } = await androidmanagement.enterprises.policies
    .patch({
      name: `${enterpriseName}/policies/${policyName}`,
      requestBody,
    })
    .catch((error) => {
      console.error("Error creating signup URL:", error.message);
      throw new Error(error.message);
    });
  console.log("data", data);
  if (!data) {
    throw new Error("Policy creation failed");
  }
  console.log("Policy created:", data);
};
