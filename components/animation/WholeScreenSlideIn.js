import React from "react";
import { motion } from "framer-motion";

const WholeScreenSlideIn = ({ children, isOpen, from = "right" }) => {
  const variants = {
    open: {
      opacity: 1,
      x: 0,
    },
    closed: {
      opacity: 0,
      x: from === "right" ? 1000 : -1000,
    },
  };

  return (
    <motion.aside
      initial={"closed"}
      animate={isOpen ? "open" : "closed"}
      exit={"closed"}
      variants={variants}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 w-full min-h-full bg-primary z-[9999]"
    >
      {children}
    </motion.aside>
  );
};

export default WholeScreenSlideIn;
