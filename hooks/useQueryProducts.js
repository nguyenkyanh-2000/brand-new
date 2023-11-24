import getQueryClient from "@/utils/getQueryClient";
import { useQuery } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_LOCATION_API;

const useQueryProducts = (page = 0, limit = 10) => {
  const options = {
    next: { revalidate: 0 },
  };

  const getProducts = async () => {
    const res = await fetch(
      `${API_URL}/products?page=${page}&limit=${limit}`,
      options
    );
    const result = await res.json();
    if (result.error) throw new Error(result.error.message);
    return result.data;
  };

  const queryKey = ["products"];

  const { data, error } = useQuery({
    queryKey: queryKey,
    queryFn: () => getProducts(page, limit),
  });

  return { data, error };
};

export default useQueryProducts;
