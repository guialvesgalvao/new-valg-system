"use client";

import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./query-client";

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
