"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import productVariantSchema from "@/schema/productVariantSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import useAddProductVariant from "@/hooks/useAddProductVariant";

export function AddProductVariantDialog({ productId }) {
  const { mutate } = useAddProductVariant(productId);
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(productVariantSchema),
    defaultValues: {
      name: "",
      price: 0,
      amount_left: 0,
      color: "#000000",
    },
  });

  const onSubmit = (data) => {
    mutate({ data });
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add variant</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[320px] sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add a product variant</DialogTitle>
          <DialogDescription>Add a new product variant here.</DialogDescription>
        </DialogHeader>
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

            <div className="flex w-full justify-end gap-4">
              <Button
                className="w-[100px]"
                type="reset"
                variant="secondary"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button className="w-[100px]" type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
