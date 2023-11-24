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
    }
  );
  return (
    <div className="relative flex-[0_0_28%] min-w-0 pl-[var(--thumbs-slide-spacing)]">
      <button onClick={onClick} className={buttonClasses} type="button">
        <div className="block w-full h-[var(--thumbs-slide-height)]">
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            className="object-cover"
          ></Image>
        </div>
      </button>
    </div>
  );
};

/* */
