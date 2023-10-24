import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { ApiError } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";
import cartItemSchema from "@/schema/cartItemSchema";
import { checkCartExistence } from "../../checkCartExistence";
import transformedZodErrors from "@/utils/zod-utils";

export async function POST(request, context) {
  try {
    const cartId = context.params.cartId;
    const supabase = createRouteHandlerClient({ cookies });
    // Check cart existence
    const cartExisted = await checkCartExistence(supabase, cartId);
    if (!cartExisted)
      throw new ApiError(400, "Cart does not exist or insufficent rights!");
    // Verify request body
    let cartItem = await request.json();
    const result = cartItemSchema.safeParse(cartItem);
    if (result.error) throw transformedZodErrors(result.error);
    else cartItem = result.data;
    // Add cart item to cart
    cartItem = { cart_id: cartId, ...cartItem };
    const { data, error } = await supabase
      .from("cart_item")
      .insert(cartItem)
      .select()
      .maybeSingle();
    if (error) {
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    }
    // Return a response

    return NextResponse.json({
      error: null,
      data: { cart_item: data },
      status: 200,
      message: "Add an item to cart successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode }
    );
  }
}
