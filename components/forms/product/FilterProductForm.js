"use client";

import React, { useCallback } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Check, RotateCw } from "lucide-react";

const refinements = [
  {
    name: "badge",
    values: ["editor's choice", "best sellers", "new price", "popular"],
  },
  {
    name: "category",
    values: ["clothing", "furniture", "stationery", "cosmetic"],
  },
];

const priceRanges = [
  { pmin: 0, pmax: 50 },
  { pmin: 50, pmax: 100 },
  { pmin: 100, pmax: 200 },
  { pmin: 200, pmax: 500 },
  { pmin: 500, pmax: 1000 },
];

function FilterProductForm() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const hasParam = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      return params.getAll(name).includes(value.toString());
    },
    [searchParams],
  );

  const removeValue = useCallback((params, key, valueToRemove) => {
    const values = params
      .getAll(key)
      .filter((value) => value !== valueToRemove);
    params.delete(key);
    values.forEach((value) => params.append(key, value));
    return params;
  }, []);

  const updateURLParams = (params) => {
    router.push(pathName + "?" + params.toString());
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <Button
        variant="ghost"
        onClick={() => router.push(pathName)}
        className="flex gap-2"
      >
        <RotateCw size={16} /> <span>Reset filter</span>
      </Button>
      <Accordion type="multiple" collapsible="true" className="w-full">
        {refinements.map((refinement, index) => (
          <AccordionItem value={`refinement-${index}`} key={index}>
            <AccordionTrigger className="capitalize">
              {refinement.name}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-5 capitalize">
              {refinement.values.map((value) => (
                <div className="flex items-center gap-1" key={value}>
                  {hasParam(refinement.name, value) && <Check size={16} />}
                  <Button
                    variant="link"
                    className="font-light capitalize"
                    onClick={() => {
                      let params = new URLSearchParams(searchParams.toString());
                      if (hasParam(refinement.name, value)) {
                        params = removeValue(params, refinement.name, value);
                      } else {
                        params.append(refinement.name, value);
                      }
                      updateURLParams(params);
                    }}
                  >
                    {value}
                  </Button>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
        <AccordionItem value="price-range">
          <AccordionTrigger className="capitalize">
            Price range
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-5 capitalize">
            {priceRanges.map((range, index) => (
              <div className="flex items-center gap-1" key={index}>
                {hasParam("pmin", range.pmin) &&
                  hasParam("pmax", range.pmax) && <Check size={16} />}
                <Button
                  variant="link"
                  className="font-light capitalize"
                  onClick={() => {
                    let params = new URLSearchParams(searchParams);

                    if (
                      hasParam("pmin", range.pmin) &&
                      hasParam("pmax", range.pmax)
                    ) {
                      params.delete("pmin");
                      params.delete("pmax");
                    } else {
                      params.set("pmin", range.pmin);
                      params.set("pmax", range.pmax);
                    }

                    updateURLParams(params);
                  }}
                >
                  {`${range.pmin}$ - ${range.pmax}$`}
                </Button>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default FilterProductForm;
