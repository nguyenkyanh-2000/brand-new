"use client";

import { cn } from "@/utils/tailwind-utils";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

export const OnViewSlideIn = ({
  children,
  x1 = 0,
  x2 = 0,
  y1 = 0,
  y2 = 0,
  duration = 2,
  delay = 0.5,
  className,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const variants = {
    hidden: {
      opacity: 0,
      x: x1,
      y: y1,
      ease: [0.6, 0.01, -0.05, 0.95],
    },
    visible: {
      opacity: 1,
      x: x2,
      y: y2,
      ease: [0.6, 0.01, -0.05, 0.95],
    },
  };

  return (
    <div ref={ref} className={cn(`relative overflow-hidden`, className)}>
      <motion.div
        className="w-full"
        variants={variants}
        initial="hidden"
        animate={mainControls}
        transition={{ duration, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};
