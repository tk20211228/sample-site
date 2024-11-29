"use client";

import { androidmanagement_v1 } from "googleapis";
import { ReactNode, createContext, useContext, useState } from "react";

type AppInfo = androidmanagement_v1.Schema$Application;

type ContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  appInfo: AppInfo | null;
  setAppInfo: (appInfo: AppInfo | null) => void;
};

const Context = createContext<ContextType>({
  isOpen: false,
  setIsOpen: () => {},
  appInfo: null,
  setAppInfo: () => {},
} as ContextType);

export function AppsInfoSheetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);

  return (
    <Context.Provider
      value={{
        isOpen,
        setIsOpen,
        appInfo,
        setAppInfo,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useAppsInfoSheet = () => useContext(Context);
