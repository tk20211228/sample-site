"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { PoliciesDbTableSchema } from "../policies/types/policy";
import { getEnterpriseId } from "../../../../../actions/emm/get-enterpriseid";
import { usePathname } from "next/navigation";

type ContextType = {
  enterpriseId: string;
  setEnterpriseId: (id: string) => void;
};

const Context = createContext<ContextType>({
  enterpriseId: "",
  setEnterpriseId: () => {},
} as ContextType);

export function EnterpriseProvider({ children }: { children: ReactNode }) {
  const [enterpriseId, setEnterpriseId] = useState<string>("");
  const pathname = usePathname();
  // 正規表現を使ってURLからenterpriseIdを抽出
  const match = pathname.match(/\/projects\/([^/]+)(?:\/|$)/);
  const id = match ? match[1] : null;
  if (id) {
    setEnterpriseId(id);
  }

  return (
    <Context.Provider value={{ enterpriseId, setEnterpriseId }}>
      {children}
    </Context.Provider>
  );
}

export const usePolicy = () => useContext(Context);
