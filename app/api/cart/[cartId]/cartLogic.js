import { ApiError } from "next/dist/server/api-utils";

export async function getCartItem(supabase, cartItem) {
  const variantId = cartItem.variant_id;

  const { data, error } = await supabase
    .from("product_variant")
    .select(`*, product (*)`)
    .eq("id", variantId)
    .maybeSingle();

  if (error) {
    if (!error.status) error.status = 400;
    throw new ApiError(error.status, error.message);
  }

  return { ...cartItem, ...data };
}

// Calculate the subtotal cost for each part of the cart
export function updateSubtotal(cartItems) {
  const updatedCartItems = cartItems.map((item) => {
    const subtotal = Number((item.product.price * item.quantity).toFixed(2));
    return { ...item, subtotal: subtotal };
  });

  return updatedCartItems;
}

export function calculateTotal(cartItems) {
  let total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  total = Number(total.toFixed(2));
  return total;
}
