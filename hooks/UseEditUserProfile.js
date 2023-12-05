import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./useToast";

const editUserProfileHandler = async (userId, data) => {
  const url = new URL(
    `/api/users/${userId}`,
    process.env.NEXT_PUBLIC_LOCATION_ORIGIN,
  );
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const res = await fetch(url, options);
  const result = await res.json();

  if (result.error) throw new Error(result.error.message);

  return result;
};

const useEditUserProfile = (userId) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const queryKey = ["user"];

  return useMutation({
    mutationKey: queryKey,
    mutationFn: ({ data }) => editUserProfileHandler(userId, data),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      toast({
        title: `Your profile is updated.`,
        description: "Update successfully!",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error!",
        description: `${error.message}`,
      });
    },
  });
};

export default useEditUserProfile;
