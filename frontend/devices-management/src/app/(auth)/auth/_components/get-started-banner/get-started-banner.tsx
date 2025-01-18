"use client";

import { Logo } from "@/components/logo";
import { RenderOrdersPaths } from "./get-started-render";
import { useMemo } from "react";
import {
  AuthNoiseBottomVector,
  AuthNoiseTopVector,
} from "@/components/icons/auth-noise-vector";
import { ModeToggle } from "../theme-toogle";
import { motion } from "framer-motion";

export interface OrderPath {
  name: string;
  order: number;
}

interface IGetStartedBannerProps {
  title: string;
  subtitle: string;

  orders: OrderPath[];
}

export function GetStartedBanner(props: Readonly<IGetStartedBannerProps>) {
  const { title, subtitle, orders } = props;

  const sortedOrders = useMemo(
    () => orders?.sort((a, b) => a.order - b.order),
    [orders]
  );

  return (
    <section
      className="max-w-[700px]
      bg-[linear-gradient(to_right_bottom,#10412f,#0f3728,#0d2d21,#0b241a,#071b13)]
      dark:bg-[linear-gradient(to_right_bottom,#10412f,#0f3728,#0d2d21,#0b241a,#071b13)]
      w-full h-96 md:h-full flex flex-col items-start justify-between rounded-3xl shadow-lg p-10 relative overflow-hidden"
    >
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between items-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full flex items-start justify-start text-primary-foreground dark:text-primary"
          >
            <Logo isPulse />
          </motion.div>

          <ModeToggle />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted dark:text-primary text-xl font-medium"
        >
          Devices Management
        </motion.h2>
      </div>

      <div className="w-full flex flex-col gap-y-10 z-10">
        <div className="w-full flex flex-col items-start justify-start gap-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary-foreground dark:text-primary text-[32px] font-semibold"
          >
            {title}
          </motion.h1>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-primary-foreground dark:text-accent-foreground text-base font-normal"
          >
            {subtitle}
          </motion.h3>
        </div>

        <RenderOrdersPaths orders={sortedOrders} />
      </div>

      <div className="w-full h-full absolute top-0 left-0 z-0">
        <AuthNoiseTopVector />
      </div>

      <div className="w-full h-full absolute bottom-0 left-0 z-0">
        <AuthNoiseBottomVector />
      </div>
    </section>
  );
}
