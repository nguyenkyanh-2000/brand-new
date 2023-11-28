import { z } from "zod";

const productImageSchema = z
  .object({
    id: z
      .string({
        invalid_type_error: "The image ID is not a string!",
        required_error: "Missing image ID.",
      })
      .uuid({ message: "The image ID is not an UUID!" }),
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
