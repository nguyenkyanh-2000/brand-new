import ThumbnailsCarousel from "@/components/carousel/ThumbnailsCarousel";
import ProductForm from "@/components/forms/product/ProductForm";
import Image from "next/image";
import React, { Suspense } from "react";
import notFoundImage from "@/public/Image_not_available.png";
import Loading from "./loading";

const API_URL = process.env.NEXT_PUBLIC_LOCATION_API;

async function getProductById(id) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    next: { revalidate: 0 },
  });
  const result = await res.json();
  return result;
}

async function getProductImages(id) {
  const res = await fetch(`${API_URL}/products/${id}/images`, {
    next: { revalidate: 0 },
  });
  const result = await res.json();
  return result;
}

async function Page({ params }) {
  const productId = params.id;
  const [productResult, productImagesResult] = await Promise.all([
    getProductById(productId),
    getProductImages(productId),
  ]);

  if (productResult.error) throw new Error(productResult.error.message);

  if (productImagesResult.error)
    throw new Error(productImagesResult.error.message);

  const { product } = productResult.data;
  const { product_images } = productImagesResult.data;

  return (
    <div className="w-full mt-10">
      <h2 className="font-serif text-3xl sm:text-5xl text-center mb-10">
        Edit product
      </h2>
      <div className="flex flex-col lg:grid grid-cols-12 p-10 gap-10 bg-muted">
        <div className="col-span-7 bg-background rounded p-5 sm:p-10 flex flex-col gap-10">
          <h3 className="text-xl sm:text-3xl font-bold"> Basic information</h3>
          <ProductForm defaultProduct={product} />
        </div>
        <div className="col-span-5 bg-background rounded p-5 sm:p-10 flex flex-col gap-10">
          <h3 className="text-xl sm:text-3xl font-bold"> Product images</h3>
          {product_images.length ? (
            <ThumbnailsCarousel images={product_images} />
          ) : (
            <Image
              src={notFoundImage}
              className="w-full object-cover"
              alt="No image"
            ></Image>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
