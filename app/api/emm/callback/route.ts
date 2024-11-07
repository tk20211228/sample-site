import { createAndroidManagementClient } from "@/actions/emm/androidmanagement";
import { decryptData } from "@/actions/emm/crypto";
import { createFirstPolicy } from "@/actions/emm/policy";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  // URLのクエリパラメータから'token'を取得
  const enterpriseToken = requestUrl.searchParams.get("enterpriseToken");
  const cookieStore = await cookies();
  const encryptedData = cookieStore.get("emm_signup_object");
  if (enterpriseToken && encryptedData) {
    // Supabaseクライアントを作成 ※認証も同時に実施
    const supabase = await createClient();
    console.log("enterpriseToken", enterpriseToken);
    const { id: projectId, name: signupUrlName } = decryptData(
      encryptedData.value
    );
    //Cookieを削除
    cookieStore.delete("emm_signup_object");
    console.log("signup", signupUrlName);
    // token,signupUrl,でenterpriseを作成する。
    const androidmanagement = createAndroidManagementClient();
    const { data } = await androidmanagement.enterprises
      .create({
        // Whether the enterprise admin has seen and agreed to the managed Google Play Agreement (https://www.android.com/enterprise/terms/). Always set this to true when creating an EMM-managed enterprise. Do not create the enterprise until the admin has viewed and accepted the agreement.
        // agreementAccepted: "placeholder-value",
        // The enterprise token appended to the callback URL. Only set this when creating a customer-managed enterprise.
        enterpriseToken,
        // The ID of the Google Cloud Platform project which will own the enterprise.
        projectId: process.env.EMM_PROJECT_ID,
        // The name of the SignupUrl used to sign up for the enterprise. Only set this when creating a customer-managed enterprise.
        signupUrlName,

        // Request body metadata
        requestBody: {
          // request body parameters
          // {
          //   "appAutoApprovalEnabled": false,
          //   "contactInfo": {},
          //   "enabledNotificationTypes": [],
          //   "enterpriseDisplayName": "my_enterpriseDisplayName",
          //   "logo": {},
          //   "name": "my_name",
          //   "primaryColor": 0,
          //   "pubsubTopic": "my_pubsubTopic",
          //   "signinDetails": [],
          //   "termsAndConditions": []
          // }
        },
      })
      .catch((error) => {
        console.error("Error creating enterprise:", error);
        throw new Error("Error creating enterprise");
      });
    console.log(data);
    if (data?.name) {
      // 成功したら、応答文からenterprise_nameを取得し、enterprisesテーブルに保存
      const { data: enterprise, error } = await supabase
        .from("enterprises")
        .insert({
          enterprise_name: data.name,
          enterprise_token: enterpriseToken,
          signup_url_name: signupUrlName,
        })
        .select()
        .single();
      if (error) {
        console.error("Error inserting enterprise:", error);
        throw new Error("Error inserting enterprise");
      }
      // 応答文を　enterprise_settings_historyテーブルに保存
      const { error: enterpriseSettingsError } = await supabase
        .from("enterprise_settings_history")
        .insert({
          enterprise_id: enterprise?.id,
          settings: JSON.stringify(data),
        });
      if (enterpriseSettingsError) {
        console.error(
          "Error inserting enterprise settings:",
          enterpriseSettingsError
        );
        throw new Error("Error inserting enterprise settings");
      }
      // projectsテーブルを更新し、enterprise_idをセット
      const { error: projectsError } = await supabase
        .from("projects")
        .update({ enterprise_id: enterprise.id })
        .eq("id", projectId);
      if (projectsError) {
        console.error("Error updating projects:", projectsError);
        throw new Error("Error updating projects");
      }
      await createFirstPolicy(data.name).catch((error) => {
        console.error("Error creating first policy:", error);
        throw new Error("Error creating first policy");
      });

      redirect(`/dashboard?enterprise_name=${enterprise.enterprise_name}`);
    }
  }
  redirect("/error");
}
