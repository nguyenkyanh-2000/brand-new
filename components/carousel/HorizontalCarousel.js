"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const HorizontalCarousel = ({ children }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  return (
    // normally: h-[300vh]
    <section ref={targetRef} className="relative h-[200vh] bg-background">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {children}
        </motion.div>
      </div>
    </section>
  );
};
