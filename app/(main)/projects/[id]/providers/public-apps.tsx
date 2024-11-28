"use client";

import { PublicAppsTableType } from "@/app/(main)/types/apps";
import { ReactNode, createContext, useContext, useState } from "react";

type ContextType = {
  publicAppsTableData: PublicAppsTableType[];
  setPublicAppsTableData: (data: PublicAppsTableType[]) => void;
};

const Context = createContext<ContextType>({
  publicAppsTableData: [],
  setPublicAppsTableData: () => {},
} as ContextType);

export function PublicAppsProvider({ children }: { children: ReactNode }) {
  const [publicAppsTableData, setPublicAppsTableData] = useState<
    PublicAppsTableType[]
  >([]);

  return (
    <Context.Provider
      value={{
        publicAppsTableData,
        setPublicAppsTableData,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const usePublicApps = () => useContext(Context);
