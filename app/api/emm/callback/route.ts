import { createAndroidManagementClient } from "@/actions/emm/client";
import { decryptData } from "@/actions/emm/crypto";
import { extractEnterpriseIdFromPath } from "@/lib/extract-enterpriseId-from-path";
import { createDefaultPolicy } from "@/actions/emm/policy";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { Json } from "@/types/database";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  // URLのクエリパラメータから'token'を取得
  const enterpriseToken = requestUrl.searchParams.get("enterpriseToken");
  const cookieStore = await cookies();
  const encryptedData = cookieStore.get("emm_signup_object");
  // console.log("encryptedData", encryptedData);
  // console.log("enterpriseToken", enterpriseToken);
  if (enterpriseToken && encryptedData) {
    // Supabaseクライアントを作成
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not found");
    }
    const {
      projectId,
      name: signupUrlName,
      projectName,
    } = decryptData(encryptedData.value);
    //Cookieを削除
    cookieStore.delete("emm_signup_object");

    // token,signupUrl,でenterpriseを作成する。
    const androidmanagement = await createAndroidManagementClient();

    const logo = {
      url: "https://sample-site-pearl.vercel.app/images/logo.png",
      sha256Hash: "zwB79wWGgXq7V5Yk1Jt6khr1BrsM2msHYszD9MOa9Cc=",
    };
    const { data: enterpriseData } = await androidmanagement.enterprises
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
          enabledNotificationTypes: [
            "ENROLLMENT",
            "STATUS_REPORT",
            "COMMAND",
            "USAGE_LOGS",
          ],
          enterpriseDisplayName: projectName,
          logo,
          //   "name": "my_name",
          //   "primaryColor": 0,
          pubsubTopic: process.env.PUBSUB_TOPIC,
          //   "signinDetails": [],
          //   "termsAndConditions": []
          // }
        },
      })
      .catch((error) => {
        console.error("Error creating enterprise:", error);
        throw new Error("Error creating enterprise");
      });
    // console.log(data);

    if (!enterpriseData.name) {
      throw new Error("Enterprise name not found");
    }
    // まず既存のエンタープライズを確認
    const { data: existingEnterprise } = await supabase
      .from("enterprises")
      .select()
      .eq("enterprise_name", enterpriseData.name)
      .single();

    // 成功したら、応答文からenterprise_nameを取得し、enterprisesテーブルにアップサート
    const { data: enterprise } = await supabase
      .from("enterprises")
      .upsert(
        {
          enterprise_name: enterpriseData.name,
          // data: JSON.stringify(data),
          data: enterpriseData as Json,
          updated_at: new Date().toISOString(),
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
      throw new Error("Error upsert enterprise"); // RLSで、エンタープライズIDにアクセスできない場合にエラーをスローする
    }
    const enterpriseTableId = enterprise.id;

    // 応答文を　enterprise_settings_historyテーブルに保存
    const { error: enterpriseSettingsError } = await supabase
      .from("enterprise_settings_history")
      .insert({
        enterprise_id: enterpriseTableId,
        settings: enterpriseData as Json,
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
    await createDefaultPolicy(enterpriseData.name, enterpriseTableId).catch(
      (error) => {
        console.error("Error creating default policy:", error);
        throw new Error("Error creating default policy");
      }
    );

    const enterpriseId = extractEnterpriseIdFromPath({
      enterprisesName: enterpriseData.name,
    });

    redirect(`/projects/${enterpriseId}/devices`);
  }
  redirect("/error");
}
