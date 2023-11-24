import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./useToast";
import { useRouter } from "next/navigation";

const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const deleteProductHandler = async (productId) => {
    const url = new URL(
      `/api/products/${productId}`,
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

  return useMutation({
    mutationKey: ["products"],
    mutationFn: (productId) => deleteProductHandler(productId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["products"]);
      router.refresh();
      toast({
        title: `Product is deleted.`,
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

export default useDeleteProduct;
