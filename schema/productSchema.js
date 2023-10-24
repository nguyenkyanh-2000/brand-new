import { z } from "zod";

const validCategories = ["furniture", "clothing", "cosmetic", "stationery"];

const productSchema = z
  .object({
    name: z.string({
      invalid_type_error: "Wrong type of data for product name.",
      required_error: "Missing name for the product.",
    }),
    description: z.string({
      invalid_type_error: "Wrong type of data for product description.",
      required_error: "Missing description for the product.",
    }),
    price: z.coerce.number({
      invalid_type_error: "Wrong type of data for price.",
      required_error: "Missing price for the product.",
    }),
    category: z.enum(validCategories, {
      invalid_enum_error: "Invalid category for the product.",
      required_error: "Missing category for the product.",
    }),
  })
  .strict();

export default productSchema;
