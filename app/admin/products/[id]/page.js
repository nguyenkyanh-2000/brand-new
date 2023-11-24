import ThumbnailsCarousel from "@/components/carousel/ThumbnailsCarousel";
import ProductForm from "@/components/forms/product/ProductForm";
import Image from "next/image";
import React from "react";
import notFoundImage from "@/public/Image_not_available.png";

const API_URL = process.env.NEXT_PUBLIC_LOCATION_API;

async function getProductById(id) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    next: { revalidate: 0 },
  });
  const result = await res.json();
  return result;
}

async function Page({ params }) {
  const productId = params.id;
  const result = await getProductById(productId);

  if (result.error) throw new Error(result.error.message);

  const { product } = result.data;

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
          <h3 className="text-xl sm:text-3xl font-bold"> Product variants</h3>
        </div>
        <div className="col-span-12 bg-background rounded p-5 sm:p-10">
          {product.product_image.length ? (
            <ThumbnailsCarousel images={product.product_image} />
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
