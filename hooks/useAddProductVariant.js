import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "./useToast";

const addProductVariant = async ({ productId, data }) => {
  const url = new URL(
    `/api/products/${productId}/variants`,
    process.env.NEXT_PUBLIC_LOCATION_ORIGIN
  );
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();

  if (result.error) throw new Error(result.error.message);

  return result;
};

const useAddProductVariant = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["products"],
    mutationFn: ({ productId, data }) => addProductVariant({ productId, data }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["products"]);
      router.refresh();
      toast({
        title: `New product variant added.`,
        description: "A new product variant was created successfully!",
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

export default useAddProductVariant;
