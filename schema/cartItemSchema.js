import { z } from "zod";

const ProductIdSchema = z
  .string({
    invalid_type_error: "Product ID is not a string.",
    required_error: "Missing product ID.",
  })
  .uuid({ message: "The product ID is not an UUID." });

const VariantIdSchema = z
  .string({
    invalid_type_error: "Product variant ID is not a string.",
    required_error: "Missing product variant ID.",
  })
  .uuid({ message: "The product variant ID is not an UUID." });

const QuantitySchema = z
  .number({
    invalid_type_error: "Quantity is not a number.",
    required_error: "Missing quantity.",
  })
  .int({ message: "The quantity is not an integer." })
  .positive({ message: "The quantity is smaller than 1." });

const cartItemSchema = z.object({
  product_id: ProductIdSchema,
  variant_id: VariantIdSchema,
  quantity: QuantitySchema,
});

module.exports = cartItemSchema;
