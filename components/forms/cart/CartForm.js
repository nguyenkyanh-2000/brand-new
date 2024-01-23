"use client";

import { useCart } from "@/hooks/useCart";
import React from "react";
import CartItem from "./CartItem";
import { Button, buttonVariants } from "@/components/ui/Button";
import { ChevronDown, ChevronUp, PackageX } from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Separator } from "@/components/ui/Separator";

function CartForm() {
  const { items, addItem, removeItem } = useCart();
  const itemsCount = items.length;
  return (
    <div className="grid grid-cols-3">
      <h3 className="col-span-3 mb-5 text-xl font-semibold">Order details</h3>

      <ScrollArea className="col-span-3 mt-10  sm:max-h-[800px] ">
        <div className="flex max-h-[500px] flex-col gap-10">
          {itemsCount > 0 ? (
            items.map((item) => (
              <div
                className="flex flex-col items-center gap-2 sm:flex-row"
                key={item.id}
              >
                <CartItem
                  className={"grow"}
                  productId={item.product_id}
                  variant={item}
                  key={item.id}
                ></CartItem>
                <div className="flex flex-row sm:flex-col sm:pt-5">
                  <Button onClick={() => addItem(item)} variant="ghost">
                    <ChevronUp />
                  </Button>
                  <Button onClick={() => removeItem(item.id)} variant="ghost">
                    <ChevronDown />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-full flex-col items-center justify-center space-y-1">
              <div
                aria-hidden="true"
                className="relative mb-4 h-60 w-60 text-muted-foreground"
              >
                <PackageX className="absolute h-full w-full" />
              </div>
              <div className="text-xl font-semibold">Your cart is empty</div>

              <Link
                href="/products"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Add items to your cart to checkout
              </Link>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export default CartForm;
