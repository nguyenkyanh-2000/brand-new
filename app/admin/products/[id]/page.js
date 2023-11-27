import ProductForm from "@/components/forms/product/ProductForm";
import Image from "next/image";
import React from "react";
import notFoundImage from "@/public/Image_not_available.png";
import { AddProductVariantDialog } from "@/components/forms/productVariant/AddProductVariantForm";
import ProductVariantCard from "@/components/forms/productVariant/ProductVariantCard";
import { ScrollArea } from "@/components/ui/ScrollArea";
import useGetProduct from "@/hooks/useGetProductById";
import AdminProductImageGallery from "@/components/gallery/AdminProductImageGallery";
import { AddProductImageDialog } from "@/components/forms/productImage/AddProductImageDialog.js";

async function Page({ params }) {
  const productId = params.id;
  const { data, error } = await useGetProduct(productId);

  if (error) throw new Error(result.error.message);

  const { product } = data;
  const productVariants = product.product_variant;
  const productImages = product.product_image;

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
          <div className="flex flex-col gap-5 sm:flex-row justify-between items-center">
            <h3 className="inline-block text-xl sm:text-3xl font-bold">
              Product variants
            </h3>
            <AddProductVariantDialog productId={product.id} />
          </div>
          {productVariants.length ? (
            <ScrollArea className="h-[480px] w-full rounded-md">
              <div className="flex flex-col gap-2">
                {productVariants
                  .slice(0)
                  .reverse()
                  .map((productVariant, index) => (
                    <ProductVariantCard
                      productVariant={productVariant}
                      key={index}
                    />
                  ))}
              </div>
            </ScrollArea>
          ) : (
            <p>No variants found. Please add one.</p>
          )}
        </div>
        <div className="col-span-12 bg-background rounded p-5 sm:p-10">
          <div className="flex flex-col gap-5 sm:flex-row justify-between items-center">
            <h3 className="inline-block text-xl sm:text-3xl font-bold">
              Product images
            </h3>
            <AddProductImageDialog />
          </div>
          {productImages.length ? (
            <AdminProductImageGallery images={productImages} />
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
