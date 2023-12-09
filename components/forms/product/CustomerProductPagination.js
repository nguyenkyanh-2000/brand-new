"use client";

import { Button } from "@/components/ui/Button";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Select } from "@radix-ui/react-select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

function CustomerProductPagination({ currentPage, totalPages }) {
  const [limit, setLimit] = useState(10);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const canGetNextPage = currentPage + 1 < totalPages;
  const canGetPrevPage = currentPage > 0;

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows:</p>
        <Select
          value={limit}
          onValueChange={(limit) => {
            setLimit(limit);
            router.push(pathName + "?" + createQueryString("limit", limit));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {Number(currentPage + 1)} of {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className={`hidden p-0 lg:flex ${
            !canGetPrevPage ? "cursor-not-allowed" : ""
          }`}
          onClick={() => {
            router.push(
              pathName + "?" + createQueryString("page", currentPage - 1),
            );
          }}
          disabled={!canGetPrevPage}
        >
          <span className="sr-only">Go to first page</span>
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className={` p-0 ${!canGetPrevPage ? "cursor-not-allowed" : ""}`}
          onClick={() => {
            router.push(pathName + "?" + createQueryString("page", 0));
          }}
          disabled={!canGetPrevPage}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className={` p-0 ${!canGetNextPage ? "cursor-not-allowed" : ""}`}
          onClick={() => {
            router.push(
              pathName + "?" + createQueryString("page", currentPage + 1),
            );
          }}
          disabled={!canGetNextPage}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className={`hidden  p-0 lg:flex ${
            !canGetNextPage ? "cursor-not-allowed" : ""
          }`}
          onClick={() => {
            router.push(
              pathName + "?" + createQueryString("page", totalPages - 1),
            );
          }}
          disabled={!canGetNextPage}
        >
          <span className="sr-only">Go to last page</span>
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default CustomerProductPagination;
