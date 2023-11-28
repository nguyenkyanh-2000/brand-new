import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "./useToast";

const deleteProductImageHandler = async (data) => {
  const productId = data.productId;
  const imageId = data.imageId;
  const url = new URL(
    `/api/products/${productId}/images/${imageId}`,
    process.env.NEXT_PUBLIC_LOCATION_ORIGIN
  );

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();

  if (result.error) throw new Error(result.error.message);

  return result;
};

const useDeleteProductImage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["products"],
    mutationFn: (data) => deleteProductImageHandler(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["products"]);
      router.refresh();
      toast({
        title: `Product image deleted`,
        description: "A product image was deleted successfully!",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error!",
        description: `${error.message}`,
      });
    },
  });
};

export default useDeleteProductImage;
