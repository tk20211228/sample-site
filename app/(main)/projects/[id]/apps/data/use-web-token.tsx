import useSWR from "swr";

import { getAndroidManagementWebToken } from "../actions/get-web-token";
import { IframeType } from "@/app/(main)/types/apps";
import { getBaseURL } from "@/lib/base-url/client";

/**
 * Android Management APIのWeb Tokenを取得
 * @param key　SWRのkey
 * @param enterpriseName　"enterprises/{enterpriseId}"
 * @param tokenType　iframeの種類
 * @returns
 */
export function useWebToken(
  key: string,
  enterpriseName: string,
  tokenType: IframeType
) {
  const currentUrl = window.location.origin;
  const parentFrameUrl = getBaseURL(currentUrl);

  const { data, error, isLoading, mutate } = useSWR(
    key,
    () =>
      getAndroidManagementWebToken(enterpriseName, tokenType, parentFrameUrl),
    {
      dedupingInterval: 3600000, // 1時間、関数を実行しない
      revalidateOnFocus: false, // タブ移動しても関数を実行しない　//iframeの操作も検知されるため、追加
      // revalidateOnMount: true, // コンポーネントマウント時に必ず再検証
      // keepPreviousData: false, // 前のデータを保持しない
    }
  );

  return {
    token: data?.value,
    isLoading,
    error,
    mutate,
  };
}
