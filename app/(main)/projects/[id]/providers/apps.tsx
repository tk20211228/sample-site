"use client";

import { PublicAppsTableType } from "@/app/(main)/types/apps";
import { ReactNode, createContext, useContext, useState } from "react";

type ContextType = {
  publicApps: PublicAppsTableType[];
  setPublicApps: (apps: PublicAppsTableType[]) => void;
};

const Context = createContext<ContextType>({
  publicApps: [],
  setPublicApps: () => {},
} as ContextType);

export function AppsProvider({ children }: { children: ReactNode }) {
  const [publicApps, setPublicApps] = useState<PublicAppsTableType[]>([]);

  return (
    <Context.Provider value={{ publicApps, setPublicApps }}>
      {children}
    </Context.Provider>
  );
}

export const useApps = () => useContext(Context);
