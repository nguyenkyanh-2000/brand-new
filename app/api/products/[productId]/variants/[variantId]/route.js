import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ApiError } from "next/dist/server/api-utils";
import { checkProductExistence } from "../../checkProductExistence";
import { checkProductVariantExistence } from "./checkProductVariantExistence";
import productVariantSchema from "@/schema/productVariantSchema";
import transformedZodErrors from "@/utils/zod-utils";

export async function GET(request, context) {
  try {
    const variantId = context.params.variantId;
    const productId = context.params.productId;
    const supabase = createRouteHandlerClient({ cookies });
    // Check if the product exists
    const productExisted = await checkProductExistence(supabase, productId);
    if (!productExisted) throw new ApiError(400, "Product does not exist!");
    // Check if the product variant exists
    const productVariantExisted = await checkProductVariantExistence(
      supabase,
      variantId
    );
    if (!productVariantExisted)
      throw new ApiError(400, "Product variant does not exist!");
    const { data, error } = await supabase
      .from("product_variant")
      .select("*")
      .eq("id", variantId)
      .maybeSingle();
    if (error) {
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    }
    return NextResponse.json({
      error: null,
      data: { product_variant: data },
      status: 200,
      message: "Get the product variant successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode }
    );
  }
}

export async function PUT(request, context) {
  try {
    const variantId = context.params.variantId;
    const productId = context.params.productId;
    const supabase = createRouteHandlerClient({ cookies });
    // Check if the product exists
    const productExisted = await checkProductExistence(supabase, productId);
    if (!productExisted) throw new ApiError(400, "Product does not exist!");
    // Check if the product variant exists
    const productVariantExisted = await checkProductVariantExistence(
      supabase,
      variantId
    );
    if (!productVariantExisted)
      throw new ApiError(400, "Product variant does not exist!");
    // Validate data
    let productVariant = await request.json();
    const result = productVariantSchema.safeParse(productVariant);
    if (result.error) throw transformedZodErrors(result.error);
    else productVariant = { product_id: productId, ...result.data };
    const { data, error } = await supabase
      .from("product_variant")
      .update(productVariant)
      .eq("id", variantId)
      .select("*")
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
      message: "Update a variant for the product successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode }
    );
  }
}

export async function DELETE(request, context) {
  try {
    const variantId = context.params.variantId;
    const productId = context.params.productId;
    const supabase = createRouteHandlerClient({ cookies });
    // Check if the product exists
    const productExisted = await checkProductExistence(supabase, productId);
    if (!productExisted) throw new ApiError(400, "Product does not exist!");
    // Check if the product variant exists
    const productVariantExisted = await checkProductVariantExistence(
      supabase,
      variantId
    );
    if (!productVariantExisted)
      throw new ApiError(400, "Product variant does not exist!");
    const { data, error } = await supabase
      .from("product_variant")
      .delete()
      .eq("id", variantId)
      .select()
      .maybeSingle();
    if (error) {
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    }
    return NextResponse.json({
      error: null,
      data: { product_variant: data },
      status: 200,
      message: "Delete the product variant successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode }
    );
  }
}
