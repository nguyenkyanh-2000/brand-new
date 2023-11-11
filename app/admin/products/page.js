import ProductTable from "@/components/tables/products/ProductTable";
import React from "react";
import { columns } from "@/components/tables/products/columns";

const API_URL = process.env.NEXT_PUBLIC_LOCATION_API;

async function getProducts() {
  const res = await fetch(`${API_URL}/products`);
  const jsonRes = await res.json();
  return jsonRes.data;
}

async function Page() {
  const data = await getProducts();

  return (
    <div className="w-full mt-10 px-10">
      <ProductTable
        data={data.products}
        columns={columns}
        totalPages={data.totalPages}
      ></ProductTable>
    </div>
  );
}

export default Page;
