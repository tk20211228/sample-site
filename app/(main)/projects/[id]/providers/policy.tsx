"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { PolicyTableType } from "../policies/types/policy";
import { useForm } from "react-hook-form";
import { CreatePolicyForm } from "@/app/(main)/types/policy";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPolicyFormSchema } from "@/app/(main)/schema/policy";
import { defaultGeneralConfig } from "../policies/general/data/default-general-config";
import { Form } from "@/components/ui/form";

type ContextType = {
  policyTableData: PolicyTableType[];
  setPolicyTableData: (data: PolicyTableType[]) => void;
  currentCreatePolicy: CreatePolicyForm;
  setCurrentCreatePolicy: (data: CreatePolicyForm) => void;
};

const Context = createContext<ContextType>({
  policyTableData: [],
  setPolicyTableData: () => {},
  currentCreatePolicy: defaultGeneralConfig,
  setCurrentCreatePolicy: () => {},
} as ContextType);

export function PolicyProvider({ children }: { children: ReactNode }) {
  const [policyTableData, setPolicyTableData] = useState<PolicyTableType[]>([]);

  const [currentCreatePolicy, setCurrentCreatePolicy] =
    useState<CreatePolicyForm>(defaultGeneralConfig);
  const form = useForm<CreatePolicyForm>({
    mode: "onChange",
    resolver: zodResolver(createPolicyFormSchema),
    defaultValues: currentCreatePolicy,
    values: currentCreatePolicy,
  });

  // currentCreatePolicyが変更されたときにformの値を更新
  useEffect(() => {
    form.reset(currentCreatePolicy);
  }, [currentCreatePolicy, form]);

  return (
    <Form {...form}>
      <Context.Provider
        value={{
          policyTableData,
          setPolicyTableData,
          currentCreatePolicy,
          setCurrentCreatePolicy,
        }}
      >
        {children}
      </Context.Provider>
    </Form>
  );
}

export const usePolicy = () => useContext(Context);
