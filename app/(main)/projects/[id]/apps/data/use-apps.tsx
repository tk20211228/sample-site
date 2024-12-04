import useSWR from "swr";

import { AppsTableType } from "@/app/(main)/types/apps";
import { getDbApps } from "./get-db-apps";

export function useApps(key: string, enterpriseName: string, appType?: string) {
  // console.log("useApps", appType);
  // const { data, error, isLoading, mutate } = useSWR<AppsTableType[]>(key, () =>
  const { data, error, isLoading, mutate } = useSWR<AppsTableType[]>(
    key,
    () => getDbApps(enterpriseName, appType),
    {
      // dedupingInterval: 3600000, // enterpriseIdが同じ場合は1時間、関数を実行しない
      revalidateOnFocus: false, // タブ移動しても関数を実行しない　//iframeの操作も検知されるため、追加
      // revalidateOnMount: true, //  コンポーネントマウント時に必ず再検証
      // keepPreviousData: false, // 前のデータを保持しない
    }
  );

  return {
    apps: data,
    isLoading,
    isError: error,
    mutate,
  };
}
