"use client";

import React from "react";
import { MoreHorizontal } from "lucide-react";
import { ProductTableColumnHeader } from "./ProductTableColumnHeader";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/DropdownMenu";

import Link from "next/link";
import { format } from "date-fns";
import DeleteProductDialog from "@/components/forms/product/DeleteProductDialog";

const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <ProductTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <ProductTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const amount = format(new Date(row.getValue("created_at")), "PPP");
      return React.createElement(
        "div",
        { className: "font-secondary font-medium" },
        amount
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <ProductTableColumnHeader column={column} title="Price (USD)" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return React.createElement(
        "div",
        { className: "font-secondary font-medium" },
        formatted
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <ProductTableColumnHeader column={column} title="Category" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/admin/products/${product.id}`}>Edit product</Link>
            </DropdownMenuItem>
            <DeleteProductDialog productId={product.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export { columns };
