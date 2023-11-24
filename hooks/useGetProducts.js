import getQueryClient from "@/utils/getQueryClient";

const API_URL = process.env.NEXT_PUBLIC_LOCATION_API;

const useGetProducts = async (page = 0, limit = 10) => {
  const queryClient = getQueryClient();

  const options = {
    next: { revalidate: 0 },
  };

  const getProducts = async () => {
    const res = await fetch(
      `${API_URL}/products?page=${page}&limit=${limit}`,
      options
    );
    const result = await res.json();
    return result;
  };

  const queryKey = ["products"];

  const { data, error } = await queryClient.fetchQuery({
    queryKey: queryKey,
    queryFn: () => getProducts(page, limit),
  });

  return { data, error };
};

export default useGetProducts;
