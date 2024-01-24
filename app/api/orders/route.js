import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import orderSchema from "@/schema/orderDetailSchema";
import transformedZodErrors from "@/utils/zod-utils";
import { ApiError } from "next/dist/server/api-utils";

export async function POST(request, context) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    let order = await request.json();
    // Validation
    const result = orderSchema.safeParse(order);
    if (result.error) throw transformedZodErrors(result.error);
    else order = result.data;

    // Calculate total amount from the items in the new order
    const totalAmount = order.cart_items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    // Insert a new (unpaid) order into DB
    const { cart_items, ...rest } = order;
    const { data: insertedOrder, error: insertOrderError } = await supabase
      .from("order")
      .insert({ total_amount: totalAmount, ...rest })
      .select("*")
      .single();

    if (insertOrderError) {
      if (insertOrderError.code === "42501")
        throw new ApiError(401, "User do not have sufficient rights");
      if (!insertOrderError.status) cartDataError.status = 400;
      throw new ApiError(cartDataError.status, cartDataError.message);
    }

    // Insert ordered items into order with ID from the DB (cart items => order items)
    const items = order.cart_items.map((item) => {
      const { id, quantity, original_price, price } = item;
      return {
        order_id: insertedOrder.id,
        variant_id: id,
        quantity: quantity,
        original_price: original_price,
        price: price,
      };
    });

    const { error: insertOrderItemsError } = await supabase
      .from("order_item")
      .insert(items)
      .select("*");

    if (insertOrderItemsError) {
      if (insertOrderItemsError.code === "42501")
        throw new ApiError(401, "User do not have sufficient rights");
      if (!insertOrderItemsError.status) cartDataError.status = 400;
      throw new ApiError(cartDataError.status, cartDataError.message);
    }

    return NextResponse.json({
      error: null,
      data: { order: insertedOrder },
      status: 200,
      message: "Add a new order successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode },
    );
  }
}
