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
import { Apps, FormPolicy, PolicyApps } from "@/app/(main)/types/policy";
import { Form } from "@/components/ui/form";
import { useParams, useSearchParams } from "next/navigation";
import { usePolicyForm } from "../apps/data/use-policy-form";
import { defaultGeneralConfig } from "../policies/device-general/data/default-general-config";

type ContextType = {
  currentCreatePolicy: FormPolicy;
  setCurrentCreatePolicy: (data: FormPolicy) => void;
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

export function PolicyProvider({ children }: { children: ReactNode }) {
  const [apps, setApps] = useState<Apps[]>([]); //アプリケーションのデータ
  const [policyApps, setPolicyApps] = useState<PolicyApps[]>([]); // ポリシーに適用されるアプリケーション
  // useState<PolicyApps[]>(defaultSelectedApps); // ポリシーに適用されるアプリケーション

  const searchParams = useSearchParams();
  const policyId = searchParams.get("policyId") || "new";
  const params = useParams();
  const enterpriseName = `enterprises/${params.id}`;

  const [currentCreatePolicy, setCurrentCreatePolicy] =
    useState<FormPolicy>(defaultGeneralConfig);

  const form = useForm<FormPolicy>({
    mode: "onChange",
    resolver: zodResolver(formPolicySchema),

    defaultValues: {
      display_name: currentCreatePolicy.display_name || "",
      policy_config_data: {
        ...currentCreatePolicy.policy_config_data,
        applications: policyApps,
      },
    },
    values: currentCreatePolicy, // フォームの値を設定
  });

  const key = `/api/policy/${enterpriseName}/${policyId}`;
  const {
    policyFormData,
    // , isError, isValidating, mutate, isLoading
  } = usePolicyForm(key, enterpriseName, policyId);

  useEffect(() => {
    console.log("policyFormData", policyFormData); //policyIdが”new”である場合、undefined
    // console.log("policyApps", policyApps);
    // if (isError) {
    //   toast.error("ポリシーが取得できませんでした", {
    //     description: isError?.message,
    //   });
    //   return;
    // }
    // 新規作成の場合の処理
    if (policyId === "new") {
      setCurrentCreatePolicy(defaultGeneralConfig);
      form.reset(defaultGeneralConfig);
      return;
    }

    // データ取得成功時
    if (policyFormData) {
      setCurrentCreatePolicy(policyFormData);
      form.reset(policyFormData);
    }
    // if (!policyFormData && isError) {
    //   toast.error("ポリシーが取得できませんでした", {
    //     description: isError?.message,
    //   });
    //   return;
    // }

    // form.setValue("policy_config_data.applications", policyApps);
  }, [policyId, policyFormData, form]);

  return (
    <Form {...form}>
      <Context.Provider
        value={{
          currentCreatePolicy,
          setCurrentCreatePolicy,
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

export const usePolicy = () => useContext(Context);

// const defaultSelectedApps: PolicyApps[] = [
//   {
//     packageName: "com.android.chrome",
//     installType: "REQUIRED_FOR_SETUP",
//   },
// ];
