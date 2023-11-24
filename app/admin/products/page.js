import React from "react";
import useGetProducts from "@/hooks/useGetProducts";
import ProductTable from "@/components/tables/products/ProductTable";
import { columns } from "@/components/tables/products/columns";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/utils/getQueryClient";

const Page = async ({ searchParams }) => {
  const { data, error } = await useGetProducts(
    searchParams.page,
    searchParams.limit
  );

  if (error) throw new Error(error.message);

  const { totalPages, products } = data;
  const dehydratedState = dehydrate(getQueryClient());

  return (
    <div className="w-full mt-10 px-10">
      <h2 className="font-serif text-3xl sm:text-5xl text-center mb-10">
        Products
      </h2>
      <HydrationBoundary state={dehydratedState}>
        <ProductTable
          data={products}
          columns={columns}
          totalPages={totalPages}
          currentPage={searchParams.page || 0}
          limit={searchParams.limit || 10}
        ></ProductTable>
      </HydrationBoundary>
    </div>
  );
};

export default Page;
