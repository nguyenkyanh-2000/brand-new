const z = require("zod");

const FirstNameSchema = z.string({
  invalid_type_error: "The input first name is not a string.",
  required_error: "Missing first name.",
});

const LastNameSchema = z.string({
  invalid_type_error: "The input last name is not a string.",
  required_error: "Missing last name.",
});

const AddressSchema = z.string({
  invalid_type_error: "The input name is not a string.",
  required_error: "Missing address.",
});

const DateOfBirthSchema = z.coerce
  .date({
    invalid_type_error: "The input is not a date.",
    required_error: "Missing date of birth.",
  })
  .refine(
    (date) => {
      const currentDate = new Date();
      const minDate = new Date("1900-01-01");
      return date <= currentDate && date >= minDate;
    },
    {
      message: "Invalid date of birth.",
    }
  );

const IsSubscribedSchema = z.boolean({
  invalid_type_error: "The input value is not a boolean.",
  required_error: "Missing value for subscription choice.",
});

const profileSchema = z
  .object({
    first_name: FirstNameSchema,
    last_name: LastNameSchema,
    home_address: AddressSchema,
    date_of_birth: DateOfBirthSchema,
    is_subscribed: IsSubscribedSchema,
  })
  .strict();

module.exports = profileSchema;
