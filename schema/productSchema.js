import { z } from "zod";

const validCategories = ["furniture", "clothing", "cosmetic", "stationery"];
const validBadges = ["editor's choice", "best sellers", "new price", "popular"];

const productSchema = z
  .object({
    name: z
      .string({
        invalid_type_error: "Wrong type of data for product name.",
        required_error: "Missing name for the product.",
      })
      .min(1, { message: "Missing name for the product" }),
    description: z
      .string({
        invalid_type_error: "Wrong type of data for product description.",
        required_error: "Missing description for the product.",
      })
      .min(1, { message: "Missing description for the product." }),
    price: z.coerce
      .number({
        invalid_type_error: "Wrong type of data for price.",
        required_error: "Missing price for the product.",
      })
      .positive("The price for the product is incorrect."),
    category: z.enum(validCategories, {
      invalid_enum_error: "Invalid category for the product.",
      required_error: "Missing category for the product.",
    }),
    badge: z
      .enum(validBadges, {
        invalid_enum_error: "Invalid badge for the product.",
      })
      .nullable(),
    keywords: z.array(z.string()).nullable().optional(),
  })
  .strict();

export default productSchema;
