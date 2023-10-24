import { ApiError } from "next/dist/server/api-utils";

export async function checkProductImageExistence(supabase, imageId) {
  const { data, error } = await supabase
    .from("product_image")
    .select("id")
    .eq("id", imageId);

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
