"use client";

import { Separator } from "@/components/ui/Separator";
import React from "react";
import { useCart } from "@/hooks/useCart";
import { roundPrice } from "@/utils/formatPrice";

function CartSummary() {
  const cart = useCart((state) => state.items);

  const subtotal = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const discount =
    cart.reduce((acc, item) => {
      return acc + item.original_price * item.quantity;
    }, 0) - subtotal;

  const shipping = 0;

  const total = subtotal - discount + shipping;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="col-span-3 mb-5 text-xl font-semibold">Order summary</h3>
      <div className="flex justify-between">
        <p>Subtotal:</p>
        <p>{roundPrice(subtotal)}$</p>
      </div>
      <div className="flex justify-between">
        <p>Discount:</p>
        <p>{discount}$</p>
      </div>
      <div className="flex justify-between">
        <p>Shipping:</p>
        <p>{shipping === 0 ? "Free" : `${shipping}$`}</p>
      </div>
      <Separator />
      <div className="flex justify-between">
        <p>Total:</p>
        <p>ro{roundPrice(total)}$</p>
      </div>
    </div>
  );
}

export default CartSummary;