import useFetchOrders from "@/hooks/useFetchOrders";
import { getCurrentUser } from "@/utils/supabase-auth-utils";
import React from "react";

export const metadata = {
  title: "My orders | Brand",
  description: "User's orders page in Brand",
};

async function OrdersPage({ searchParams }) {
  const currentUser = await getCurrentUser();
  const page = searchParams.page || 0;
  const limit = searchParams.limit || 10;
  const { data } = await useFetchOrders(currentUser.id, {
    page: page,
    limit: limit,
  });
  console.log(data);
  return <div>{currentUser.id}</div>;
}

export default OrdersPage;
