import getQueryClient from "@/utils/getQueryClient";

const API_URL = process.env.NEXT_PUBLIC_LOCATION_API;

const getUser = async (userId) => {
  const options = { next: { revalidate: 0 } };

  const res = await fetch(`${API_URL}/users/${userId}`, options);
  const result = await res.json();

  if (result.error) throw new Error(result.error.message);
  return result.data;
};

const useFetchUser = async (userId) => {
  const queryClient = getQueryClient();
  const queryKey = ["user"];

  return await queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: async () => await getUser(userId),
  });
};

export default useFetchUser;
