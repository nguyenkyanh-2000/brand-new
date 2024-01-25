import OrdersList from "@/components/forms/order/OrdersList";
import OrdersPagination from "@/components/forms/order/OrdersPagination";
import useFetchOrders from "@/hooks/useFetchOrders";
import {
  getCurrentSessionUser,
  getCurrentUser,
} from "@/utils/supabase-auth-utils";
import React from "react";

export const metadata = {
  title: "My orders | Brand",
  description: "User's orders page in Brand",
};

async function OrdersPage({ searchParams }) {
  const currentUser = await getCurrentSessionUser();
  const page = searchParams.page || 0;
  const limit = searchParams.limit || 10;

  const { data } = await useFetchOrders(currentUser.id, {
    page: page,
    limit: limit,
  });
  return (
    <div className="flex h-full w-full flex-col">
      <OrdersList userId={currentUser.id} page={page} limit={limit} />
      <OrdersPagination
        currentPage={data.currentPage}
        totalPages={data.totalPages}
      />
    </div>
  );
}

export default OrdersPage;
