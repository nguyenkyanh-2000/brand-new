import { supabase } from "./supabaseServer";

export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase().auth.getUser();

  return user;
};

export const getCurrentSessionUser = async () => {
  const { data, error } = await supabase().auth.getSession();
  const { user } = data.session;
  console.log(user);
  return user;
};

export const isAdmin = async () => {
  const {
    data: { user },
  } = await supabase().auth.getUser();

  if (!user?.id) return false;

  const { data } = await supabase()
    .from("profile")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!data.is_admin) return false;
  return true;
};
