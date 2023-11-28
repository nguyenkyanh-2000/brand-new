import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ApiError } from "next/dist/server/api-utils";
import productSchema from "@/schema/productSchema";
import transformedZodErrors from "@/utils/zod-utils";
import { validate } from "uuid";

export async function GET(request, context) {
  try {
    const productId = context.params.productId;
    if (!validate(productId)) throw new ApiError(400, "Wrong product ID");
    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase
      .from("product")
      .select("*, product_image(*), product_variant(*)")
      .eq("id", productId)
      .maybeSingle();

    if (!data) throw new ApiError(400, "Product does not exist!");
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
    if (!validate(productId)) throw new ApiError(400, "Wrong product ID");
    // Request's body validation. Always return 400 error if invalid.
    let product = await request.json();
    const result = productSchema.safeParse(product);
    if (result.error) throw transformedZodErrors(result.error);
    else product = result.data;
    // Update the product
    const { data, error } = await supabase
      .from("product")
      .update(product)
      .eq("id", productId)
      .select()
      .maybeSingle();
    // Check product existence
    if (!data) throw new ApiError(400, "Product does not exist!");
    if (error) {
      if (error.code === "42501")
        throw new ApiError(401, "User do not have sufficient rights");
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
    const { data, error } = await supabase
      .from("product")
      .delete()
      .eq("id", productId)
      .select()
      .maybeSingle();
    if (!data) throw new ApiError(400, "Product does not exist!");
    if (error) {
      if (error.code === "42501")
        throw new ApiError(401, "User do not have sufficient rights");
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    }

    // Delete image folder "productId" in supabase storage
    // Hacky solution to delete a whole folder since supabase does not provide an innate method.
    const { data: list } = await supabase.storage
      .from("product_image")
      .list(`${productId}`);
    const filesToRemove = list.map((x) => `${productId}/${x.name}`);

    console.log(filesToRemove);

    const storageAction = await supabase.storage
      .from("product_image")
      .remove(filesToRemove);

    if (storageAction.error) {
      if (!storageAction.error.status) storageAction.error = 400;
      throw new ApiError(
        storageAction.error.status,
        storageAction.error.message
      );
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
