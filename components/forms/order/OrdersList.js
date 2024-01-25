"use client";
import { Badge } from "@/components/ui/Badge";
import useQueryOrders from "@/hooks/useQueryOrders";

import { format, parseISO } from "date-fns";
import React from "react";

function OrdersList({ page, limit, userId }) {
  const { data } = useQueryOrders(userId, { page: page, limit: limit });

  if (!data || data.orders.length === 0) {
    return (
      <div className="h-[500px] rounded-md bg-muted p-4">
        <h2 className="mb-4 text-2xl font-bold">Orders List</h2>
        <div className="flex h-full items-center justify-center">
          <p className="font-semibold">No orders found.</p>
        </div>
      </div>
    );
  }

  const { orders } = data;

  return (
    <div className="rounded-md bg-muted p-4">
      <h2 className="mb-4 text-2xl font-bold">Orders List</h2>
      {orders.map((order) => (
        <div
          key={order.id}
          className="mb-4 flex flex-col gap-1 rounded-md border-2 p-4"
        >
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">Order ID: {order.id}</h3>
            <Badge
              variant={
                order.order_status === "PAID" ? "default" : "destructive"
              }
            >
              {order.order_status}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="font-light">
                Order from{" "}
                <span className="">
                  {" "}
                  {order.first_name} {order.last_name}
                </span>
              </p>
              <p className="font-light">
                Purchased on{" "}
                <span>
                  {format(parseISO(order.created_at), "MMMM dd, yyyy")}
                </span>
              </p>
              <p className="font-light">
                Deliver to{" "}
                <span className="">
                  {order.home_address}, {order.street}, {order.city}
                </span>
              </p>
            </div>
            <p>
              <span className="font-bold">
                ${order.total_amount.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrdersList;
