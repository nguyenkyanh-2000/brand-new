import getQueryClient from "@/utils/getQueryClient";

const API_URL = process.env.NEXT_PUBLIC_LOCATION_API;

const getProduct = async (productId) => {
  const options = {
    next: { revalidate: 0 },
  };

  const res = await fetch(`${API_URL}/products/${productId}`, options);
  const result = await res.json();
  if (result.error) throw new Error(result.error.message);
  return result.data;
};

const useFetchProduct = async (productId) => {
  const queryClient = getQueryClient();
  const queryKey = ["product", { id: productId }];
  return await queryClient.fetchQuery({
    queryKey: queryKey,
    queryFn: async () => await getProduct(productId),
  });
};

export default useFetchProduct;
