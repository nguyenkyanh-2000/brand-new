import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "./useToast";

const useEditProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  const editProductHandler = async (productId, data) => {
    const url = new URL(
      `/api/products/${productId}`,
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

  const { mutate: editProduct } = useMutation({
    mutationKey: ["products"],
    mutationFn: ({ productId, data }) => editProductHandler(productId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["products"]);
      console.log(data);
      toast({
        title: `Product is updated.`,
        description: "Update successfully!",
      });
    },
    onError: (error) => {
      toast({ title: "Error!", description: `${error.message}` });
    },
  });

  return { editProduct };
};

export default useEditProduct;
