import useSWR from "swr";

import { FormPolicy } from "@/app/(main)/types/policy";
import { getPolicyFromDB } from "../../policies/actions/get-policy";

/**
 *
 * @param key SWRのkey
 * @param enterpriseName "enterprises/{enterpriseId}"
 * @param policyId
 * @returns
 */
export function usePolicyForm(
  key: string,
  enterpriseName: string,
  policyId: string
) {
  const { data, error, isLoading, mutate, isValidating } = useSWR<FormPolicy>(
    policyId === "new" ? null : key, // policyIdがnewの場合はnullを返す fetchしない
    () => getPolicyFromDB(enterpriseName, policyId),
    {
      // dedupingInterval: 3600000, // enterpriseName,policyIdが同じ場合は1時間、関数を実行しない
      revalidateOnFocus: false, // タブ移動しても関数を実行しない
      // revalidateIfStale: false, // 追加: キャッシュが古くても再検証しない ※画面のレンダリング時のデータ更新を防ぐため
      // revalidateOnMount: true, //  コンポーネントマウント時に必ず再検証
      // keepPreviousData: false, // 前のデータを保持しない
      onError: (error) => {
        console.error("policyFormData error", error);
      },
    }
  );

  return {
    policyFormData: data,
    isLoading,
    isError: error,
    mutate,
    isValidating,
  };
}
