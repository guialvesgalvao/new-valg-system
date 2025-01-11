import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const interFont = Inter();

export const metadata: Metadata = {
  title: "New Valg - Devices Management",
  description: "Manage your devices with ease",
};

interface IRootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<IRootLayoutProps>) {
  return (
    <html lang="en">
      <body className={`${interFont.className}  antialiased`}>{children}</body>
    </html>
  );
}
