import CustomerProductPagination from "@/components/forms/product/CustomerProductPagination";
import FilterProductForm from "@/components/forms/product/FilterProductForm";
import SortByFilter from "@/components/forms/product/SortByFilter";
import CustomerProductImageGallery from "@/components/gallery/CustomerProductImageGallery";
import useGetProducts from "@/hooks/useGetProducts";
import React from "react";

async function ProductPage({ searchParams }) {
  const { data, error } = await useGetProducts(searchParams);

  console.log(data);
  if (error) throw new Error(error.message);

  return (
    <div className="mt-10 grid w-full grid-cols-12 gap-5 px-10 md:mt-[200px]">
      <div className="col-span-12 lg:col-span-2">
        <FilterProductForm />
      </div>

      <div className="col-span-12 flex min-h-screen flex-col gap-5 lg:col-span-10">
        {data.products.length > 0 ? (
          <>
            <SortByFilter />
            <CustomerProductImageGallery products={data.products} />
            <CustomerProductPagination
              currentPage={data.currentPage}
              totalPages={data.totalPages}
            />
          </>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center gap-2">
            <h4 className="font-serif text-2xl font-semibold text-foreground md:text-4xl">
              No products found.
            </h4>
            <p className="text-muted-foreground">
              Please reset the filter and try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
