import { Skeleton } from "@/components/ui/Skeleton";
import useQueryProductVariant from "@/hooks/useQueryProductVariant";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

function OrderItem({ item }) {
  const { data, isPending } = useQueryProductVariant(item.variant_id);

  if (isPending)
    return (
      <div className="mb-5 flex h-[100px] items-center space-x-4">
        <Skeleton className="h-12 w-12" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );

  const { product_variant } = data;
  return (
    <div className="my-4 flex h-[100px] justify-between py-4">
      <div className="flex flex-col gap-5">
        <div>
          <div>
            <span className="font-bold">Product name: </span>
            {product_variant.product.name}
          </div>
          <div>
            <span className="font-bold">Variant: </span>
            {product_variant.name}
          </div>
          <div className="flex gap-1">
            <span className="font-bold">Price: </span>
            {item.original_price !== item.price ? (
              <div>
                {item.price}{" "}
                <span className="text-red-500 line-through">
                  {item.original_price}
                </span>
              </div>
            ) : (
              item.original_price
            )}
          </div>
          <div>
            <span className="font-bold">Quantity: </span>
            {item.quantity}
          </div>
        </div>
      </div>
      <Link
        className="flex gap-1 font-bold"
        href={`/products/${product_variant.product_id}`}
      >
        Go to product
        <ArrowRight />
      </Link>
    </div>
  );
}

export default OrderItem;
