import { useQuery } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_LOCATION_API;

const getOrder = async (orderId) => {
  const options = {
    next: { revalidate: 0 },
  };
  const res = await fetch(`${API_URL}/orders/${orderId}`, options);
  const result = await res.json();
  if (result.error) throw new Error(result.error.message);
  return result.data;
};

const useQueryOrder = (orderId) => {
  const queryKey = ["order", { id: orderId }];

  return useQuery({
    queryKey: queryKey,
    queryFn: async () => await getOrder(orderId),
  });
};

export default useQueryOrder;
