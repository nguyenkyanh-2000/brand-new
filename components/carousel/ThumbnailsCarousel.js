"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ThumbnailsCarouselThumb } from "./ThumbnailsCarouselThumb";
import Image from "next/image";

const ThumbnailsCarousel = ({ images }) => {
  const slides = images.map((image, index) => index);
  const options = {};
  const imageByIndex = (index) => images[index % images.length];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="p-7 h-full">
      <div className="overflow-hidden" ref={emblaMainRef}>
        <div className="flex touch-pan-y ml-[calc(var(--slide-spacing) * -1)">
          {slides.map((index) => (
            <div
              className="relative min-w-0 pl-[var(--slide-spacing)] flex-[0_0_var(--slide-size)]"
              key={index}
            >
              <div className="block w-full h-[var(--slide-height)]">
                <Image
                  src={imageByIndex(index).url}
                  alt={imageByIndex(index).description}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[var(--thumbs-slide-spacing)]">
        <div className="overflow-hidden" ref={emblaThumbsRef}>
          <div className="flex flex-row ml-[calc(var(--thumbs-slide-spacing) * -1)]">
            {slides.map((index) => (
              <ThumbnailsCarouselThumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                imgSrc={imageByIndex(index).url}
                imgAlt={imageByIndex(index).description}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailsCarousel;
