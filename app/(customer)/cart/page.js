import CartForm from "@/components/forms/cart/CartForm";
import CartSummary from "@/components/forms/cart/CartSummary";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Cart | Brand",
  description: "Cart for Brand's user",
};

async function CartPage() {
  return (
    <div className="mt-20 grid w-full grid-cols-12 gap-5 px-10">
      <h2 className="col-span-12 mb-20 text-center font-serif text-3xl sm:text-5xl">
        Cart
      </h2>
      <div className="col-span-12 rounded-md  bg-muted p-5 md:col-span-8">
        <CartForm />
      </div>
      <div className="col-span-12 flex h-fit flex-col gap-5 rounded-md bg-muted p-5 md:col-span-4 ">
        <CartSummary />
      </div>
    </div>
  );
}

export default CartPage;
