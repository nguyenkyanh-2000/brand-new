import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";

import { Button } from "@/components/ui/Button";
import useDeleteProductImage from "@/hooks/useDeleteProductImage";

function DeleteProductImageDialog({ imageId, productId, className }) {
  const { mutate } = useDeleteProductImage();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={className} variant="destructive">
          Delete image
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {"This action will delete this image! It is irreversible."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              mutate({ productId, imageId });
            }}
            className="bg-destructive text-destructive-foreground"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteProductImageDialog;
