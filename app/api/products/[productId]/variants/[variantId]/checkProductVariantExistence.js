import { ApiError } from "next/dist/server/api-utils";

export async function checkProductVariantExistence(supabase, variantId) {
  const { data, error } = await supabase
    .from("product_variant")
    .select("id")
    .eq("id", variantId);

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
