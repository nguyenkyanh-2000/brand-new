import { useQuery } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_LOCATION_API;

const getProductVariant = async (variantId) => {
  const options = {
    next: { revalidate: 0 },
  };
  const res = await fetch(`${API_URL}/product_variants/${variantId}`, options);
  const result = await res.json();
  if (result.error) throw new Error(result.error.message);
  return result.data;
};

const useQueryProductVariant = (variantId) => {
  const queryKey = ["variant", { id: variantId }];

  return useQuery({
    queryKey: queryKey,
    queryFn: async () => await getProductVariant(variantId),
  });
};

export default useQueryProductVariant;
