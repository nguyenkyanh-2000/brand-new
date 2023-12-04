import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ApiError } from "next/dist/server/api-utils";
import productVariantSchema from "@/schema/productVariantSchema";
import transformedZodErrors from "@/utils/zod-utils";

export async function GET(request, context) {
  try {
    const productId = context.params.productId;
    const supabase = createRouteHandlerClient({ cookies });
    const url = request.nextUrl;
    const searchParams = new URL(url).searchParams;
    let page = searchParams.get("page");
    let limit = searchParams.get("limit");
    // Ensure page and limit are numbers. Default: Page 1, limit 10
    page = Number(page) || 1;
    limit = Number(limit) || 10;
    const offset = (page - 1) * limit;
    const { data, count, error } = await supabase
      .from("product_variant")
      .select("*", { count: "estimated" })
      .eq("product_id", productId)
      .range(offset, offset + limit - 1)
      .order("created_at", { ascending: false });
    if (error) {
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    }
    return NextResponse.json({
      error: null,
      data: {
        product_variants: data,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
      },
      status: 200,
      message: "Get all variants for the product successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode },
    );
  }
}

export async function POST(request, context) {
  try {
    const productId = context.params.productId;
    const supabase = createRouteHandlerClient({ cookies });
    // Validate data
    let productVariant = await request.json();
    const result = productVariantSchema.safeParse(productVariant);
    if (result.error) throw transformedZodErrors(result.error);
    else productVariant = { product_id: productId, ...result.data };
    const { data, error } = await supabase
      .from("product_variant")
      .insert(productVariant)
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
      data: { product_variant: data },
      status: 200,
      message: "Upload a new variant for the product successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode },
    );
  }
}
