"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import productSchema from "@/schema/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import React from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import useEditProduct from "@/hooks/useEditProduct";
import useQueryProduct from "@/hooks/useQueryProduct";
import { InputTags } from "@/components/ui/InputTags";

function ProductForm({ productId }) {
  const {
    data: { product: defaultProduct },
    error,
  } = useQueryProduct(productId);

  const { mutate, isPending } = useEditProduct(productId);
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: defaultProduct.name,
      description: defaultProduct.description,
      price: defaultProduct.price,
      category: defaultProduct.category,
      keywords: defaultProduct.keywords,
      badge: defaultProduct.badge,
    },
  });

  const onSubmit = (data) => {
    mutate({ data });
  };

  return (
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
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input id="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">Description</FormLabel>
              <FormControl>
                <Textarea id="description" {...field} />
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
              <FormLabel htmlFor="price">Base price (USD)</FormLabel>
              <FormControl>
                <Input id="price" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="cosmetic">Cosmetic</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="stationery">Stationary</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="badge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product badge</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="editor's choice">
                    {"Editor's choice"}
                  </SelectItem>
                  <SelectItem value="best sellers">Best sellers</SelectItem>
                  <SelectItem value="new price">New price</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add keywords</FormLabel>
              <FormControl>
                <InputTags {...field} />
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
          <Button
            variant="default"
            isLoading={isPending}
            disabled={isPending}
            className="w-[100px]"
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
export default ProductForm;
