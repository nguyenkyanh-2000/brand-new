import ProductForm from "@/components/forms/product/ProductForm";
import React from "react";

const API_URL = process.env.NEXT_PUBLIC_LOCATION_API;

async function getProductById(id) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    next: { revalidate: 0 },
  });
  const result = await res.json();
  return result;
}

async function Page({ params }) {
  const productId = params.id;
  const res = await getProductById(productId);

  if (res.error) throw new Error(res.error.message);

  const { product } = res.data;

  return (
    <div className="w-full mt-10">
      <h2 className="font-serif text-3xl sm:text-5xl text-center mb-10">
        Edit product
      </h2>
      <div className="flex flex-col lg:grid grid-cols-12 p-10 gap-10 bg-muted">
        <div className="col-span-8 bg-background rounded p-5 sm:p-10 flex flex-col gap-10">
          <h3 className="text-xl sm:text-3xl font-bold"> Basic information</h3>
          <ProductForm defaultProduct={product} />
        </div>
        <div className="col-span-4 bg-background rounded"></div>
      </div>
    </div>
  );
}

export default Page;
