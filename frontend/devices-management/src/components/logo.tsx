"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

interface ILogoProps {
  className?: string;
}

export function Logo(props: Readonly<ILogoProps>) {
  const { className } = props;

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
      <Mic className="w-6 h-6 md:w-8 md:h-8" />
      <h1 className="font-bold">
        <span>Valg</span> System
      </h1>
    </motion.div>
  );
}
