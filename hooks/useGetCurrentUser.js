import { useQuery } from "@tanstack/react-query";
import { getCurrentUser as getExistingUser } from "@/utils/supabase-auth-utils";
import getQueryClient from "@/utils/getQueryClient";

const API_URL = process.env.NEXT_PUBLIC_LOCATION_API;

const getCurrentUser = async () => {
  const currentUser = await getExistingUser();
  const options = { next: { revalidate: 0 } };
  const res = await fetch(`${API_URL}/users/${currentUser.id}`, options);
  const result = await res.json();

  if (result.error) throw new Error(result.error.message);
  return result.data;
};

const useFetchCurrentUser = async () => {
  const queryKey = ["user"];
  const queryClient = getQueryClient();

  return await queryClient.fetchQuery({
    queryKey: queryKey,
    queryFn: () => getCurrentUser(),
  });
};

export default useFetchCurrentUser;
