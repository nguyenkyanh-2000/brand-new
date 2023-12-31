import { z } from "zod";

const productVariantSchema = z
  .object({
    name: z
      .string({
        invalid_type_error: "The variant name is not a string!",
        required_error: "Missing variant name.",
      })
      .min(1, { message: "Variant name is required." }),

    amount_left: z.coerce
      .number({
        invalid_type_error: "The amount in stock is not a number!",
        required_error: "Missing amount in stock.",
      })
      .min(0, {
        message: "The amount in stock must be greater than or equal to 0.",
      }),

    price: z.coerce
      .number({
        invalid_type_error: "Wrong type of data for price.",
        required_error: "Missing price for the product.",
      })
      .positive("The price for the product is incorrect."),

    color: z
      .string({
        invalid_type_error: "The color is not a string!",
        required_error: "Missing color.",
      })
      .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
        message:
          "Invalid color format. Expected a valid hexadecimal color code (e.g., #FFA500).",
      }),
  })
  .strict();

export default productVariantSchema;
