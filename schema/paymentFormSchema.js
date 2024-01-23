import { z } from "zod";

const PaymentFormSchema = z.object({
  name: z.string().min(1).max(255),
  number: z.string().refine((val) => /^\d{4} \d{4} \d{4} \d{4}$/.test(val), {
    message: "Card number must be a 16-digit number.",
  }),
  month: z.string().refine((val) => /^[1-9]|1[0-2]$/.test(val), {
    message: "Invalid month",
  }),
  year: z
    .string()
    .refine(
      (val) =>
        /^\d{4}$/.test(val) && parseInt(val, 10) >= new Date().getFullYear(),
      {
        message: "Invalid year",
      },
    ),
  cvc: z.string().refine((val) => /^\d{3}$/.test(val), {
    message: "CVC must be a 3-digit number",
  }),
});

export default PaymentFormSchema;
