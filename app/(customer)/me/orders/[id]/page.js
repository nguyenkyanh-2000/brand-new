import OrderDetail from "@/components/forms/order/OrderDetail";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

async function OrderDetailPage({ params }) {
  const orderId = params.id;
  return (
    <div className="flex flex-col p-4">
      <div className="flex justify-between gap-2">
        <h4 className="mb-4 text-xl font-bold sm:text-2xl">
          Order: <span className="text-base font-normal">{orderId}</span>
        </h4>
        <Link className="flex gap-1 font-bold" href={"/me/orders"}>
          Back to Orders
          <ArrowRight />
        </Link>
      </div>
      <OrderDetail orderId={orderId} />
    </div>
  );
}

export default OrderDetailPage;
