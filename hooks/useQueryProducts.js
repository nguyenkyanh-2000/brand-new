import { useQuery } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_LOCATION_API;

const getProducts = async (searchParams) => {
  const { page = 0, limit = 10, ...otherParams } = searchParams;
  const params = new URLSearchParams({ page, limit, ...otherParams });
  const searchParamsString = params.toString();

  const options = {
    next: { revalidate: 0 },
  };

  const res = await fetch(`${API_URL}/products?${searchParamsString}`, options);
  const result = await res.json();
  if (result.error) throw new Error(result.error.message);
  return result.data;
};

const useQueryProducts = (searchParams) => {
  const queryKey = ["products", searchParams];

  return useQuery({
    queryKey: queryKey,
    queryFn: async () => await getProducts(searchParams),
    enabled: !!searchParams,
  });
};

export default useQueryProducts;
