import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./useToast";
import { useRouter } from "next/navigation";

const editProductVariant = async ({ productId, variantId, data }) => {
  const url = new URL(
    `/api/products/${productId}/variants/${variantId}`,
    process.env.NEXT_PUBLIC_LOCATION_ORIGIN
  );

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const res = await fetch(url, options);
  const result = await res.json();

  if (result.error) throw new Error(result.error.message);

  return result;
};

const useEditProductVariant = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationKey: ["products"],
    mutationFn: ({ productId, variantId, data }) =>
      editProductVariant({ productId, variantId, data }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["product"]);
      router.refresh();
      toast({
        title: `Product variant is updated.`,
        description: "Update successfully!",
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

export default useEditProductVariant;
