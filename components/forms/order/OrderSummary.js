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
import { useCart } from "@/hooks/useCart";
import React, { useEffect, useState } from "react";

const saveCartHandler = async ({ userId, data }) => {
  const url = new URL(
    `api/cart/${userId}`,
    process.env.NEXT_PUBLIC_LOCATION_ORIGIN,
  );
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();

  if (result.error) throw new Error(result.error.message);

  return result.data;
};

function OrderSummary({ userId }) {
  const { items } = useCart();
  const [open, setOpen] = useState(false);

  // const onKeepingOldCart = () => {
  //   const oldCart = data.cart.map((item) => item.product_variant);
  //   const mergedCart = [...items, ...oldCart];
  //   setCart(mergedCart);
  // };

  const onSavingCart = async () => {
    console.log("saved!");
    let newItems = items.map((item) => ({
      quantity: item.quantity,
      variant_id: item.id,
    }));
    console.log(await saveCartHandler({ userId, data: newItems }));
  };

  useEffect(() => {
    if (items.length > 0) setOpen(true);
  }, [items.length]);

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Old cart found!</AlertDialogTitle>
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
      <h3>Order summary</h3>
    </div>
  );
}

export default OrderSummary;
