"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReceiptText } from "lucide-react";

interface ILogoProps {
  className?: string;
  isPulse?: boolean;
}

interface ILogoWrapperProps extends ILogoProps {
  children: React.ReactNode;
}

function LogoWrapperComp(props: Readonly<ILogoWrapperProps>) {
  const { isPulse, className, children } = props;

  if (!isPulse) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 select-none cursor-default",
          className
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.9 }}
      animate={{ opacity: [0, 1] }}
      className={cn(
        "flex items-center gap-2 select-none cursor-default",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function Logo(props: Readonly<ILogoProps>) {
  const { className, isPulse = false } = props;

  return (
    <LogoWrapperComp className={className} isPulse={isPulse}>
      <ReceiptText className="w-6 h-6 md:w-8 md:h-8" />
      <h1 className="font-bold">
        <span>Valg</span> System
      </h1>
    </LogoWrapperComp>
  );
}

export function ShortLogo(props: Readonly<ILogoProps>) {
  const { className, isPulse } = props;

  return (
    <LogoWrapperComp className={className} isPulse={isPulse}>
      <ReceiptText className="w-6 h-6 md:w-8 md:h-8" />
    </LogoWrapperComp>
  );
}
