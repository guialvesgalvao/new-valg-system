"use client";

import { AnimatePresence, motion } from "framer-motion";
import { OrderPath } from "./get-started-banner";
import { OrderPathComp } from "./get-started-order";

interface IRenderOrdersPathsProps {
  orders?: OrderPath[];
}

export function RenderOrdersPaths(props: Readonly<IRenderOrdersPathsProps>) {
  const { orders } = props;

  if (!orders) return null;

  return (
    <AnimatePresence>
      <motion.ol
        className="w-full h-full flex gap-x-2 list-none"
        variants={{
          visible: {
            transition: {
              delayChildren: 0.4,
              staggerChildren: 0.05,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        {orders?.map((order, index) => (
          <OrderPathComp
            key={order.name}
            name={order.name}
            order={order.order}
            active={index === 0}
          >
            {order.name}
          </OrderPathComp>
        ))}
      </motion.ol>
    </AnimatePresence>
  );
}
