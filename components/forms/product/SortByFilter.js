"use client";

import React, { useState, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SortByFilter() {
  const [value, setValue] = useState("");
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="flex w-full items-center justify-end">
      <Select
        value={value}
        onValueChange={(value) => {
          setValue(value);
          router.push(pathName + "?" + createQueryString("order_by", value));
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price-asc">Ascending Price</SelectItem>
          <SelectItem value="price-desc">Descending Price</SelectItem>
          <SelectItem value="name-asc">Ascending Name</SelectItem>
          <SelectItem value="name-desc">Descending Name</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SortByFilter;
