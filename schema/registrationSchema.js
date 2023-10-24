const z = require("zod");

const EmailSchema = z
  .string()
  .email({ message: "The input value is not an email." });

const PasswordSchema = z
  .string({
    invalid_type_error: "Wrong type of data for password.",
    required_error: "Missing password.",
  })
  .refine((value) => value.length > 6, {
    message: "Password must be longer than 6 characters.",
  });

const registrationSchema = z
  .object({
    email: EmailSchema,
    password: PasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

module.exports = registrationSchema;
