"use server";

import { createClient } from "@/lib/supabase/server";
import { createAndroidManagementClient } from "../../../../../../actions/emm/client";
import { saveApp } from "../actions/apps";

export const getAppData = async (
  packageName: string,
  enterpriseName: string
) => {
  // 認証
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }
  const androidmanagement = await createAndroidManagementClient(); //jp-JP
  const { data } = await androidmanagement.enterprises.applications
    .get({
      // The preferred language for localized application info, as a BCP47 tag (e.g. "en-US", "de"). If not specified the default language of the application will be used.
      languageCode: "JP",
      // The name of the application in the form enterprises/{enterpriseId\}/applications/{package_name\}.
      name: `${enterpriseName}/applications/${packageName}`,
    })
    .catch((error) => {
      console.error("Error getAppData:", error.message);
      throw new Error(error.message);
    });
  if (!data) {
    throw new Error("Get getAppData failed");
  }
  console.log("Get getAppData:", data);

  const saveData = await saveApp(data, enterpriseName);

  return saveData;
};
