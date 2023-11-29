"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const AnimatedUnderline = ({
  children,
  direction = "left",
  duration = 0.25,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground"
        // Animated from left to right or right to left based on the direction prop
        initial={direction === "left" ? { width: 0 } : { width: "100%" }}
        animate={{ width: isHovered ? (direction === "left" ? "100%" : 0) : 0 }}
        transition={{ duration: duration, ease: "easeInOut" }}
      />
    </div>
  );
};

export default AnimatedUnderline;
