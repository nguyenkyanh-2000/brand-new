import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./useToast";
import { useRouter } from "next/navigation";

async function loginWithEmail(data) {
  const url = new URL(
    "/api/auth/login",
    process.env.NEXT_PUBLIC_LOCATION_ORIGIN
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
    mutationFn: ({ email, password }) => loginWithEmail({ email, password }),
    onSuccess: (data) => {
      toast({
        title: `Welcome back, ${data.user.first_name}.`,
        description: "Login successfully!",
      });
      queryClient.setQueryData("user", data);
      router.push("/");
    },
    onError: (error) => {
      toast({ title: "Error!", description: `${error.message}` });
    },
  });

  return { login, isLoading };
}
