import { z } from "zod";

// Define the possible order statuses
const OrderStatusEnum = z.enum([
  "UNPAID",
  "PAID",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
]);

const OrderPaymentMethodEnum = z.enum(["CARD", "PAYPAL"]);

// Define the order payment schema
const OrderPaymentSchema = z
  .object({
    order_status: OrderStatusEnum.refine((value) => {
      if (!OrderStatusEnum.options.includes(value)) {
        throw new Error("Invalid order status.");
      }
      return true;
    }),
    payment_method: OrderPaymentMethodEnum.refine((value) => {
      if (!OrderPaymentMethodEnum.options.includes(value)) {
        throw new Error("Invalid payment method.");
      }
      return true;
    }),
  })
  .strict();

export default OrderPaymentSchema;
