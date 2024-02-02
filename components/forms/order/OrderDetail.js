"use client";

import useQueryOrder from "@/hooks/useQueryOrder";
import React from "react";
import countries from "@/data/countries.json";
import OrderItem from "./OrderItem";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

function OrderDetail({ orderId }) {
  const { data } = useQueryOrder(orderId);
  const router = useRouter();
  if (!data)
    return (
      <div className="flex h-[300px] w-full rounded-md bg-background p-4 shadow-md">
        Order not found.
      </div>
    );

  const { order } = data;
  let orderCountry = countries.find(
    (country) => country.value === order.country,
  ).label;

  const onPayNow = () => {
    router.push(`/payment/${orderId}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full flex-col rounded-md bg-background p-4 shadow-md">
        <div className="flex flex-col">
          <div>
            <span className="font-bold">Customer: </span>
            <span>{` ${order.first_name} ${order.last_name}`}</span>
          </div>
          <div>
            <span className="font-bold">Address: </span>
            {` ${order.house_number} ${order.street} Street, ${order.city} City, ${order.province} Province, ${orderCountry}`}{" "}
          </div>
          <div>
            <span className="font-bold">Delivery note: </span>
            {order.delivery_note}
          </div>
        </div>
      </div>
      <ScrollArea className="h-[500px] w-full rounded-md bg-background p-4 py-10 shadow-md">
        <div className="font-bold underline">Order details:</div>
        <div className="flex flex-col gap-4 divide-y-4">
          {order.order_item.map((item) => (
            <OrderItem key={item.id} item={item} />
          ))}
        </div>
      </ScrollArea>
      <div className="flex w-full items-center justify-between rounded-md bg-background p-4 shadow-md">
        <div className="flex flex-col">
          <div>
            <span className="font-bold">Total amount: </span>
            <span>{` ${order.total_amount}$`}</span>
          </div>
          <div>
            <span className="font-bold">Ordered on: </span>
            {format(parseISO(order.created_at), "MMMM dd, yyyy")}
          </div>
        </div>
        {order.order_status === "UNPAID" && (
          <Button onClick={onPayNow}>Pay now</Button>
        )}
      </div>
    </div>
  );
}

export default OrderDetail;
