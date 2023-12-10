import ThumbnailsCarousel from "@/components/carousel/ThumbnailsCarousel";
import VariantInformation from "@/components/forms/productVariant/VariantInformation";
import { Badge } from "@/components/ui/Badge";
import useFetchProduct from "@/hooks/useFetchProduct";
import getQueryClient from "@/utils/getQueryClient";
import { Check } from "lucide-react";
import React from "react";

const API_URL = process.env.NEXT_PUBLIC_LOCATION_API;

export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.id;
  const {
    data: { product },
  } = await fetch(`${API_URL}/products/${id}`).then((res) => res.json());
  return {
    title: `${product.name} | Brand`,
    description: product.description,
  };
}

async function ProductPage({ params }) {
  const productId = params.id;
  const result = await useFetchProduct(productId);
  if (result.error) throw new Error(result.error.message);

  const { product } = result;
  return (
    <div className="grid w-full grid-cols-12 gap-5 px-10 md:mt-[200px]">
      <div className="col-span-12 md:col-span-8">
        <ThumbnailsCarousel images={product.product_image}></ThumbnailsCarousel>
      </div>
      <div className="col-span-12 flex flex-col gap-1 md:col-span-4">
        <h3 className="text-center font-serif text-4xl font-bold md:text-left">
          {product.name}
        </h3>
        <div className="mt-2 flex justify-center gap-2 md:justify-start">
          {product.keywords &&
            product.keywords.map((keyword) => (
              <Badge
                className={
                  "w-fit bg-muted text-muted-foreground hover:bg-muted/50"
                }
                key={keyword}
              >
                {keyword}
              </Badge>
            ))}
        </div>
        {/**Variant information */}
        <div className="flex grow items-end">
          <VariantInformation productVariants={product.product_variant} />
        </div>

        <div className="flex flex-col">
          <h4 className="mt-5 font-semibold text-muted-foreground">
            Product description
          </h4>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
