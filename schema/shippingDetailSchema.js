const z = require("zod");

const FirstNameSchema = z
  .string({
    invalid_type_error: "The input first name is not a string.",
    required_error: "First name is required.",
  })
  .min(1, { message: "First name is required." });

const LastNameSchema = z
  .string({
    invalid_type_error: "The input last name is not a string.",
    required_error: "Last name is required.",
  })
  .min(1, { message: "Last name is required." });

const AddressSchema = z
  .string({
    invalid_type_error: "The input address is not a string.",
    required_error: "Address is required.",
  })
  .min(1, { message: "Address is required." });

const DeliveryNoteSchema = z.string({
  invalid_type_error: "The input address is not a string.",
  required_error: "Delivery note is required.",
});

const CountrySchema = z
  .string({
    invalid_type_error: "The input country is not a string.",
    required_error: "Country is required.",
  })
  .min(1, { message: "Country is required." });

const ProvinceSchema = z
  .string({
    invalid_type_error: "The input province is not a string.",
    required_error: "Province is required.",
  })
  .min(1, { message: "Province is required." });

const CitySchema = z
  .string({
    invalid_type_error: "The input city is not a string.",
    required_error: "City is required.",
  })
  .min(1, { message: "City is required." });

const HouseNumberSchema = z
  .string({
    invalid_type_error: "The input house number is not a string.",
    required_error: "House number is required.",
  })
  .min(1, { message: "House number is required." });

const StreetSchema = z
  .string({
    invalid_type_error: "The input street is not a string.",
    required_error: "Street is required.",
  })
  .min(1, { message: "Street is required." });

const PhoneNumberSchema = z
  .string()
  .nullable()
  .refine((value) => /^\d{11}$/.test(value), {
    message:
      "Invalid phone number. Please add an 11-digit number with country code (e.g 00123456789).",
  });

const shippingDetailSchema = z
  .object({
    first_name: FirstNameSchema,
    last_name: LastNameSchema,
    home_address: AddressSchema,
    delivery_note: DeliveryNoteSchema,
    country: CountrySchema,
    province: ProvinceSchema,
    city: CitySchema,
    house_number: HouseNumberSchema,
    street: StreetSchema,
    phone_number: PhoneNumberSchema,
  })
  .strict();

module.exports = shippingDetailSchema;
