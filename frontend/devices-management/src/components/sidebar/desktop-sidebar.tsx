"use client";

import Link from "next/link";
import { Logo, ShortLogo } from "../logo";
import { AppPath } from "@/path";

import { ISidebarNodeProps } from "./sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/app/(auth)/auth/_components/theme-toogle";
import { Button } from "../ui/button";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";

interface IDesktopSidebarProps {
  routes: ISidebarNodeProps[];

  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export function DesktopSidebar(props: Readonly<IDesktopSidebarProps>) {
  const { routes, isMenuOpen, toggleMenu } = props;
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "bg-accent h-full flex flex-col gap-y-8 rounded-r-3xl border-r border-border",
        isMenuOpen ? "w-[300px]" : "w-[88px]"
      )}
    >
      <div
        className={cn(
          "w-full flex text-primary py-10",
          isMenuOpen
            ? "justify-start items-center pl-6"
            : "items-center justify-center"
        )}
      >
        <Link className="cursor-pointer" href={AppPath.Dashboard}>
          {isMenuOpen ? (
            <Logo className="text-muted-foreground" />
          ) : (
            <ShortLogo className="text-muted-foreground" />
          )}
        </Link>
      </div>

      <div className="w-full flex flex-col items-center justify-center gap-y-3">
        {routes.map((route, index) => (
          <NodeButton
            key={index}
            currentPath={pathname}
            isMenuOpen={isMenuOpen}
            {...route}
          />
        ))}
      </div>

      <div className="w-full flex flex-col mt-auto pb-8">
        <div className="w-full flex items-center justify-center">
          <Button
            variant="ghost"
            className={cn(
              "h-14 p-2 text-primary",
              isMenuOpen ? "w-full pl-6" : "w-14"
            )}
            onClick={toggleMenu}
          >
            {!isMenuOpen ? (
              <ArrowBigRightDash size={24} />
            ) : (
              <div className="w-full flex items-center justify-start gap-x-4">
                <ArrowBigLeftDash size={24} />
                <span>Close</span>
              </div>
            )}
          </Button>
        </div>

        <div className="w-full flex items-center justify-center">
          <ModeToggle className="text-primary" />
        </div>
      </div>
    </aside>
  );
}

interface INodeButtonProps extends ISidebarNodeProps {
  currentPath: string;
  isMenuOpen: boolean;
}

function NodeButton(props: Readonly<INodeButtonProps>) {
  const { text, href, icon: Icon, currentPath, isMenuOpen } = props;

  return (
    <div
      className={cn(
        "w-full flex items-center justify-center",
        isMenuOpen ? "pr-6" : ""
      )}
    >
      <Link
        className={cn(
          "flex p-3",
          isMenuOpen
            ? "w-full border-l-4 justify-start rounded-r-lg pl-5"
            : "w-14 rounded-lg items-center justify-center",
          currentPath === href
            ? "bg-muted-foreground text-muted border-primary"
            : "text-muted-foreground hover:text-primary border-accent"
        )}
        href={href}
      >
        <Icon className="w-6 h-6" />
        {isMenuOpen && (
          <span className="ml-3 text-base font-medium">{text}</span>
        )}
      </Link>
    </div>
  );
}
