"use server";

import { createAndroidManagementClient } from "@/actions/emm/client";
import { AndroidManagementPolicy, PolicySummary } from "@/app/types/policy";
import { createClient } from "@/lib/supabase/server";
import { Json } from "@/types/database";
import { androidmanagement_v1 } from "googleapis";
import { revalidatePath } from "next/cache";
import { listPolicyDetails } from "../../../projects/data/policy";
import { saveAndroidManagementPolicy } from "../../actions/save-android-management-policy";

type NextPageToken = string | null | undefined;
type ListPoliciesResponse = androidmanagement_v1.Schema$ListPoliciesResponse;

/**
 * ポリシーをDBに保存する関数
 * @param allPolicies ポリシーの配列
 * @param enterpriseId エンタープライズID
 * @param supabase Supabaseクライアント
 */
const savePoliciesToDB = async (
  policies: AndroidManagementPolicy[],
  enterpriseId: string,
  policyDisplayNameIdPairs: PolicySummary[]
) => {
  const supabase = await createClient();
  const policiesList = policies
    .map(async (policy) => {
      let policyId = policyDisplayNameIdPairs.find(
        (policyDisplayNameIdPair) =>
          policyDisplayNameIdPair.name === policy.name
      )?.policyId;
      let policyDisplayName = policyDisplayNameIdPairs.find(
        (policyDisplayNameIdPair) =>
          policyDisplayNameIdPair.policyId === policyId
      )?.policyDisplayName;
      if (!policyId || !policyDisplayName) {
        // ポリシーデータをDBに保存
        const saveData = await saveAndroidManagementPolicy({
          enterpriseId,
          policyDisplayName: "不明なポリシー",
          policyData: policy,
        });
        policyId = saveData.policy_id;
        policyDisplayName = saveData.policy_display_name;
      }
      return {
        policy_id: policyId,
        enterprise_id: enterpriseId,
        policy_data: policy as Json,
        policy_display_name: policyDisplayName,
        updated_at: new Date().toISOString(),
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== undefined);

  const allPolicies = await Promise.all(policiesList);

  const { error } = await supabase.from("policies").upsert(allPolicies);

  if (error) {
    throw new Error(`Failed to save policies: ${error.message}`);
  }
};

/**
 * Googleサーバーとポリシー情報を同期する関数
 * @param enterpriseId エンタープライズID
 * @returns ポリシーの配列
 * 参考URL:https://developers.google.com/android/management/reference/rest/v1/enterprises.policies/list
 * ライブラリ:https://googleapis.dev/nodejs/googleapis/latest/androidmanagement/classes/Resource$Enterprises$Policies.html#list
 */
export const syncPoliciesWithGoogle = async (enterpriseId: string) => {
  // 認証
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }
  const policyDisplayNameIdPairs = await listPolicyDetails(enterpriseId);

  let nextPageToken: NextPageToken = undefined;
  const androidmanagement = await createAndroidManagementClient();
  const enterpriseName = `enterprises/${enterpriseId}`;

  do {
    const { data } = await androidmanagement.enterprises.policies
      .list({
        parent: enterpriseName,
        pageSize: 20, // 1回のAPI呼び出しで取得するポリシー数
        pageToken: nextPageToken,
      })
      .catch((error) => {
        console.error("Error Get device list:", error.message);
        throw new Error(error.message);
      });
    const { policies, nextPageToken: token } = data as ListPoliciesResponse;
    if (!policies) break;
    // １ページ毎にDBに保存
    await savePoliciesToDB(policies, enterpriseId, policyDisplayNameIdPairs);
    nextPageToken = token;
  } while (nextPageToken);
  revalidatePath(`/${enterpriseId}/policies`);
};
