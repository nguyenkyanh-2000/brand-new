import getQueryClient from "@/utils/getQueryClient";
import { useQuery } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_LOCATION_API;

const getOrders = async (userId, searchParams) => {
  const { page = 0, limit = 10 } = searchParams;

  const params = new URLSearchParams({ page, limit });
  const searchParamsString = params.toString();

  const options = {
    next: { revalidate: 0 },
  };

  const res = await fetch(
    `${API_URL}/users/${userId}/orders?${searchParamsString}`,
    options,
  );
  const result = await res.json();
  if (result.error) throw new Error(result.error.message);
  return result.data;
};

const useQueryOrders = (userId, searchParams) => {
  const queryKey = ["orders", { user_id: userId }, searchParams];
  const queryClient = getQueryClient();
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => await getOrders(userId, searchParams),
    queryClient: queryClient,
  });
};

export default useQueryOrders;
