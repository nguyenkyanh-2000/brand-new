import { useQuery } from "@tanstack/react-query";

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

const useQueryProduct = (productId) => {
  const queryKey = ["product", { id: productId }];

  return useQuery({
    queryKey: queryKey,
    queryFn: async () => await getProduct(productId),
  });
};

export default useQueryProduct;
