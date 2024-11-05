"use client";

import { ReactNode, createContext, useContext, useState } from "react";

type ContextType = {
  emailOrUsername: string;
  setEmailOrUsername: (emailOrUsername: string) => void;
};

const Context = createContext<ContextType>({
  emailOrUsername: "",
  setEmailOrUsername: () => {},
} as ContextType);

export function UserProvider({ children }: { children: ReactNode }) {
  const [emailOrUsername, setEmailOrUsername] = useState<string>("kubokidev");

  return (
    <Context.Provider value={{ emailOrUsername, setEmailOrUsername }}>
      {children}
    </Context.Provider>
  );
}

export const useEmailOrUsername = () => useContext(Context);
