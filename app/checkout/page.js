import OrderSummary from "@/components/forms/order/OrderSummary";
import ShippingDetail from "@/components/forms/order/ShippingDetails";
import { getCurrentUser } from "@/utils/supabase-auth-utils";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Checkout | Brand",
  description: "Checkout for Brand's user",
};

async function CheckoutPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="mt-20 grid w-full grid-cols-12 gap-5 px-10">
      <h2 className="col-span-12 mb-20 text-center font-serif text-3xl sm:text-5xl">
        Checkout
      </h2>
      <div className="col-span-12 rounded-md bg-muted p-5 md:col-span-8">
        <ShippingDetail userId={user?.id} />
      </div>
      <div className="col-span-12 rounded-md bg-muted p-5 md:col-span-4">
        <OrderSummary userId={user?.id} />
      </div>
    </div>
  );
}

export default CheckoutPage;
