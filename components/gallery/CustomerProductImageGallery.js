import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/HoverCard";
import notFoundImage from "@/public/not-found-image.webp";

function CustomerProductImageGallery({ products }) {
  return (
    <div className="grid h-full w-full grid-cols-6 ">
      {products.map((product) => {
        const smallestPrice =
          product.product_variant.length === 0
            ? product.price
            : Math.min(
                ...product.product_variant.map((variant) => variant.price),
              );
        return (
          <div
            key={product.id}
            className="relative col-span-6 flex h-[500px] flex-col justify-between rounded-md p-10 hover:border-2 lg:col-span-2"
          >
            <HoverCard>
              <HoverCardTrigger>
                <ShoppingCart className="absolute right-10 top-10 z-10 stroke-1 text-muted-foreground" />
              </HoverCardTrigger>
              <HoverCardContent
                align={"end"}
                side={"top"}
                className="w-fit bg-foreground px-2 py-1 text-background"
              >
                Add to cart
              </HoverCardContent>
            </HoverCard>

            <div className="relative h-[300px]">
              {product.product_image[0]?.url ? (
                <Image
                  src={product.product_image[0]?.url}
                  alt={product.product_image[0]?.description}
                  fill
                  className="object-contain p-5"
                ></Image>
              ) : (
                <Image
                  src={notFoundImage}
                  alt="Not found"
                  fill
                  className="object-contain p-5"
                ></Image>
              )}
            </div>
            {product.badge && (
              <div className="flex justify-center capitalize">
                <p className="w-fit rounded-md border px-2 py-1 text-muted-foreground">
                  {product.badge}
                </p>
              </div>
            )}
            <Link
              href={`products/${product.id}`}
              className="flex flex-col items-center"
            >
              <h4 className="font-bold">{product.name}</h4>
              <div className="flex gap-2">
                <p className="text-muted-foreground">Original price at</p>
                <p>{`${product.price}$`}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-muted-foreground">Price starts from</p>
                <p className="text-destructive">{`${smallestPrice}$`}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default CustomerProductImageGallery;
