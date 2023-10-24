import { ApiError } from "next/dist/server/api-utils";

export async function checkProductExistence(supabase, productId) {
  const { data, error } = await supabase
    .from("product")
    .select("id")
    .eq("id", productId);

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
