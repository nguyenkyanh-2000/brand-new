import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ApiError } from "next/dist/server/api-utils";
import { checkProductExistence } from "../checkProductExistence";
import productImageSchema from "@/schema/productImageSchema";
import transformedZodErrors from "@/utils/zod-utils";
import { filterSearchParams } from "@/utils/searchparams-utils";

export async function GET(request, context) {
  try {
    const productId = context.params.productId;
    const supabase = createRouteHandlerClient({ cookies });
    // Filter search params
    const allowedParams = ["page", "limit"];
    const filteredParams = filterSearchParams(request.nextUrl, allowedParams);
    let { page, limit } = filteredParams;
    // Ensure page and limit are numbers. Default: Page 1, limit 10
    page = Number(page) || 1;
    limit = Number(limit) || 10;
    const offset = (page - 1) * limit;
    // Check if the product exists
    const productExisted = await checkProductExistence(supabase, productId);
    if (!productExisted) throw new ApiError(400, "Product does not exist!");
    const { data, count, error } = await supabase
      .from("product_image")
      .select("*", { count: "exact" })
      .eq("product_id", productId)
      .range(offset, offset + limit - 1);
    if (error) {
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    }
    return NextResponse.json({
      error: null,
      data: {
        product_images: data,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
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
    const supabase = createRouteHandlerClient({ cookies });
    // Check if the product exists
    const productExisted = await checkProductExistence(supabase, productId);
    if (!productExisted) throw new ApiError(400, "Product does not exist!");
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
    // User do not have sufficient rights to edit the products.
    if (error?.code === "42501")
      throw new ApiError(401, "User do not have sufficient rights");
    if (error) {
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
