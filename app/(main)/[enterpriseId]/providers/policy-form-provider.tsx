"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";

import { formPolicySchema } from "@/app/(main)/schema/policy";
import { RouteParams } from "@/app/types/enterprise";
import { FormPolicy } from "@/app/types/policy";
import { Form } from "@/components/ui/form";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { defaultGeneralConfig } from "../policies/[policyIdentifier]/device-general/data/default-general-config";
import { getPolicyData } from "../policies/actions/get-policy";

// type ContextType = {};

// const Context = createContext<ContextType>({} as ContextType);

export function PolicyFormProvider({ children }: { children: ReactNode }) {
  const params = useParams<RouteParams>();
  const enterpriseId = params.enterpriseId;
  const policyIdentifier = params.policyIdentifier ?? "new";

  const key = `/api/policy/${policyIdentifier}`;
  const { data } = useSWR<FormPolicy>(
    policyIdentifier === "new" ? null : key, // policyIdがnewの場合はnullを返す fetchしない
    () => getPolicyData(enterpriseId, policyIdentifier),
    {
      revalidateOnFocus: false, // タブ移動しても関数を実行しない
    }
  );

  const form = useForm<FormPolicy>({
    mode: "onChange",
    resolver: zodResolver(formPolicySchema),
    defaultValues: defaultGeneralConfig,
    values: data, // フォームの値を設定
  });

  useEffect(() => {
    // 新規作成の場合の処理
    if (policyIdentifier === "new") {
      form.reset(defaultGeneralConfig);
      return;
    }
    // データ取得成功時
    if (data) {
      form.reset(data);
    }
  }, [policyIdentifier, form, data]);

  return (
    <Form {...form}>
      {/* <Context.Provider value={{}}>{children}</Context.Provider> */}
      {children}
    </Form>
  );
}

// export const usePolicyForm = () => useContext(Context);
