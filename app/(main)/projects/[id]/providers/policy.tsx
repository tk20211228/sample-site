"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { PoliciesDbTableSchema } from "../policies/types/policy";

type ContextType = {
  policyTableData: PoliciesDbTableSchema[];
  setPolicyTableData: (data: PoliciesDbTableSchema[]) => void;
};

const Context = createContext<ContextType>({
  policyTableData: [],
  setPolicyTableData: () => {},
} as ContextType);

export function PolicyProvider({ children }: { children: ReactNode }) {
  const [policyTableData, setPolicyTableData] = useState<
    PoliciesDbTableSchema[]
  >([]);

  return (
    <Context.Provider value={{ policyTableData, setPolicyTableData }}>
      {children}
    </Context.Provider>
  );
}

export const usePolicy = () => useContext(Context);
