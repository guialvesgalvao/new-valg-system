import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import Providers from "@/components/providers";

const interFont = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"], // aqui você define o subset
  preload: false, // se quiser manter o preload
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
      <body className={`${interFont.className}  antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
