import { z } from "zod";

const productVariantSchema = z
  .object({
    variant_name: z
      .string({
        invalid_type_error: "The variant name is not a string!",
        required_error: "Missing variant name.",
      })
      .min(1, { message: "Variant name is required." }),

    amount_left: z
      .number({
        invalid_type_error: "The amount left is not a number!",
        required_error: "Missing amount left.",
      })
      .min(0, { message: "Amount left must be greater than or equal to 0." }),

    image_url: z
      .string({
        invalid_type_error: "The image URL is not a string!",
        required_error: "Missing image URL.",
      })
      .min(1, { message: "Image URL is required." })
      .optional(),
  })
  .strict();

export default productVariantSchema;
