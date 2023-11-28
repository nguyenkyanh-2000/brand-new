"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
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
import { ImageSchema } from "@/schema/imageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Dropzone } from "@/components/ui/Dropzone";
import useAddProductImage from "@/hooks/useAddProductImage";

export function AddProductImageDialog({ productId }) {
  const [open, setOpen] = useState(false);
  const { mutate } = useAddProductImage();
  const form = useForm({
    resolver: zodResolver(ImageSchema),
    defaultValues: {
      image: "",
      description: "",
    },
  });

  const onSubmit = (data) => {
    mutate({ productId: productId, ...data });
    setOpen(false);
    form.reset();
  };

  const onCancel = () => {
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add image</Button>
      </DialogTrigger>
      <DialogContent
        onCloseAutoFocus={() => form.reset()}
        className="max-w-[320px] sm:max-w-[500px]"
      >
        <DialogHeader>
          <DialogTitle>Add a product image</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 flex flex-col"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">Image description</FormLabel>
                  <FormControl>
                    <Input id="description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="image">Image</FormLabel>
                  <FormControl>
                    <Dropzone id="image" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex justify-end gap-4">
              <Button
                className="w-[100px]"
                variant="secondary"
                onClick={onCancel}
                type="reset"
              >
                Cancel
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
