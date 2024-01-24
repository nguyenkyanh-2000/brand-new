"use client";

import { Separator } from "@/components/ui/Separator";
import React from "react";
import { useCart } from "@/hooks/useCart";
import { roundPrice } from "@/utils/formatPrice";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

function CartSummary() {
  const { items } = useCart();

  const subtotal = items.reduce((acc, item) => {
    return acc + item.original_price * item.quantity;
  }, 0);

  const discount =
    items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0) - subtotal;

  const shipping = 0;

  const total = subtotal + discount + shipping;

  return (
    <div className="flex flex-col gap-3 ">
      <h3 className="col-span-3 mb-5 text-xl font-semibold">Order summary</h3>
      <div className="flex justify-between">
        <p>Subtotal:</p>
        <p>{roundPrice(subtotal)}$</p>
      </div>
      <div className="flex justify-between">
        <p>Discount:</p>
        <p>{roundPrice(discount)}$</p>
      </div>
      <div className="flex justify-between">
        <p>Shipping:</p>
        <p>{shipping === 0 ? "Free" : `${shipping}$`}</p>
      </div>
      <Separator />
      <div className="flex justify-between">
        <p className="font-semibold">Total:</p>
        <p className="font-semibold">{roundPrice(total)}$</p>
      </div>

      <Link href={"/checkout"}>
        <Button
          disabled={items.length > 0 ? false : true}
          className="mt-5 w-full"
        >
          Checkout now
        </Button>
      </Link>
    </div>
  );
}

export default CartSummary;
