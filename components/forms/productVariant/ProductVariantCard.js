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

function ProductVariantCard({ productVariant }) {
  const { mutate: editVariant } = useEditProductVariant();
  const { mutate: deleteVariant } = useDeleteProductVariant();
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(productVariantSchema),
    defaultValues: {
      name: productVariant.name,
      price: productVariant.price,
      amount_left: productVariant.amount_left,
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
      productId: productVariant.product_id,
      variantId: productVariant.id,
      data: data,
    });
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex flex-col gap-1 bg-muted hover:bg-muted/50 p-5">
          <h3>Variant name: {productVariant.name}</h3>
          <div>Stock: {productVariant.amount_left}</div>
          <div>Price: {productVariant.price}</div>
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
              className="w-full space-y-6 flex flex-col"
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

              <div className="w-full flex justify-between">
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
