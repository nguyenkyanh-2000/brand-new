import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./useToast";
import { useRouter } from "next/navigation";

const deleteProductVariant = async ({ productId, variantId }) => {
  const url = new URL(
    `/api/products/${productId}/variants/${variantId}`,
    process.env.NEXT_PUBLIC_LOCATION_ORIGIN
  );

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url, options);
  const result = await res.json();

  if (result.error) throw new Error(result.error.message);

  return result;
};

const useDeleteProductVariant = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationKey: ["products"],
    mutationFn: ({ productId, variantId }) =>
      deleteProductVariant({ productId, variantId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["product"]);
      router.refresh();
      toast({
        title: `Product variant is delete.`,
        description: "Delete successfully!",
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

export default useDeleteProductVariant;
