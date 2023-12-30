import getQueryClient from "@/utils/getQueryClient";
const { useRouter } = require("next/navigation");
const { useToast } = require("./useToast");
import { useMutation } from "@tanstack/react-query";

const saveCartHandler = async ({ userId, data }) => {
  const url = new URL(
    `api/cart/${userId}`,
    process.env.NEXT_PUBLIC_LOCATION_ORIGIN,
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

  return result.data;
};

const useSaveCart = () => {
  const queryClient = getQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["cart"],
    mutationFn: ({ userId, data }) => saveCartHandler({ userId, data }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cart"]);
      router.refresh();
      toast({
        title: `Your cart is saved.`,
        description: "Items in your cart are saved successfully!",
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

export default useSaveCart;
