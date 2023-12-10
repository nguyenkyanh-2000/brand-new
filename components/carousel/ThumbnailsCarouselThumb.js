import Image from "next/image";
import React from "react";
import clsx from "clsx";

export const ThumbnailsCarouselThumb = (props) => {
  const { imgAlt, selected, imgSrc, onClick } = props;

  const buttonClasses = clsx(
    "w-full block appearance-none bg-transparent touch-manipulation cursor-pointer border-0 p-0 m-0 transition-opacity duration-200",
    {
      "opacity-20": !selected,
      "opacity-100": selected,
    },
  );
  return (
    <div className="relative min-w-0 flex-[0_0_28%] pl-[var(--thumbs-slide-spacing)]">
      <button onClick={onClick} className={buttonClasses} type="button">
        <div className="relative block h-[var(--thumbs-slide-height)] w-full border-2">
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            className="absolute object-cover"
            sizes="(min-width: 1200px) 500px, (min-width: 768px) 50vw, 100vw"
          ></Image>
        </div>
      </button>
    </div>
  );
};
