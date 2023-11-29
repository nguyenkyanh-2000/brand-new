"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/tailwind-utils";

const SlideIn = ({
  children,
  x1 = 0,
  x2 = 0,
  y1 = 0,
  y2 = 0,
  duration = 1,
  className,
}) => {
  const getInitialPosition = () => ({ x: x1, y: y1 });

  const getFinalPosition = () => ({ x: x2, y: y2 });

  const animationVariants = {
    initial: {
      opacity: 0,
      ...getInitialPosition(),
      ease: [0.6, 0.01, -0.05, 0.95],
    },
    animate: {
      opacity: 1,
      ...getFinalPosition(),
      ease: [0.6, 0.01, -0.05, 0.95],
    },
  };

  return (
    <div className={cn("overflow-hidden w-full", className)}>
      <motion.div
        className={"w-full h-full"}
        variants={animationVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: duration }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SlideIn;
