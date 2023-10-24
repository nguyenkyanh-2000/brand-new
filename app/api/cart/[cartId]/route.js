import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { ApiError } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";
import { calculateTotal, getCartItem, updateSubtotal } from "./cartLogic";

export async function GET(request, context) {
  try {
    const cartId = context.params.cartId;
    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase
      .from("cart")
      .select(`id, cart_item (*)`)
      .eq("id", cartId)
      .maybeSingle();

    if (!data)
      throw new ApiError(400, "Not sufficient rights or cart does not exist!");

    if (error) {
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    }

    let cart_items = await Promise.all(
      data.cart_item.map(async (item) => await getCartItem(supabase, item))
    );

    const total = calculateTotal(cart_items);

    cart_items = updateSubtotal(cart_items);

    return NextResponse.json({
      error: null,
      data: {
        cart: { id: cartId, cart_items: cart_items, total: total },
      },
      status: 200,
      message: "Get cart and cart items successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode }
    );
  }
}
