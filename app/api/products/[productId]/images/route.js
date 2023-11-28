import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ApiError } from "next/dist/server/api-utils";
import productImageSchema from "@/schema/productImageSchema";
import transformedZodErrors from "@/utils/zod-utils";
import { validate } from "uuid";

export async function GET(request, context) {
  try {
    const productId = context.params.productId;
    if (!validate(productId)) throw new ApiError(400, "Product ID is invalid.");
    const supabase = createRouteHandlerClient({ cookies });
    // Ensure page and limit are numbers. Default: Page 0, limit 10
    const { data, error } = await supabase
      .from("product_image")
      .select("*")
      .eq("product_id", productId);

    if (error) {
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    }

    return NextResponse.json({
      error: null,
      data: {
        product_images: data,
      },
      status: 200,
      message: "Get all images for the product successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode }
    );
  }
}

export async function POST(request, context) {
  try {
    const productId = context.params.productId;
    if (!validate(productId)) throw new ApiError(400, "Wrong product ID");
    const supabase = createRouteHandlerClient({ cookies });
    // Validate data
    let productImage = await request.json();
    const result = productImageSchema.safeParse(productImage);
    if (result.error) throw transformedZodErrors(result.error);
    else productImage = { product_id: productId, ...result.data };
    const { data, error } = await supabase
      .from("product_image")
      .insert(productImage)
      .select()
      .maybeSingle();
    if (error) {
      if (error.code === "42501")
        throw new ApiError(401, "User do not have sufficient rights");
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    }
    return NextResponse.json({
      error: null,
      data: { product_image: data },
      status: 200,
      message: "Upload a new image for the product successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode }
    );
  }
}
