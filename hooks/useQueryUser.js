import { useQuery } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_LOCATION_API;

const getUser = async (userId) => {
  const options = { next: { revalidate: 0 } };
  const res = await fetch(`${API_URL}/users/${userId}`, options);
  const result = await res.json();

  if (result.error) throw new Error(result.error.message);
  return result.data;
};

const useQueryUser = (userId) => {
  const queryKey = ["user"];

  return useQuery({
    queryKey: queryKey,
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });
};

export default useQueryUser;
