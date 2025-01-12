"use client";

import { Logo } from "@/components/logo";
import { RenderOrdersPaths } from "./get-started-render";
import { useMemo } from "react";
import {
  AuthNoiseBottomVector,
  AuthNoiseTopVector,
} from "@/components/icons/auth-noise-vector";
import { ModeToggle } from "../theme-toogle";

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
      <div className="w-full flex justify-between items-center z-10">
        <div className="w-full flex items-start justify-start text-primary-foreground dark:text-primary">
          <Logo />
        </div>

        <ModeToggle />
      </div>

      <div className="w-full flex flex-col gap-y-10 z-10">
        <div className="w-full flex flex-col items-start justify-start gap-y-2">
          <h1 className="text-primary-foreground dark:text-primary text-[32px] font-semibold">
            {title}
          </h1>
          <h3 className="text-primary-foreground dark:text-accent-foreground text-base font-normal">
            {subtitle}
          </h3>
        </div>

        <div className="w-full">
          <RenderOrdersPaths orders={sortedOrders} />
        </div>
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
