import getQueryClient from "@/utils/getQueryClient";

const API_URL = process.env.NEXT_PUBLIC_LOCATION_API;

const getProducts = async (page = 0, limit = 10) => {
  const options = {
    next: { revalidate: 0 },
  };
  const res = await fetch(
    `${API_URL}/products?page=${page}&limit=${limit}`,
    options,
  );
  const result = await res.json();
  return result;
};

const useGetProducts = async (page = 0, limit = 10) => {
  const queryClient = getQueryClient();

  const queryKey = ["products", { page: page }];

  return await queryClient.fetchQuery({
    queryKey: queryKey,
    queryFn: () => getProducts(page, limit),
  });
};

export default useGetProducts;
