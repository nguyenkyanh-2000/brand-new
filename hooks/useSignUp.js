import { useRouter } from "next/navigation";
import { useToast } from "./useToast";
import { useMutation } from "@tanstack/react-query";

async function register(data) {
  const url = new URL(
    "/api/auth/register",
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

export default function useSignUp() {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: signUp, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => register({ email, password }),
    onSuccess: (data) => {
      toast({
        title: `Welcome onboard!`,
        description: "Register successfully!",
      });
      router.push("/auth/login");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error!",
        description: `${error.message}`,
      });
    },
  });

  return { signUp, isLoading };
}
