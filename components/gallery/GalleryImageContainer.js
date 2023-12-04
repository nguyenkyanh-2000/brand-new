"use client";

import Image from "next/image";
import { useState } from "react";
import DeleteProductImageDialog from "../forms/productImage/DeleteProductImageDialog";

export default function GalleryImageContainer({ image }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      key={image.id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-64 overflow-hidden rounded hover:scale-110 hover:transition-all"
    >
      <Image
        src={image.url}
        alt={image.description}
        fill
        className="object-cover hover:opacity-50"
      />
      {isHovered && (
        <DeleteProductImageDialog
          productId={image.product_id}
          imageId={image.id}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      )}
    </div>
  );
}
