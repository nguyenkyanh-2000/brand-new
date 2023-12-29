import { z } from "zod";

const CartItemSchema = z.object({
  variant_id: z
    .string({
      required_error: "Variant ID is required",
      invalid_type_error: "Variant ID is not a string",
    })
    .uuid({ message: "Variant ID must be a valid UUID string" }),
  quantity: z
    .number()
    .int()
    .min(0, { message: "Quantity must be a non-negative integer" }),
});

export default CartItemSchema;
