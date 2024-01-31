import getQueryClient from "@/utils/getQueryClient";
const { useToast } = require("./useToast");
import { useMutation } from "@tanstack/react-query";
import { useCart } from "./useCart";
import useDeleteCart from "./useDeleteCart";

const addOrderHandler = async ({ data }) => {
  const url = new URL(`api/orders`, process.env.NEXT_PUBLIC_LOCATION_ORIGIN);
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

const useAddOrder = (userId) => {
  const queryClient = getQueryClient();
  const { toast } = useToast();
  const { clearCart } = useCart();
  const { mutate } = useDeleteCart();

  return useMutation({
    mutationKey: ["order"],
    mutationFn: ({ data }) => addOrderHandler({ userId, data }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["order"]);
      mutate(userId);
      clearCart();
      toast({
        title: `Your order is saved`,
        description: "Your order is saved successfully!",
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

export default useAddOrder;
