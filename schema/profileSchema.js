const z = require("zod");

const validGenders = ["male", "female", "other", null, undefined, ""];

const FirstNameSchema = z.string({
  invalid_type_error: "The input first name is not a string.",
  required_error: "Missing first name.",
});

const LastNameSchema = z.string({
  invalid_type_error: "The input last name is not a string.",
  required_error: "Missing last name.",
});

const AddressSchema = z.string({
  invalid_type_error: "The input address is not a string.",
  required_error: "Missing address.",
});

const DeliveryNote = z.string().nullable();

const DateOfBirthSchema = z.coerce
  .date({
    invalid_type_error: "The input is not a date.",
    required_error: "Missing date of birth.",
  })
  .nullable()
  .refine((date) => {
    if (date === null || date === undefined) {
      return true; // Allow null and undefined values
    }
    const currentDate = new Date();
    const minDate = new Date("1960-01-01");
    return date <= currentDate && date >= minDate;
  }, "Invalid date of birth.");

const GenderSchema = z
  .enum(validGenders, {
    errorMap: (issue, ctx) => ({ message: "Invalid gender." }),
  })
  .nullable();
const CountrySchema = z
  .string({
    invalid_type_error: "The input country is not a string.",
    required_error: "Missing country.",
  })
  .nullable();

const ProvinceSchema = z
  .string({
    invalid_type_error: "The input province is not a string.",
    required_error: "Missing province.",
  })
  .nullable();

const CitySchema = z
  .string({
    invalid_type_error: "The input city is not a string.",
    required_error: "Missing city.",
  })
  .nullable();

const HouseNumberSchema = z
  .string({
    invalid_type_error: "The input house number is not a string.",
    required_error: "Missing house number.",
  })
  .nullable();

const StreetSchema = z
  .string({
    invalid_type_error: "The input street is not a string.",
    required_error: "Missing street.",
  })
  .nullable();

const PhoneNumberSchema = z
  .string()
  .nullable()
  .refine((value) => /^\d{11}$/.test(value), {
    message:
      "Invalid phone number. Please add an 11-digit number with country code (e.g 00123456789).",
  });

const profileSchema = z
  .object({
    first_name: FirstNameSchema,
    last_name: LastNameSchema,
    home_address: AddressSchema,
    delivery_note: DeliveryNote,
    date_of_birth: DateOfBirthSchema,
    gender: GenderSchema,
    country: CountrySchema,
    province: ProvinceSchema,
    city: CitySchema,
    house_number: HouseNumberSchema,
    street: StreetSchema,
    phone_number: PhoneNumberSchema,
  })
  .strict();

module.exports = profileSchema;
