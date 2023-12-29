import { NextResponse } from "next/server";
import transformedZodErrors from "@/utils/zod-utils";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { ApiError } from "next/dist/server/api-utils";
import { v4, validate } from "uuid";
import CartItemSchema from "@/schema/cartItemSchema";

export async function GET(request, context) {
  try {
    const userId = context.params.userId;
    if (!validate(userId)) throw new ApiError(400, "Wrong user ID");
    const supabase = createRouteHandlerClient({ cookies });

    // Find out the cart of the user
    const { data: cartData, error: cartDataError } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (cartDataError) {
      if (cartDataError.code === "42501")
        throw new ApiError(401, "User do not have sufficient rights");
      if (!cartDataError.status) cartDataError.status = 400;
      throw new ApiError(cartDataError.status, cartDataError.message);
    }

    const { data, error } = await supabase
      .from("cart_item")
      .select("*, product_variant(*)")
      .eq("cart_id", cartData.id);

    if (error) {
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    }
    return NextResponse.json({
      error: null,
      data: { cart: data },
      status: 200,
      message: "Get the cart items successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode },
    );
  }
}

export async function DELETE(request, context) {
  try {
    const userId = context.params.userId;
    if (!validate(userId)) throw new ApiError(400, "Wrong user ID");
    const supabase = createRouteHandlerClient({ cookies });

    // Find out the cart of the user
    const { data: cartData, error: cartDataError } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (cartDataError) {
      if (cartDataError.code === "42501")
        throw new ApiError(401, "User do not have sufficient rights");
      if (!cartDataError.status) cartDataError.status = 400;
      throw new ApiError(cartDataError.status, cartDataError.message);
    }

    const { data, error } = await supabase
      .from("cart_item")
      .delete()
      .eq("cart_id", cartData.id);

    if (error) {
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    }
    return NextResponse.json({
      error: null,
      data: { cart: data },
      status: 200,
      message: "Delete all items from the cart successfully",
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
    const supabase = createRouteHandlerClient({ cookies });
    let newCart = await request.json();
    const userId = context.params.userId;
    if (!validate(userId)) throw new ApiError(400, "Wrong user ID");
    newCart.forEach((item) => {
      const result = CartItemSchema.safeParse(item);
      if (result.error) throw transformedZodErrors(result.error);
    });
    // Find out the cart_id of the user
    const { data: oldCartData, error: cartDataError } = await supabase
      .from("cart")
      .select("*, cart_item (*)")
      .eq("user_id", userId)
      .maybeSingle();

    if (cartDataError) {
      if (cartDataError.code === "42501")
        throw new ApiError(401, "User do not have sufficient rights");
      if (!cartDataError.status) cartDataError.status = 400;
      throw new ApiError(cartDataError.status, cartDataError.message);
    }

    // Add cartId to newCart
    newCart = newCart.map((item) => ({ ...item, cart_id: oldCartData.id }));
    // Merge cart
    let mergedCart = [...oldCartData.cart_item];
    newCart.forEach((newCartItem) => {
      const existingItemIndex = mergedCart.findIndex(
        (item) => item.variant_id === newCartItem.variant_id,
      );

      if (existingItemIndex !== -1) {
        // If the item exists in the old cart, update the quantity
        mergedCart[existingItemIndex].quantity = newCartItem.quantity;
      } else {
        // If the item is not in the old cart, add it to the merged cart
        mergedCart.push(newCartItem);
      }
    });

    mergedCart = mergedCart.map((item) => {
      if (!item.id) return { ...item, id: v4() };
      return item;
    });

    const { data, error } = await supabase
      .from("cart_item")
      .upsert(mergedCart, {
        ignoreDuplicates: false,
        onConflict: "id",
      })
      .eq("cart_id", oldCartData.id)
      .select(`*, product_variant(*)`);

    // User do not have sufficient rights to edit the products.
    if (error) {
      if (error.code === "42501")
        throw new ApiError(401, "User do not have sufficient rights");
      if (!error.status) error.status = 400;
      throw new ApiError(error.status, error.message);
    }
    return NextResponse.json({
      error: null,
      data: { cart: data },
      status: 200,
      message: "Add items to cart successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.statusCode },
    );
  }
}
