import FilterProductForm from "@/components/forms/product/FilterProductForm";
import useGetProducts from "@/hooks/useGetProducts";
import React from "react";

async function ProductPage({ searchParams }) {
  const { data, error } = await useGetProducts(
    searchParams.page,
    searchParams.limit,
  );

  console.log(data);
  return (
    <div className="mt-10 grid w-full grid-cols-12 gap-5 px-10">
      <h2 className="col-span-12 mb-10 text-center font-serif text-3xl sm:text-5xl">
        Products
      </h2>
      <div className="col-span-12 lg:col-span-2">
        <FilterProductForm />
      </div>
      <div className="col-span-12 h-screen lg:col-span-10"></div>
    </div>
  );
}

export default ProductPage;
