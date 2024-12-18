import useSWR from "swr";

import { PolicyTableType } from "../../policies/types/policy";
import { getPoliciesTableData } from "../../policies/data/get-policies-table";

export function usePoliciesTableData(key: string, enterpriseName: string) {
  // console.log("usePoliciesTableData", key, enterpriseName);
  const { data, error, isLoading, mutate, isValidating } = useSWR<
    PolicyTableType[]
  >(key, () => getPoliciesTableData(enterpriseName), {
    // dedupingInterval: 3600000, // が同じ場合は1時間、関数を実行しない
    // revalidateOnFocus: false, // タブ移動しても関数を実行しない
    revalidateIfStale: false, // 追加: キャッシュが古くても再検証しない ※画面のレンダリング時のデータ更新を防ぐため
    // revalidateOnMount: true, //  コンポーネントマウント時に必ず再検証
    // keepPreviousData: false, // 前のデータを保持しない
  });

  // 楽観的更新のためのユーティリティ関数
  const addPolicyTableData = async (newPolicy: PolicyTableType) => {
    // DBに保存する前に、既存のデータに新しいポリシーを追加
    await mutate(async (currentData) => {
      if (!currentData) return [newPolicy];

      const existingPolicyIndex = currentData.findIndex(
        (policy) => policy.id === newPolicy.id
      );

      if (existingPolicyIndex >= 0) {
        const updatedData = [...currentData];
        updatedData[existingPolicyIndex] = newPolicy;
        return updatedData;
      } else {
        return [...currentData, newPolicy];
      }
    }, false); // falseは即時的な再検証を防ぐ
  };

  const deletePolicyTableData = async (policyId: string) => {
    // DBに削除を反映する前に、既存のデータから該当ポリシーを削除
    await mutate(async (currentData) => {
      return currentData?.filter((policy) => policy.id !== policyId) || [];
    }, false);
  };

  const deletePoliciesTableData = async (policyIds: string[]) => {
    // DBに削除を反映する前に、既存のデータから該当ポリシーを削除
    await mutate(async (currentData) => {
      return (
        currentData?.filter((policy) => !policyIds.includes(policy.id)) || []
      );
    }, false);
  };

  return {
    policyFormData: data,
    isLoading,
    isError: error,
    mutate,
    isValidating,
    addPolicyTableData,
    deletePolicyTableData,
    deletePoliciesTableData,
  };
}
