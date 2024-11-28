"use server";

import { createClient } from "@/lib/supabase/server";
import {
  createAndroidEnterpriseClient,
  createAndroidManagementClient,
} from "./client";

/**
 * Android Management API
 * @param enterpriseName
 * @returns Android Management Web Token
 *
 */
export const getAndroidManagementWebToken = async (enterpriseName: string) => {
  // 認証
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }
  const androidmanagement = await createAndroidManagementClient();
  const { data: value } = await androidmanagement.enterprises.webTokens
    .create({
      parent: enterpriseName,
      requestBody: {
        // request body parameters
        // {
        // enabledFeatures: ["PLAY_SEARCH"],
        // name: "my_name",
        parentFrameUrl: process.env.HOST,
        // permissions: ["APPROVE_APPS"],
        // value: "my_value",
        // }
      },
    })
    .catch((error) => {
      console.error("Error get AndroidManagementWebToken:", error.message);
      throw new Error(error.message);
    });
  if (!value) {
    throw new Error("Get AndroidManagementWebToken failed");
  }
  console.log("Get AndroidManagementWebToken:", value);

  return value;
};

import { extractEnterpriseIdFromPath } from "@/lib/extract-enterpriseId-from-path";
interface WebTokenRequest {
  kind: string;
  parent?: string;
  playSearch: {
    enabled: boolean;
    approveApps: boolean;
  };
  privateApps: {
    enabled: boolean;
  };
  webApps: {
    enabled: boolean;
  };
  storeBuilder: {
    enabled: boolean;
  };
  managedConfigurations: {
    enabled: boolean;
  };
  zeroTouch: {
    enabled: boolean;
  };
}

export const getAndroidEnterpriseWebToken = async (enterprisesName: string) => {
  // 認証
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }

  const requestBody: WebTokenRequest = {
    kind: "androidenterprise#administratorWebTokenSpec",
    parent: process.env.HOST,
    playSearch: {
      enabled: true,
      approveApps: true,
    },
    privateApps: {
      enabled: true,
    },
    webApps: {
      enabled: true,
    },
    storeBuilder: {
      enabled: true,
    },
    managedConfigurations: {
      enabled: true,
    },
    zeroTouch: {
      enabled: true,
    },
  };

  const enterpriseId = extractEnterpriseIdFromPath({ enterprisesName });
  const androidenterprise = await createAndroidEnterpriseClient();
  const { data: token } = await androidenterprise.enterprises.createWebToken({
    // The ID of the enterprise.
    enterpriseId,
    // Request body metadata
    requestBody,
    // request body parameters
    // {
    //   "managedConfigurations": {},
    //   "parent": "my_parent",
    //   "permission": [],
    //   "playSearch": {},
    //   "privateApps": {},
    //   "storeBuilder": {},
    //   "webApps": {},
    //   "zeroTouch": {}
    // }
  });
  if (!token) {
    throw new Error("Get createWebToken failed");
  }
  return token;
};
