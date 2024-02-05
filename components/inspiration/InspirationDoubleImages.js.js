"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useHover } from "@/hooks/useHover";

function InspirationDoubleImages({ image1, image2 }) {
  const image1Ref = useRef();
  const image2Ref = useRef();
  const isImage1Hovered = useHover(image1Ref);
  const isImage2Hovered = useHover(image2Ref);
  const oneInTwoHovered = isImage1Hovered || isImage2Hovered;
  const scaleLeftWidth = oneInTwoHovered
    ? isImage1Hovered
      ? "66.6%"
      : "33.3%"
    : "100%";
  const scaleRightWidth = oneInTwoHovered
    ? isImage2Hovered
      ? "66.6%"
      : "33.3%"
    : "100%";
  const scaleLeftHeight = oneInTwoHovered
    ? isImage1Hovered
      ? "110%"
      : "70%"
    : "100%";
  const scaleRightHeight = oneInTwoHovered
    ? isImage2Hovered
      ? "110%"
      : "70%"
    : "100%";

  return (
    <div className="flex h-[300px] w-full sm:h-[500px]">
      <motion.div
        ref={image1Ref}
        animate={{ width: scaleLeftWidth, height: scaleLeftHeight }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="h-full w-full"
      >
        <Image
          src={image1}
          alt="inspiration image grid"
          className="h-full w-full"
          sizes="(min-width: 1200px) 500px, (min-width: 768px) 50vw, 100vw"
        />
      </motion.div>

      <motion.div
        ref={image2Ref}
        animate={{ width: scaleRightWidth, height: scaleRightHeight }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="h-full w-full"
      >
        <Image
          src={image2}
          alt="inspiration image grid"
          className="h-full w-full"
          sizes="(min-width: 1200px) 500px, (min-width: 768px) 50vw, 100vw"
        />
      </motion.div>
    </div>
  );
}

export default InspirationDoubleImages;
