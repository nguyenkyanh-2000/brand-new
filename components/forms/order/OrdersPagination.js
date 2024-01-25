"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
} from "@/components/ui/Pagination";

function OrdersPagination({ currentPage, totalPages }) {
  const canGetNextPage = currentPage + 1 < totalPages;
  const canGetPrevPage = currentPage > 0;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst
            isClickable={canGetPrevPage}
            isVisible={true}
            href={`/me/orders?page=${0}`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            isVisible={canGetPrevPage}
            isClickable={canGetPrevPage}
            href={`/me/orders?page=${currentPage - 1}`}
          >
            {currentPage - 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isVisible={true} href="#" isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            isVisible={canGetNextPage}
            isClickable={canGetNextPage}
            href={`/me/orders?page=${currentPage + 1}`}
          >
            {currentPage + 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLast
            isClickable={canGetNextPage}
            isVisible={true}
            href={`/me/orders?page=${totalPages - 1}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default OrdersPagination;
