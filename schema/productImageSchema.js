import { z } from "zod";

const productImageSchema = z
  .object({
    url: z
      .string({
        invalid_type_error: "The image URL is not a string!",
        required_error: "Missing image URL.",
      })
      .min(1, { message: "Image URL is required." }),
    description: z
      .string({
        invalid_type_error: "The image description is not a string!",
        required_error: "Missing image description.",
      })
      .min(1, { message: "Image description is required." }),
  })
  .strict();

export default productImageSchema;
