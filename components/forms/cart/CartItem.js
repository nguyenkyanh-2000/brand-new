import useQueryProduct from "@/hooks/useQueryProduct";
import Image from "next/image";
import React from "react";

function CartItem({ productId, variant }) {
  const {
    data: { product },
  } = useQueryProduct(productId);

  return (
    <div className="flex items-center gap-5">
      <Image
        src={product.product_image[0].url}
        alt={product.product_image[0].description}
        className="h-auto w-auto"
        width={80}
        height={80}
      ></Image>
      <div className="flex grow flex-col justify-between py-5">
        <h4 className="text-xl font-bold">{product.name}</h4>
        <div className="flex w-full justify-between">
          <div className="flex flex-col ">
            <div className="flex gap-1">
              <p className="text-sm capitalize text-muted-foreground">
                Category:
              </p>
              <p className="text-sm font-semibold capitalize">
                {product.category}
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
              {product.price !== variant.price && (
                <span className="text-sm font-semibold text-destructive line-through ">
                  {product.price}$
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
