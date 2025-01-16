import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";

import "./globals.css";
import Providers from "@/components/providers";

const publicSansFont = Public_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"], // aqui você define 
});

export const metadata: Metadata = {
  title: "Valg - Devices Management",
  description: "Manage your devices with ease",
};

interface IRootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<IRootLayoutProps>) {
  return (
    <html lang="en">
      <body className={`${publicSansFont.className}  antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
