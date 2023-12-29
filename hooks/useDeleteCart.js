import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./useToast";
import { useRouter } from "next/navigation";

const deleteCartHandler = async (userId) => {
  const url = new URL(
    `/api/cart/${userId}`,
    process.env.NEXT_PUBLIC_LOCATION_ORIGIN,
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

  return result.data;
};

const useDeleteCart = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationKey: ["cart"],
    mutationFn: (userId) => deleteCartHandler(userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cart"]);
      router.refresh();
      toast({
        title: `Cart is emptied.`,
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

export default useDeleteCart;
