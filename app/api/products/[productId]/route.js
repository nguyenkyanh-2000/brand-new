import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ApiError } from "next/dist/server/api-utils";
import productSchema from "@/schema/productSchema";
import transformedZodErrors from "@/utils/zod-utils";
import { checkProductExistence } from "./checkProductExistence";

export async function GET(request, context) {
  try {
    const productId = context.params.productId;
    const supabase = createRouteHandlerClient({ cookies });
    // Check if the product exists
    const productExisted = await checkProductExistence(supabase, productId);
    if (!productExisted) throw new ApiError(400, "Product does not exist!");
    const { data, error } = await supabase
      .from("product")
      .select("*")
      .eq("id", productId)
      .maybeSingle();
    if (error) {
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    }
    return NextResponse.json({
      error: null,
      data: { product: data },
      status: 200,
      message: "Get all products successfully",
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
    const productId = context.params.productId;
    const supabase = createRouteHandlerClient({ cookies });
    // Request's body validation. Always return 400 error if invalid.
    let product = await request.json();
    const result = productSchema.safeParse(product);
    if (result.error) throw transformedZodErrors(result.error);
    else product = result.data;
    // Check if the product exists
    const productExisted = await checkProductExistence(supabase, productId);
    if (!productExisted) throw new ApiError(400, "Product does not exist!");
    // Update the product
    const { data, error } = await supabase
      .from("product")
      .update(product)
      .eq("id", productId)
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
      data: { product: data },
      status: 200,
      message: "OK",
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
    const productId = context.params.productId;
    const supabase = createRouteHandlerClient({ cookies });
    // Check if the product exists
    const productExisted = await checkProductExistence(supabase, productId);
    if (!productExisted) throw new ApiError(400, "Product does not exist!");
    const { data, error } = await supabase
      .from("product")
      .delete()
      .eq("id", productId)
      .select()
      .maybeSingle();
    // User do not have sufficient rights to edit the products.
    console.log(data);
    if (error?.code === "42501")
      throw new ApiError(401, "User do not have sufficient rights");
    if (error) {
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    }
    return NextResponse.json({
      error: null,
      data: { product: data },
      status: 200,
      message: "OK",
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode }
    );
  }
}
