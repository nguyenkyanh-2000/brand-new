import getQueryClient from "@/utils/getQueryClient";

const API_URL = process.env.NEXT_PUBLIC_LOCATION_API;

const useGetProducts = async (page = 0, limit = 10) => {
  const queryClient = getQueryClient();

  const getProducts = async () => {
    const res = await fetch(`${API_URL}/products?page=${page}&limit=${limit}`, {
      next: { revalidate: 0 },
    });
    const result = await res.json();
    return result;
  };

  const queryKey = ["products"];

  const { data, error, isLoading } = await queryClient.fetchQuery({
    queryKey: queryKey,
    queryFn: () => getProducts(page, limit),
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData("products", data.products);
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { data, error, isLoading };
};

export default useGetProducts;
