import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const useUserAuthentication = async () => {
  const supabase = createServerComponentClient({ headers, cookies });

  const checkUserAndRedirect = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/auth/login");
    }
  };

  return checkUserAndRedirect;
};

export default useUserAuthentication;
