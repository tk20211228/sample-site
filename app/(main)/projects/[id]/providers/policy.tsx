"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { PolicyTableType } from "../policies/types/policy";

type ContextType = {
  policyTableData: PolicyTableType[];
  setPolicyTableData: (data: PolicyTableType[]) => void;
};

const Context = createContext<ContextType>({
  policyTableData: [],
  setPolicyTableData: () => {},
} as ContextType);

export function PolicyProvider({ children }: { children: ReactNode }) {
  const [policyTableData, setPolicyTableData] = useState<PolicyTableType[]>([]);

  return (
    <Context.Provider value={{ policyTableData, setPolicyTableData }}>
      {children}
    </Context.Provider>
  );
}

export const usePolicy = () => useContext(Context);
