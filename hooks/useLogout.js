import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./useToast";
import { useRouter } from "next/navigation";

async function logoutHandler() {
  const url = new URL(
    "/api/auth/logout",
    process.env.NEXT_PUBLIC_LOCATION_ORIGIN,
  );
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(url, options);
  const result = await res.json();
  if (result.error) throw new Error(result.error.message);
  return result.data;
}

export default function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationKey: ["user"],
    mutationFn: () => logoutHandler(),
    onSuccess: (data) => {
      toast({
        title: `See you soon!`,
        description: "Logout successfully!",
      });
      router.push("/");
      queryClient.setQueryData(["user"], null);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error!",
        description: `${error.message}`,
      });
    },
  });

  return { logout, isLoading };
}
