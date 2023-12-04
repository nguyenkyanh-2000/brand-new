import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./useToast";

const useEditProduct = (productId) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const queryKey = ["product", { id: productId }];

  const editProductHandler = async (productId, data) => {
    const url = new URL(
      `/api/products/${productId}`,
      process.env.NEXT_PUBLIC_LOCATION_ORIGIN,
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

  return useMutation({
    mutationKey: ["product", { id: productId }],
    mutationFn: ({ data }) => editProductHandler(productId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["product", { id: productId }]);
      toast({
        title: `Product is updated.`,
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

export default useEditProduct;
