"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/AlertDialog";
import { Separator } from "@/components/ui/Separator";
import { useCart } from "@/hooks/useCart";
import useSaveCart from "@/hooks/useSaveCart";
import React, { useEffect, useState } from "react";
import { roundPrice } from "@/utils/formatPrice";

function OrderSummary({ userId }) {
  const { items } = useCart();
  const [open, setOpen] = useState(false);
  const { mutate } = useSaveCart();

  const onSavingCart = async () => {
    let newItems = items.map((item) => ({
      quantity: item.quantity,
      variant_id: item.id,
      product_id: item.product_id,
    }));
    mutate({ userId, data: newItems });
  };

  useEffect(() => {
    if (items.length > 0) setOpen(true);
  }, [items.length]);

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
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>New cart</AlertDialogTitle>
            <AlertDialogDescription>
              {"Do you want to save the content in the cart?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onSavingCart}>Save</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
      </div>
    </div>
  );
}

export default OrderSummary;
