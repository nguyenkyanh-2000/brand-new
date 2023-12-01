import getQueryClient from "@/utils/getQueryClient";

const API_URL = process.env.NEXT_PUBLIC_LOCATION_API;

const getProduct = async (productId) => {
  const options = {
    next: { revalidate: 0 },
  };

  const res = await fetch(`${API_URL}/products/${productId}`, options);
  const result = await res.json();
  return result;
};

const useGetProduct = async (productId) => {
  const queryClient = getQueryClient();

  const queryKey = ["product"];

  return await queryClient.fetchQuery({
    queryKey: queryKey,
    queryFn: () => getProduct(productId),
  });
};

export default useGetProduct;
