"use client";

import { AppPath, AppPathType } from "@/path";
import { DesktopSidebar } from "./desktop-sidebar";
import { Home, LucideIcon, MonitorSmartphone, Settings } from "lucide-react";
import { useState, useCallback } from "react";

export interface ISidebarNodeProps {
  text: string;
  href: AppPathType;
  icon: LucideIcon;
}

export function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, [setIsMenuOpen]);

  const routes: ISidebarNodeProps[] = [
    {
      href: AppPath.Dashboard,
      icon: Home,
      text: "Home Page",
    },
    {
      href: AppPath.Devices,
      icon: MonitorSmartphone,
      text: "Devices",
    },
    {
      href: AppPath.Settings,
      icon: Settings,
      text: "Settings",
    },
  ];

  return (
    <>
      <div className="h-full hidden md:flex">
        <DesktopSidebar
          routes={routes}
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
        />
      </div>

      <div className="bg-primary w-full h-14 fixed bottom-0 md:hidden"></div>
    </>
  );
}
