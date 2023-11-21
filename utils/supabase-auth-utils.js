import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

export const isUser = async () => {
  const supabase = createServerComponentClient({ headers, cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;
  return true;
};

export const isAdmin = async () => {
  const supabase = createServerComponentClient({ headers, cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) return false;

  const { data } = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!data.is_admin) return false;
  return true;
};
