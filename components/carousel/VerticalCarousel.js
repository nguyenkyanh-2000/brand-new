"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function VerticalCarousel({ children }) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  return (
    <section className="relative h-fit">
      <div className="sticky top-0 h-full">{children}</div>
    </section>
  );
}

export default VerticalCarousel;
