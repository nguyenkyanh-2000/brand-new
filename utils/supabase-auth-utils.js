import supabaseServer from "./supabaseServer";

export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabaseServer().auth.getUser();

  return user;
};

export const isAdmin = async () => {
  const {
    data: { user },
  } = await supabaseServer().auth.getUser();

  if (!user?.id) return false;

  const { data } = await supabaseServer()
    .from("profile")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!data.is_admin) return false;
  return true;
};
