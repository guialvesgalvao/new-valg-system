"use client";

import { useState, useEffect } from "react";
import { ThemeProvider } from "./providers/theme-provider";

interface IProvidersProps {
  children: React.ReactNode;
}

export default function Providers(props: Readonly<IProvidersProps>) {
  const { children } = props;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
