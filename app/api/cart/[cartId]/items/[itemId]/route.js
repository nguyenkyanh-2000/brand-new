import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { ApiError } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";
import cartItemSchema from "@/schema/cartItemSchema";
import { checkCartExistence } from "../../../checkCartExistence";
import { checkCartItemExistence } from "./checkCartItemExistence";
import transformedZodErrors from "@/utils/zod-utils";

export async function PUT(request, context) {
  try {
    const cartId = context.params.cartId;
    const itemId = context.params.itemId;
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
    //Update cart item in cart
    cartItem = { cart_id: cartId, ...cartItem };
    const { data, error } = await supabase
      .from("cart_item")
      .update(cartItem)
      .eq("id", itemId)
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
      message: "Update an item in the cart successfully.",
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
    const cartId = context.params.cartId;
    const itemId = context.params.itemId;
    const supabase = createRouteHandlerClient({ cookies });
    // Check cart existence
    const cartExisted = await checkCartExistence(supabase, cartId);
    if (!cartExisted)
      throw new ApiError(400, "Cart does not exist or insufficent rights!");
    // Check cart item existence
    const cartItemExisted = await checkCartItemExistence(supabase, cartId);
    if (!cartItemExisted) throw new ApiError(400, "Cart item does not exist!");
    //Update cart item in cart
    const { data, error } = await supabase
      .from("cart_item")
      .delete()
      .eq("id", itemId)
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
      message: "Remove an item from the cart successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode }
    );
  }
}
