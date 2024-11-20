"use client";

import { ReactNode, createContext, useContext, useState } from "react";

type ContextType = {};

const Context = createContext<ContextType>({} as ContextType);

export function PolicyProvider({ children }: { children: ReactNode }) {
  const [, __] = useState<any>(1);

  return <Context.Provider value={{}}>{children}</Context.Provider>;
}

export const usePolicy = () => useContext(Context);
