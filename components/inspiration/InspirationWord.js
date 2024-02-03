"use client";

import { useTransform } from "framer-motion";
import React from "react";
import { motion } from "framer-motion";

function InspirationWord({ children, range, progress }) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mr-[12px] mt-[12px]">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

export default InspirationWord;
