import React from "react";
import GalleryImageContainer from "./GalleryImageContainer";
import Image from "next/image";
import notFoundImage from "@/public/not-found-image.webp";

function AdminProductImageGallery({ images }) {
  return (
    <section className="grid grid-cols-1 gap-5 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {images.length ? (
        images.map((image) => (
          <GalleryImageContainer
            key={image.id}
            image={image}
          ></GalleryImageContainer>
        ))
      ) : (
        <div className="col-span-4 flex justify-center">
          <Image
            src={notFoundImage}
            className="object-cover"
            alt="Not found image"
          ></Image>
        </div>
      )}
    </section>
  );
}

export default AdminProductImageGallery;
