import React from "react";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function ProductTablePagination({ table }) {
  const router = useRouter();
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows:</p>
        <Select
          onValueChange={(value) => {
            // Calculate new page index when limit is changed
            let newPageIndex = Math.floor(
              (table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize) /
                Number(value)
            );

            router.push(`/admin/products?page=${newPageIndex}&limit=${value}`);
            table.setPageIndex(newPageIndex);
            table.setPageCount(table.getPageCount());
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {Number(table.getState().pagination.pageIndex) + 1} of{" "}
        {table.getPageCount()}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className={`hidden p-0 lg:flex ${
            !table.getCanPreviousPage() ? "cursor-not-allowed" : ""
          }`}
          onClick={() => {
            table.setPageIndex(0);
            router.push(
              `/admin/products?page=1&limit=${
                table.getState().pagination.pageSize
              }`
            );
          }}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to first page</span>
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className={` p-0 ${
            !table.getCanPreviousPage() ? "cursor-not-allowed" : ""
          }`}
          onClick={() => {
            table.previousPage();
            router.push(
              `/admin/products?page=${
                table.getState().pagination.pageIndex - 1
              }&limit=${table.getState().pagination.pageSize}`
            );
          }}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className={` p-0 ${
            !table.getCanNextPage() ? "cursor-not-allowed" : ""
          }`}
          onClick={() => {
            table.nextPage();
            router.push(
              `/admin/products?page=${
                table.getState().pagination.pageIndex + 1
              }&limit=${table.getState().pagination.pageSize}`
            );
          }}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className={`hidden  p-0 lg:flex ${
            !table.getCanNextPage() ? "cursor-not-allowed" : ""
          }`}
          onClick={() => {
            table.setPageIndex(table.getPageCount() - 1);
            router.push(
              `/admin/products?page=${table.getPageCount()}&limit=${
                table.getState().pagination.pageSize
              }`
            );
          }}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to last page</span>
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
