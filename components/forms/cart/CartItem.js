"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import useQueryProduct from "@/hooks/useQueryProduct";
import { cn } from "@/utils/tailwind-utils";
import Image from "next/image";
import React from "react";

function CartItem({ productId, variant, className }) {
  const { isPending, data } = useQueryProduct(productId);

  if (isPending)
    return (
      <div className="mb-5 flex items-center space-x-4">
        <Skeleton className="h-12 w-12" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );

  return (
    <div
      className={cn(
        "flex h-[150px] flex-col items-center gap-5 md:flex-row",
        className,
      )}
    >
      <Image
        src={data.product?.product_image[0].url}
        alt={data.product.product_image[0].description}
        width={80}
        height={80}
      ></Image>
      <div className="flex w-full grow flex-col justify-between py-5">
        <h4 className="text-xl font-bold">{data.product?.name}</h4>
        <div className="flex w-full justify-between">
          <div className="flex flex-col ">
            <div className="flex gap-1">
              <p className="text-sm capitalize text-muted-foreground">
                Category:
              </p>
              <p className="text-sm font-semibold capitalize">
                {data.product?.category}
              </p>
            </div>
            <div className="flex gap-1">
              <p className="text-sm capitalize text-muted-foreground">
                Variant:
              </p>
              <p className="text-sm font-semibold capitalize">{variant.name}</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-1">
              <p className="text-sm capitalize text-muted-foreground">
                Price:{" "}
              </p>
              {data.product?.price !== variant.price && (
                <span className="text-sm font-semibold text-destructive line-through ">
                  {data.product.price}$
                </span>
              )}
              <p className="text-sm font-semibold"> {variant.price}$</p>
            </div>
            <div className="flex gap-1">
              <p className="text-sm capitalize text-muted-foreground">
                Quantity:{" "}
              </p>
              <p className="text-sm font-bold"> {variant.quantity}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
