import FilterProductForm from "@/components/forms/product/FilterProductForm";
import React from "react";

async function ProductPage({ searchParams }) {
  return (
    <div className="mt-10 grid w-full grid-cols-12 gap-5 px-10">
      <h2 className="col-span-12 mb-10 text-center font-serif text-3xl sm:text-5xl">
        Products
      </h2>
      <div className="col-span-12 lg:col-span-2">
        <FilterProductForm />
      </div>
      <div className="col-span-12 h-screen bg-blue-700 lg:col-span-10"></div>
    </div>
  );
}

export default ProductPage;
