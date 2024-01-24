import getQueryClient from "@/utils/getQueryClient";

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
  return result;
};

const useFetchOrders = async (userId, searchParams) => {
  const queryClient = getQueryClient();
  const queryKey = ["orders", searchParams];

  return await queryClient.fetchQuery({
    queryKey: queryKey,
    queryFn: () => getOrders(userId, searchParams),
  });
};

export default useFetchOrders;
