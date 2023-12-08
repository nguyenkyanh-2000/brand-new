import getQueryClient from "@/utils/getQueryClient";

const API_URL = process.env.NEXT_PUBLIC_LOCATION_API;

const getProducts = async (searchParams) => {
  const { page = 0, limit = 10, ...otherParams } = searchParams;

  const params = new URLSearchParams({ page, limit, ...otherParams });
  const searchParamsString = params.toString();

  console.log(searchParamsString);
  const options = {
    next: { revalidate: 0 },
  };

  const res = await fetch(`${API_URL}/products?${searchParamsString}`, options);
  const result = await res.json();
  return result;
};

const useGetProducts = async (searchParams) => {
  const queryClient = getQueryClient();

  const queryKey = ["products", searchParams];

  return await queryClient.fetchQuery({
    queryKey: queryKey,
    queryFn: () => getProducts(searchParams),
  });
};

export default useGetProducts;
