import React from "react";
import { Button } from "@/components/ui/Button";
import { ProductTableViewOptions } from "./ProductTableViewOptions";
import { ProductTableFacetedFilter } from "./ProductTableFacetedFilter";
import { XCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";

export const ProductTableToolbar = ({ table }) => {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className={"flex items-center justify-between"}>
      <div className={"flex flex-1 items-center space-x-2"}>
        <Input
          placeholder="Filter products..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className={"h-8 w-[150px] lg:w-[250px]"}
        />
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
      <ProductTableViewOptions table={table} />
    </div>
  );
};
