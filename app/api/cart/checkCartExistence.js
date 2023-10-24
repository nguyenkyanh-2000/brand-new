import { ApiError } from "next/dist/server/api-utils";

export async function checkCartExistence(supabase, cartId) {
  const { data, error } = await supabase
    .from("cart")
    .select("id")
    .eq("id", cartId);

  if (error) {
    if (!error.status) error.status = 400;
    throw new ApiError(error.status, error.message);
  }

  if (data && data.length > 0) {
    return true;
  } else {
    return false;
  }
}
