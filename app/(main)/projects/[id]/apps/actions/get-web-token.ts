"use server";

import { createClient } from "@/lib/supabase/server";
import {
  createAndroidEnterpriseClient,
  createAndroidManagementClient,
} from "../../../../../../actions/emm/client";

/**
 * Android Management API
 * @param enterpriseName
 * @param tokenType
 * @returns Android Management Web Token
 * APIドキュメント: https://developers.google.com/android/management/reference/rest/v1/enterprises.webTokens/create?hl=ja
 * ライブラリドキュメント: https://googleapis.dev/nodejs/googleapis/latest/androidmanagement/classes/Resource$Enterprises$Webtokens.html#create
 */
export const getAndroidManagementWebToken = async (
  enterpriseName: string,
  tokenType: "PUBLIC" | "PRIVATE" | "WEB"
) => {
  // 認証
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }

  // トークンタイプに基づいて iframeFeatures を設定
  const iframeFeatures = (() => {
    switch (tokenType) {
      case "PUBLIC":
        return ["PLAY_SEARCH", "STORE_BUILDER"];
      case "PRIVATE":
        return ["PRIVATE_APPS", "STORE_BUILDER"];
      case "WEB":
        return ["WEB_APPS", "STORE_BUILDER"];
      default:
        return ["STORE_BUILDER"];
    }
  })();

  const androidmanagement = await createAndroidManagementClient();
  const { data: value } = await androidmanagement.enterprises.webTokens
    .create({
      parent: enterpriseName,
      requestBody: {
        enabledFeatures: iframeFeatures,
        parentFrameUrl: process.env.HOST,
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
