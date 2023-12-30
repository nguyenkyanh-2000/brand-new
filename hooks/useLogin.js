import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./useToast";
import { useRouter } from "next/navigation";

async function loginWithEmail(data) {
  const url = new URL(
    "/api/auth/login",
    process.env.NEXT_PUBLIC_LOCATION_ORIGIN,
  );
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const res = await fetch(url, options);
  const result = await res.json();
  if (result.error) throw new Error(result.error.message);
  return result.data;
}

export default function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: login, isPending: isLoading } = useMutation({
    mutationKey: ["user"],
    mutationFn: ({ email, password }) => loginWithEmail({ email, password }),
    onSuccess: (data) => {
      toast({
        title: `Welcome back!`,
        description: "Login successfully!",
      });
      queryClient.setQueryData(["user"], data);
      router.back();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error!",
        description: `${error.message}`,
      });
    },
  });

  return { login, isLoading };
}
