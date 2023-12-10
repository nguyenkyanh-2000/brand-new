"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import useQueryProduct from "@/hooks/useQueryProduct";
import { toast } from "@/hooks/useToast";

function VariantInformation({ productVariants }) {
  const {} = useQueryProduct(productVariants[0].product_id);
  const [selectedVariant, setSelectedVariant] = useState(productVariants[0]);
  const { addItem } = useCart();

  return (
    <div className="mt-10 flex w-full flex-col gap-5">
      <div className="flex items-center justify-between gap-1">
        <div className="flex gap-2">
          <div className="text-muted-foreground">Variant name:</div>
          <div className="font-bold">{selectedVariant.name}</div>
        </div>
        <div className="flex gap-2">
          <div className="text-muted-foreground">Price at:</div>
          <div className="font-bold">{selectedVariant.price} USD</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {productVariants.map((variant) => (
          <div
            key={variant.id}
            className={clsx(
              "flex h-fit w-fit items-center justify-center border-foreground bg-muted",
              {
                "border-2": variant.id === selectedVariant.id,
              },
            )}
          >
            <button
              className="h-8 w-8 rounded-full"
              style={{ backgroundColor: variant.color }}
              onClick={() => setSelectedVariant(variant)}
            ></button>
          </div>
        ))}
      </div>
      <Button
        variant="default"
        className="hover:bg-foreground/50"
        onClick={() => {
          addItem(selectedVariant);
          toast({
            title: `Add successfully.`,
            description: "Add product to cart successfully!",
          });
        }}
      >
        Add to the shopping cart
      </Button>
    </div>
  );
}

export default VariantInformation;
