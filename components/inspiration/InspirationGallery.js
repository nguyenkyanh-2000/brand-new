"use client";

import Picture1 from "@/public/inspiration-gallery-1.webp";
import Picture2 from "@/public/inspiration-gallery-2.webp";
import Picture3 from "@/public/inspiration-gallery-3.webp";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

import React, { useRef } from "react";

function InspirationGallery() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const sm = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const md = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const lg = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const images = [
    { src: Picture1, y: sm },
    {
      src: Picture2,
      y: lg,
    },
    { src: Picture3, y: md },
  ];

  return (
    <div
      ref={container}
      className="relative mt-20 flex h-[500px] w-full justify-center px-10"
    >
      {images.map(({ src, y }, i) => (
        <motion.div
          style={{ y }}
          key={`i_${i}`}
          className={`absolute ${
            i === 0
              ? "z-10 h-[300px] w-[200px]  md:h-[60vh] md:w-[50vh]"
              : i === 1
                ? "left-[10vw] top-[250px] z-20 h-[150px] w-[100px] md:left-[55vw] md:top-[15vh] md:h-[40vh] md:w-[30vh]"
                : "left-[60vw] top-[0px] z-30 h-[150px] w-[100px] md:left-[27.5vw] md:top-[40vh] md:h-[25vh] md:w-[20vh]"
          }`}
        >
          <Image
            src={src}
            placeholder="blur"
            alt="image"
            className="h-full w-full object-cover object-center"
            priority
            sizes="(min-width: 1200px) 500px, (min-width: 768px) 50vw, 100vw"
          />
        </motion.div>
      ))}
    </div>
  );
}

export default InspirationGallery;
