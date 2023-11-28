import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const ImageSchema = z
  .object({
    image: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only .jpg, .jpeg, .png and .webp files are accepted."
      ),
    description: z
      .string({
        invalid_type_error: "The image description is not a string!",
        required_error: "Missing image description.",
      })
      .min(1, { message: "Image description is required." }),
  })
  .strict();
