import React from "react";
import { Button } from "@/components/ui/Button";
import { ProductTableViewOptions } from "./ProductTableViewOptions";
import { ProductTableFacetedFilter } from "./ProductTableFacetedFilter";
import { XCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { AddProductDialog } from "@/components/forms/product/AddProductDialog";

export const ProductTableToolbar = ({ table }) => {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className={"flex flex-col gap-5 sm:gap-2 sm:flex-row"}>
      <div className={"flex items-center"}>
        <Input
          placeholder="Filter products..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className={"h-8 w-full lg:w-[250px]"}
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className={"h-8 px-2 lg:px-3"}
          >
            Reset
            <XCircle className={"ml-2 h-4 w-4"} />
          </Button>
        )}
      </div>
      {table.getColumn("category") && (
        <ProductTableFacetedFilter
          column={table.getColumn("category")}
          title="Categories"
          options={Array.from(
            table.getColumn("category").getFacetedUniqueValues().keys(),
            (value, id) => ({ value: value, label: value })
          )}
        />
      )}
      <ProductTableViewOptions table={table} />
      <AddProductDialog />
    </div>
  );
};
