"use client";

import productVariantSchema from "@/schema/productVariantSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import useEditProductVariant from "@/hooks/useEditProductVariant";
import useDeleteProductVariant from "@/hooks/useDeleteProductVariant";
import clsx from "clsx";

function ProductVariantCard({ productVariant }) {
  const { mutate: editVariant } = useEditProductVariant(
    productVariant.product_id,
  );
  const { mutate: deleteVariant } = useDeleteProductVariant(
    productVariant.product_id,
  );
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(productVariantSchema),
    defaultValues: {
      name: productVariant.name,
      price: productVariant.price,
      amount_left: productVariant.amount_left,
      color: productVariant.color,
    },
  });

  const handleDelete = () => {
    deleteVariant({
      productId: productVariant.product_id,
      variantId: productVariant.id,
    });
    setOpen(false);
  };

  const onSubmit = (data) => {
    editVariant({
      variantId: productVariant.id,
      data: data,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex h-[150px] items-center justify-between bg-muted p-5 hover:bg-muted/50">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg">
              <span className="text-muted-foreground">Name: </span>
              <span className={`font-bold`}>{productVariant.name}</span>
            </h3>
            <div>
              <span className="text-muted-foreground">Stock:</span>
              <span
                className={clsx("font-semibold", {
                  "text-destructive": productVariant.amount_left === 0,
                })}
              >
                {" "}
                {productVariant.amount_left}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Price:</span>
              <span className="font-semibold"> {productVariant.price}</span>
            </div>
          </div>
          <div
            className="h-8 w-8 rounded-full border-2 border-muted-foreground"
            style={{
              backgroundColor: productVariant.color,
            }}
          ></div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit a product variant</DialogTitle>
          <DialogDescription>
            Make changes to your current product variant.
          </DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Variant name</FormLabel>
                    <FormControl>
                      <Input id="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="price">
                      {"Variant's price (USD)"}
                    </FormLabel>
                    <FormControl>
                      <Input id="price" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount_left"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="amount_left">
                      {"Amount in stock (Pieces)"}
                    </FormLabel>
                    <FormControl>
                      <Input id="amount_left" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="color">{"Color"}</FormLabel>
                    <FormControl>
                      <Input id="color" type="color" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex w-full justify-between">
                <Button
                  className="w-[100px]"
                  variant="destructive"
                  type="button"
                  onClick={handleDelete}
                >
                  Delete variant
                </Button>
                <Button className="w-[100px]" type="submit">
                  Edit variant
                </Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ProductVariantCard;
