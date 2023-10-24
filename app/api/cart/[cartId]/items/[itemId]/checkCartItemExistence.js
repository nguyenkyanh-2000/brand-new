import { ApiError } from "next/dist/server/api-utils";

export async function checkCartItemExistence(supabase, cartItemId) {
  const { data, error } = await supabase
    .from("cart_item")
    .select("id")
    .eq("id", cartItemId);

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
