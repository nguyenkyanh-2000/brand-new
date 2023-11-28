import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ApiError } from "next/dist/server/api-utils";
import productImageSchema from "@/schema/productImageSchema";
import transformedZodErrors from "@/utils/zod-utils";

export async function GET(request, context) {
  try {
    const imageId = context.params.imageId;
    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase
      .from("product_image")
      .select("*")
      .eq("id", imageId)
      .maybeSingle();
    if (!data) throw new ApiError(400, "Product image does not exist!");
    if (error) {
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    }
    return NextResponse.json({
      error: null,
      data: { product_image: data },
      status: 200,
      message: "Get the product's image successfully.",
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
    const imageId = context.params.imageId;
    const productId = context.params.productId;
    const supabase = createRouteHandlerClient({ cookies });

    // Validate data
    let productImage = await request.json();
    const result = productImageSchema.safeParse(productImage);
    if (result.error) throw transformedZodErrors(result.error);
    else productImage = { product_id: productId, ...result.data };
    const { data, error } = await supabase
      .from("product_image")
      .update(productImage)
      .eq("id", imageId)
      .select()
      .maybeSingle();
    if (!data) throw new ApiError(400, "Product image does not exist!");
    if (error) {
      if (error?.code === "42501")
        throw new ApiError(401, "User do not have sufficient rights");
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    }
    return NextResponse.json({
      error: null,
      data: { product_image: data },
      status: 200,
      message: "Update the image for the product successfully.",
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
    const imageId = context.params.imageId;
    const productId = context.params.productId;
    const supabase = createRouteHandlerClient({ cookies });
    //Delete result from the table
    const { data, error } = await supabase
      .from("product_image")
      .delete()
      .eq("id", imageId)
      .select()
      .maybeSingle();

    if (error) {
      if (error?.code === "42501")
        throw new ApiError(401, "User do not have sufficient rights");
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    }
    if (!data) throw new ApiError(400, "Product image does not exist!");
    // Delete file name "imageId" in folder "productId"
    const storageAction = await supabase.storage
      .from("product_image")
      .remove([productId + "/" + imageId]);

    if (storageAction.error) {
      if (!storageAction.error.status) storageAction.error = 400;
      throw new ApiError(
        storageAction.error.status,
        storageAction.error.message
      );
    }

    return NextResponse.json({
      error: null,
      data: { product_image: data },
      status: 200,
      message: "Delete the product's image successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode }
    );
  }
}
