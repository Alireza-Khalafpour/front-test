"use client";

import { createContext, ReactNode, useContext, useRef, useState } from "react";

interface appContextInterface {
  token: string | null;
  setToken: (token: string) => void;
}

const appContext = createContext<appContextInterface | null>(null);

export function AppWrapper({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const tokenReference = useRef<string | null>(null);
  const updateToken = (newToken: string) => {
    setToken(newToken);
    tokenReference.current = newToken;
  };

  return (
    <appContext.Provider
      value={{ token: tokenReference.current, setToken: updateToken }}
    >
      {children}
    </appContext.Provider>
  );
}

export function useAppContext() {
  return useContext(appContext);
}
