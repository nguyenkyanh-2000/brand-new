import ProductTable from "@/components/tables/products/ProductTable";
import React from "react";
import { columns } from "@/components/tables/products/columns";

const API_URL = process.env.NEXT_PUBLIC_LOCATION_API;

async function getProducts(page, limit) {
  const res = await fetch(`${API_URL}/products?page=${page}&limit=${limit}`);
  const jsonRes = await res.json();
  return jsonRes;
}

async function Page({ searchParams }) {
  const currentPage = searchParams.page || 0;
  const limit = searchParams.limit || 10;
  const res = await getProducts(currentPage, limit);

  if (res.error) throw new Error(res.error.message);

  const { products, totalPages } = res.data;

  return (
    <div className="w-full mt-10 px-10">
      <h2 className="font-serif text-3xl sm:text-5xl text-center mb-10">
        Products
      </h2>
      <ProductTable
        data={products}
        columns={columns}
        totalPages={totalPages}
        currentPage={currentPage}
        limit={limit}
      ></ProductTable>
    </div>
  );
}

export default Page;
