"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

function InspirationHeader() {
  return (
    <div className="flex h-[80vh] flex-col gap-10">
      <p className="mx-auto mt-[30vh] flex h-fit max-w-lg flex-col items-center gap-2 font-semibold">
        <motion.span
          className=" text-center font-serif text-4xl leading-tight sm:text-6xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, ease: "easeInOut", duration: 1 }}
        >
          {"Obtaining the simple beauty."}
        </motion.span>
        <motion.span
          className="text-center font-serif text-4xl font-semibold leading-tight sm:text-6xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, ease: "easeInOut", duration: 1 }}
        >
          {"With the power of Brand."}
        </motion.span>
      </p>
      <motion.span
        className="mx-auto w-fit animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, ease: "easeInOut", duration: 1 }}
      >
        <ChevronDown size={32} />
      </motion.span>
    </div>
  );
}

export default InspirationHeader;
