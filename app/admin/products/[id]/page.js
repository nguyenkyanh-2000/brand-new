import ProductForm from "@/components/forms/product/ProductForm";
import React from "react";
import { AddProductVariantDialog } from "@/components/forms/productVariant/AddProductVariantForm";
import ProductVariantCard from "@/components/forms/productVariant/ProductVariantCard";
import { ScrollArea } from "@/components/ui/ScrollArea";
import useFetchProduct from "@/hooks/useFetchProduct";
import AdminProductImageGallery from "@/components/gallery/AdminProductImageGallery";
import { AddProductImageDialog } from "@/components/forms/productImage/AddProductImageDialog.js";
import getQueryClient from "@/utils/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

async function Page({ params }) {
  const queryClient = getQueryClient();

  const productId = params.id;
  const result = await useFetchProduct(productId);
  if (result.error) throw new Error(result.error.message);
  const { product } = result;
  const productVariants = product.product_variant;
  const productImages = product.product_image;
  const dehyratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehyratedState}>
      <div className="mt-10 w-full">
        <h2 className="mb-10 text-center font-serif text-3xl sm:text-5xl">
          Edit product
        </h2>
        <div className="flex grid-cols-12 flex-col gap-10 bg-muted p-10 lg:grid">
          <div className="col-span-7 flex flex-col gap-10 rounded bg-background p-5 sm:p-10">
            <h3 className="text-xl font-bold sm:text-3xl">
              {" "}
              Basic information
            </h3>
            <ProductForm productId={productId} />
          </div>
          <div className="col-span-5 flex flex-col gap-10 rounded bg-background p-5 sm:p-10">
            <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
              <h3 className="inline-block text-xl font-bold sm:text-3xl">
                Product variants
              </h3>
              <AddProductVariantDialog productId={productId} />
            </div>
            {productVariants.length ? (
              <ScrollArea className="h-[480px] w-full rounded-md">
                <div className="flex flex-col gap-2">
                  {productVariants
                    .slice(0)
                    .reverse()
                    .map((productVariant) => (
                      <ProductVariantCard
                        productVariant={productVariant}
                        key={productVariant.id}
                      />
                    ))}
                </div>
              </ScrollArea>
            ) : (
              <p>No variants found. Please add one.</p>
            )}
          </div>
          <div className="col-span-12 rounded bg-background p-5 sm:p-10">
            <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
              <h3 className="inline-block text-xl font-bold sm:text-3xl">
                Product images
              </h3>
              <AddProductImageDialog productId={productId} />
            </div>
            <AdminProductImageGallery images={productImages} />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}

export default Page;
