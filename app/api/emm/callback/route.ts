import { createAndroidManagementClient } from "@/actions/emm/client";
import { decryptData } from "@/actions/emm/crypto";
import { createDefaultPolicy } from "@/actions/emm/policy";
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
    // Supabaseクライアントを作成
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not found");
    }
    console.log("enterpriseToken", enterpriseToken);
    const { id: projectId, name: signupUrlName } = decryptData(
      encryptedData.value
    );
    //Cookieを削除
    cookieStore.delete("emm_signup_object");
    console.log("signup", signupUrlName);
    // token,signupUrl,でenterpriseを作成する。
    const androidmanagement = await createAndroidManagementClient();
    const { data } = await androidmanagement.enterprises
      .create({
        enterpriseToken,
        projectId: process.env.EMM_PROJECT_ID,
        signupUrlName,
        // Request body metadata
        requestBody: {
          // request body parameters
          // {
          //   "appAutoApprovalEnabled": false,
          //   "contactInfo": {},
          //   "enabledNotificationTypes": [],
          enterpriseDisplayName: "t4_my_enterpriseDisplayName",
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
      // まず既存のエンタープライズを確認
      const { data: existingEnterprise } = await supabase
        .from("enterprises")
        .select()
        .eq("enterprise_name", data.name)
        .single();

      // 成功したら、応答文からenterprise_nameを取得し、enterprisesテーブルにアップサート
      const { data: enterprise } = await supabase
        .from("enterprises")
        .upsert(
          {
            enterprise_name: data.name,
            data: JSON.stringify(data),
            // 既存のエンタープライズがある場合は owner_id を変更しない
            ...(existingEnterprise ? {} : { owner_id: user.id }),
          },
          {
            onConflict: "enterprise_name",
          }
        )
        .select()
        .single();
      if (!enterprise) {
        throw new Error("Error upsert enterprise");
      }
      const enterpriseTableId = enterprise.id;

      // 応答文を　enterprise_settings_historyテーブルに保存
      const { error: enterpriseSettingsError } = await supabase
        .from("enterprise_settings_history")
        .insert({
          enterprise_id: enterpriseTableId,
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
        .update({ enterprise_table_id: enterpriseTableId })
        .eq("id", projectId);
      if (projectsError) {
        console.error("Error updating projects:", projectsError);
        throw new Error("Error updating projects");
      }

      // defaultポリシーを作成
      await createDefaultPolicy(data.name, enterpriseTableId).catch((error) => {
        console.error("Error creating default policy:", error);
        throw new Error("Error creating default policy");
      });

      redirect(`/dashboard?enterprise_name=${enterprise.enterprise_name}`);
    }
  }
  redirect("/error");
}
