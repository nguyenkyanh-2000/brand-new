import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { ApiError } from "next/dist/server/api-utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { validate } from "uuid";

export async function GET(request, context) {
  try {
    const variantId = context.params.id;
    if (!validate(variantId)) throw new ApiError(400, "Variant ID is invalid.");
    const supabase = createRouteHandlerClient({ cookies });
    // Ensure page and limit are numbers. Default: Page 0, limit 10
    const { data, error } = await supabase
      .from("product_variant")
      .select("*, product (name, price)")
      .eq("id", variantId)
      .single();

    if (error) {
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    }

    return NextResponse.json({
      error: null,
      data: {
        product_variant: data,
      },
      status: 200,
      message: "Get the product variant successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode },
    );
  }
}
