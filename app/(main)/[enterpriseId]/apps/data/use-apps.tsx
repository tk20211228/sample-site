import useSWR from "swr";

import { AppsTableType, AppType } from "@/app/types/apps";
import { getApps } from "./fetch-enterprise-apps";

/**
 * DBからアプリ情報を取得
 * @param key　SWRのkey
 * @param enterpriseName　"enterprises/{enterpriseId}"
 * @param appType アプリの種類　※引数がない場合は全てのアプリを取得
 * @returns
 */
export function useApps(enterpriseId: string, appType?: AppType) {
  const key = `/api/apps/${enterpriseId}/${appType}`;
  console.log("key", key);
  const { data, error, isLoading, mutate, isValidating } = useSWR<
    AppsTableType[]
  >(key, () => getApps(enterpriseId, appType), {
    // dedupingInterval: 3600000, // enterpriseIdが同じ場合は1時間、関数を実行しない
    revalidateOnFocus: false, // タブ移動しても関数を実行しない　//iframeの操作も検知されるため、追加。
    revalidateIfStale: false, // 追加: キャッシュが古くても再検証しない
    // revalidateOnMount: true, //  コンポーネントマウント時に必ず再検証
    // keepPreviousData: false, // 前のデータを保持しない
  });

  return {
    apps: data,
    isLoading,
    isError: error,
    mutate,
    isValidating,
  };
}
