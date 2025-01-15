// import useSWR from "swr";

// import { getPolicyData } from "../actions/get-policy";
// import { FormPolicy } from "../../../../types/policy";

// /**
//  *
//  * @param key SWRのkey
//  * @param enterpriseName "enterprises/{enterpriseId}"
//  * @param policyId
//  * @returns
//  */
// export function usePolicy(policyId: string) {
//   const key = `/api/policy/${policyId}`;
//   const { data, error, isLoading, isValidating } = useSWR<FormPolicy>(
//     policyId === "new" ? null : key, // policyIdがnewの場合はnullを返す fetchしない
//     () => getPolicyData(policyId),
//     {
//       // dedupingInterval: 3600000, // enterpriseName,policyIdが同じ場合は1時間、関数を実行しない
//       revalidateOnFocus: false, // タブ移動しても関数を実行しない
//       // revalidateIfStale: false, // 追加: キャッシュが古くても再検証しない ※画面のレンダリング時のデータ更新を防ぐため
//       // keepPreviousData: false, // 前のデータを保持しない
//       onError: (error) => {
//         console.error("policyFormData error", error);
//       },
//     }
//   );

//   return {
//     policyData: data,
//     isLoading,
//     isError: error,
//     isValidating,
//   };
// }
