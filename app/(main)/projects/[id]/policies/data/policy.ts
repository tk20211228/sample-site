"use server";

import { createAndroidManagementClient } from "@/actions/emm/client";
import { getEnterprisesTableId } from "@/app/(main)/lib/get-enterprises-table-id";
import { createClient } from "@/lib/supabase/server";
import { Json } from "@/types/database";
import { androidmanagement_v1 } from "googleapis";

type NextPageToken = string | null | undefined;
type Policy = androidmanagement_v1.Schema$Policy;
type PolicyListData = {
  policies?: Policy[];
  nextPageToken?: NextPageToken;
};

/**
 * Googleサーバーとポリシー情報を同期後、DBからポリシーを取得する関数
 * @param enterpriseName エンタープライズID
 * @returns ポリシーの配列
 */
export const getSyncedPolicies = async (enterpriseName: string) => {
  // 認証
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }

  let allPolicies: Policy[] = [];
  let nextPageToken: NextPageToken = undefined;
  const enterprisesTableId = await getEnterprisesTableId(enterpriseName);

  const androidmanagement = await createAndroidManagementClient();
  try {
    do {
      const {
        data: { policies, nextPageToken: token },
      }: { data: PolicyListData } = await androidmanagement.enterprises.policies
        .list({
          parent: enterpriseName,
          pageSize: 20, // 1回のAPI呼び出しで取得するポリシー数
          pageToken: nextPageToken,
        })
        .catch((error) => {
          console.error("Error Get device list:", error.message);
          throw new Error(error.message);
        });

      if (!policies || policies.length === 0) break;

      allPolicies = [...allPolicies, ...policies];
      nextPageToken = token;

      // １ページ毎にDBに保存
      await savePoliciesToDB(policies, enterprisesTableId)
        .then(() => {
          allPolicies = []; // メモリをクリア
        })
        .catch((error) => {
          console.error("Error Save policies to DB:", error);
          throw new Error(error);
        });
    } while (nextPageToken);
    // 残りのポリシーをDBに保存
    if (allPolicies.length > 0) {
      await savePoliciesToDB(allPolicies, enterprisesTableId);
    }

    // 同期完了後、DBからポリシーを取得する
    const { data } = await supabase
      .from("policies")
      .select(
        `
        id,
        enterprise_table_id,
        policy_name,
        display_name,
        created_at,
        updated_at,
        policy_config_data->>version
        `
      )
      .eq("enterprise_table_id", enterprisesTableId)
      .order("display_name", { ascending: true });

    if (!data) {
      throw new Error("Failed to fetch policies from database");
    }

    return data;
  } catch (error) {
    console.error("Error Get policies list:", error);
    throw error;
  }
};

/**
 * ポリシーをDBに保存する関数
 * @param allPolicies ポリシーの配列
 * @param enterprisesTableId エンタープライズID
 * @param supabase Supabaseクライアント
 */
const savePoliciesToDB = async (
  allPolicies: Policy[],
  enterprisesTableId: string
) => {
  const supabase = await createClient();
  const policiesList = allPolicies
    .map((policy) => {
      if (!policy.name) return;
      return {
        enterprise_table_id: enterprisesTableId,
        policy_name: policy.name,
        policy_config_data: policy as Json,
        // created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== undefined);

  const { error } = await supabase.from("policies").upsert(policiesList, {
    onConflict: "policy_name",
  });

  if (error) {
    throw new Error(`Failed to save policies: ${error.message}`);
  }
};
