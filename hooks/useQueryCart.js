import { useQuery } from "@tanstack/react-query";

const getCart = async (userId) => {
  const url = new URL(
    `/api/cart/${userId}`,
    process.env.NEXT_PUBLIC_LOCATION_ORIGIN,
  );
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 0 },
  });
  const result = await res.json();
  if (result.error) throw new Error(result.error.message);

  return result.data;
};

const useQueryCart = (userId) => {
  const queryKey = ["cart"];

  return useQuery({
    queryKey: queryKey,
    queryFn: async () => await getCart(userId),
    enabled: !!userId,
  });
};

export default useQueryCart;
