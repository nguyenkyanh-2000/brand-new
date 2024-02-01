const z = require("zod");

const EmailSchema = z
  .string()
  .email({ message: "The input value is not an email." });

const forgotPasswordSchema = z
  .object({
    email: EmailSchema,
  })
  .strict();

module.exports = forgotPasswordSchema;
