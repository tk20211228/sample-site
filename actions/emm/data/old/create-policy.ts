"use server";

import { createClient } from "@/lib/supabase/server";
import { androidmanagement_v1 } from "googleapis";
import { createAndroidManagementClient } from "../../client";
import { defaultPolicyRequestBody } from "@/data/default-policy-request-body";

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
  const requestBody = defaultPolicyRequestBody;
  const androidmanagement = await createAndroidManagementClient();
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
