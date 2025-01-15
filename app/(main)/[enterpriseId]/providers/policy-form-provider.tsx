"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";

import { formPolicySchema } from "@/app/(main)/schema/policy";
import { RouteParams } from "@/app/types/enterprise";
import { Apps, FormPolicy, PolicyApps } from "@/app/types/policy";
import { Form } from "@/components/ui/form";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { defaultGeneralConfig } from "../policies/[policyId]/device-general/data/default-general-config";
import { getPolicyData } from "../policies/actions/get-policy";

type ContextType = {
  // currentCreatePolicy: FormPolicy;
  // setCurrentCreatePolicy: (data: FormPolicy) => void;
  apps: Apps[];
  setApps: (apps: Apps[]) => void;
  policyApps: PolicyApps[];
  setPolicyApps: (apps: PolicyApps[]) => void;
};

const Context = createContext<ContextType>({
  currentCreatePolicy: defaultGeneralConfig,
  setCurrentCreatePolicy: () => {},
  apps: [],
  setApps: () => {},
  policyApps: [],
  setPolicyApps: () => {},
} as ContextType);

export function PolicyFormProvider({ children }: { children: ReactNode }) {
  const [apps, setApps] = useState<Apps[]>([]); //アプリケーションのデータ
  const [policyApps, setPolicyApps] = useState<PolicyApps[]>([]); // ポリシーに適用されるアプリケーション
  const params = useParams<RouteParams>();
  const policyId = params.policyId ?? "new";

  // const [currentCreatePolicy, setCurrentCreatePolicy] =
  //   useState<FormPolicy>(defaultGeneralConfig);
  //データ取得をSWRで管理
  // const { policyData } = usePolicy(policyId);
  const key = `/api/policy/${policyId}`;
  const { data } = useSWR<FormPolicy>(
    policyId === "new" ? null : key, // policyIdがnewの場合はnullを返す fetchしない
    () => getPolicyData(policyId),
    {
      revalidateOnFocus: false, // タブ移動しても関数を実行しない
    }
  );

  const form = useForm<FormPolicy>({
    mode: "onChange",
    resolver: zodResolver(formPolicySchema),
    // defaultValues: {
    //   policyDisplayName: currentCreatePolicy.policyDisplayName || "",
    //   policyData: {
    //     ...currentCreatePolicy.policyData,
    //     applications: policyApps,
    //   },
    // },
    defaultValues: defaultGeneralConfig,
    // values: currentCreatePolicy, // フォームの値を設定
    values: data, // フォームの値を設定
  });

  useEffect(() => {
    // 新規作成の場合の処理
    if (policyId === "new") {
      // setCurrentCreatePolicy(defaultGeneralConfig);
      form.reset(defaultGeneralConfig);
      return;
    }
    // データ取得成功時
    if (data) {
      // setCurrentCreatePolicy(policyData);
      form.reset(data);
    }
  }, [policyId, form, data]);

  return (
    <Form {...form}>
      <Context.Provider
        value={{
          // currentCreatePolicy,
          // setCurrentCreatePolicy,
          apps,
          setApps,
          policyApps,
          setPolicyApps,
        }}
      >
        {children}
      </Context.Provider>
    </Form>
  );
}

export const usePolicyForm = () => useContext(Context);
