// import useSWR from "swr";

// import { FormPolicy } from "@/app/(main)/types/policy";
// import { getPolicyData } from "../actions/get-policy";

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
//       revalidateOnFocus: false, // タブ移動しても関数を実行しない
//     }
//   );

//   return {
//     policyData: data,
//     isLoading,
//     isError: error,
//     isValidating,
//   };
// }
