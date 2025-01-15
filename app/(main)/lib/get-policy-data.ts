import "server-only";

import { createAndroidManagementClient } from "@/actions/emm/client";

/**
 *
 * ポリシーデータを取得し、DBに保存する
 * @param policyName
 * @param enterprisesTableId
 * @returns policyData
 */
export const getGooglePolicyData = async ({
  policyName,
}: {
  policyName: string;
}) => {
  // ポリシーデータを取得
  const androidManagement = await createAndroidManagementClient();
  const { data } = await androidManagement.enterprises.policies.get({
    name: policyName,
  });
  if (!data) {
    console.error("Failed to fetch policy data");
    // デバイス情報にはポリシリー名があるが、googleサーバーからポリシー情報が取得できない場合があるため、throwエラーとしない
    return;
  }
  return data;
};
