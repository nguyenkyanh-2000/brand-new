import { useMutation } from "@tanstack/react-query";
import { decryptId } from "@/utils/crypto";
import { toast } from "./useToast";

const editOrderHandler = async (encryptedOrderId, data) => {
  const orderId = decryptId(encryptedOrderId);
  const url = new URL(
    `/api/orders/${orderId}/payment`,
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

const usePayOrder = () => {
  const queryKey = ["order"];

  return useMutation({
    mutationKey: queryKey,
    mutationFn: ({ data, encryptedOrderId }) =>
      editOrderHandler(encryptedOrderId, data),
    onSuccess: (data) => {
      toast({
        title: `Order is paid.`,
        description: "Thank you for your purchase!",
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

export default usePayOrder;
