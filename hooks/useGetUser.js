import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_LOCATION_API;

const getUser = async (userId) => {
  const options = {};
  const res = await fetch(`${API_URL}/users/${userId}`, options);
  const result = await res.json();

  if (result.error) throw new Error(result.error.message);
  return result.data;
};

const useGetUser = (userId) => {
  const queryKey = ["user"];

  return useQuery({
    queryKey: queryKey,
    queryFn: async () => await getUser(userId),
    enabled: !!userId,
  });
};

export default useGetUser;
