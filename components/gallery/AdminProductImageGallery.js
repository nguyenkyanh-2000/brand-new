import React from "react";
import GalleryImageContainer from "./GalleryImageContainer";

function AdminProductImageGallery({ images }) {
  return (
    <section className="grid gap-5 py-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {images.map((image) => (
        <GalleryImageContainer
          key={image.id}
          image={image}
        ></GalleryImageContainer>
      ))}
    </section>
  );
}

export default AdminProductImageGallery;
