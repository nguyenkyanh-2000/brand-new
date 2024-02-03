"use client";

import { useScroll } from "framer-motion";
import React, { useRef } from "react";
import InspirationWord from "./InspirationWord";

function InspirationParagraph({ paragraph }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = paragraph.split(" ");

  return (
    <p
      className="flex w-full flex-wrap items-center justify-center text-4xl leading-none"
      ref={container}
    >
      {words.map((word, index) => {
        const start = index / words.length;
        const end = start + 1 / words.length;
        return (
          <InspirationWord
            key={index}
            range={[start, end]}
            progress={scrollYProgress}
          >
            {word}
          </InspirationWord>
        );
      })}
    </p>
  );
}

export default InspirationParagraph;
