import React from "react";
import GalleryImageContainer from "./GalleryImageContainer";

const images = [
  {
    id: "33e0bdba-e16b-48b0-adaf-d20bb4a08c77",
    product_id: "21825310-0df2-4d47-bd08-5da3eb2ce1c7",
    url: "https://i.pinimg.com/736x/8e/ca/bc/8ecabc10954b0f136b2dd5bf509d0ef6.jpg",
    description: "A simple wooden chair.",
  },
  {
    id: "33e0bdba-e16b-48b0-adaf-d20bb4a08c77",
    product_id: "21825310-0df2-4d47-bd08-5da3eb2ce1c7",
    url: "https://i.pinimg.com/736x/8e/ca/bc/8ecabc10954b0f136b2dd5bf509d0ef6.jpg",
    description: "A simple wooden chair.",
  },
  {
    id: "33e0bdba-e16b-48b0-adaf-d20bb4a08c77",
    product_id: "21825310-0df2-4d47-bd08-5da3eb2ce1c7",
    url: "https://i.pinimg.com/736x/8e/ca/bc/8ecabc10954b0f136b2dd5bf509d0ef6.jpg",
    description: "A simple wooden chair.",
  },
  {
    id: "33e0bdba-e16b-48b0-adaf-d20bb4a08c77",
    product_id: "21825310-0df2-4d47-bd08-5da3eb2ce1c7",
    url: "https://i.pinimg.com/736x/8e/ca/bc/8ecabc10954b0f136b2dd5bf509d0ef6.jpg",
    description: "A simple wooden chair.",
  },
  {
    id: "33e0bdba-e16b-48b0-adaf-d20bb4a08c77",
    product_id: "21825310-0df2-4d47-bd08-5da3eb2ce1c7",
    url: "https://i.pinimg.com/736x/8e/ca/bc/8ecabc10954b0f136b2dd5bf509d0ef6.jpg",
    description: "A simple wooden chair.",
  },
  {
    id: "33e0bdba-e16b-48b0-adaf-d20bb4a08c77",
    product_id: "21825310-0df2-4d47-bd08-5da3eb2ce1c7",
    url: "https://i.pinimg.com/736x/8e/ca/bc/8ecabc10954b0f136b2dd5bf509d0ef6.jpg",
    description: "A simple wooden chair.",
  },
  {
    id: "33e0bdba-e16b-48b0-adaf-d20bb4a08c77",
    product_id: "21825310-0df2-4d47-bd08-5da3eb2ce1c7",
    url: "https://i.pinimg.com/736x/8e/ca/bc/8ecabc10954b0f136b2dd5bf509d0ef6.jpg",
    description: "A simple wooden chair.",
  },
  {
    id: "33e0bdba-e16b-48b0-adaf-d20bb4a08c77",
    product_id: "21825310-0df2-4d47-bd08-5da3eb2ce1c7",
    url: "https://i.pinimg.com/736x/8e/ca/bc/8ecabc10954b0f136b2dd5bf509d0ef6.jpg",
    description: "A simple wooden chair.",
  },
  {
    id: "33e0bdba-e16b-48b0-adaf-d20bb4a08c77",
    product_id: "21825310-0df2-4d47-bd08-5da3eb2ce1c7",
    url: "https://i.pinimg.com/736x/8e/ca/bc/8ecabc10954b0f136b2dd5bf509d0ef6.jpg",
    description: "A simple wooden chair.",
  },
];

function AdminProductImageGallery() {
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
