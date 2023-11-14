const z = require("zod");

const EmailSchema = z
  .string()
  .email({ message: "The input value is not an email." });
const PasswordSchema = z.string({
  invalid_type_error: "Wrong type of data for password.",
  required_error: "Missing password.",
});

const credentialSchema = z
  .object({
    email: EmailSchema,
    password: PasswordSchema,
  })
  .strict();

module.exports = credentialSchema;
