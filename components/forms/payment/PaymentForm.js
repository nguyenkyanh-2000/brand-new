"use client";

import { Icons } from "@/components/icons/icon";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import usePayOrder from "@/hooks/usePayOrder";
import PaymentFormSchema from "@/schema/paymentFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

function PaymentForm({ orderEncryptedId }) {
  const { mutateAsync, isSuccess } = usePayOrder();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: {
      name: "",
      number: "",
      month: "",
      year: "",
      cvc: "",
    },
  });

  const onSubmit = async () => {
    await mutateAsync({
      data: { order_status: "PAID", payment_method: "CARD" },
      encryptedOrderId: orderEncryptedId,
    });
    if (isSuccess) router.push(`/thank-you/${orderEncryptedId}`);
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>
              Choose a payment method for the order.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <FormControl>
                      <Input id="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="number">Card number</FormLabel>
                    <FormControl>
                      <Input
                        id="number"
                        maxLength={19}
                        onKeyUp={(e) => {
                          const inputNumber = e.target.value;
                          const formattedNumber = inputNumber
                            .replace(/\D/g, "")
                            .replace(/(\d{4})(?=\d)/g, "$1 ");
                          field.onChange(formattedNumber);
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="month"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expires</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={field.value} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">January</SelectItem>
                          <SelectItem value="2">February</SelectItem>
                          <SelectItem value="3">March</SelectItem>
                          <SelectItem value="4">April</SelectItem>
                          <SelectItem value="5">May</SelectItem>
                          <SelectItem value="6">June</SelectItem>
                          <SelectItem value="7">July</SelectItem>
                          <SelectItem value="8">August</SelectItem>
                          <SelectItem value="9">September</SelectItem>
                          <SelectItem value="10">October</SelectItem>
                          <SelectItem value="11">November</SelectItem>
                          <SelectItem value="12">December</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={"Year"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => (
                            <SelectItem
                              key={i}
                              value={`${new Date().getFullYear() + i}`}
                            >
                              {new Date().getFullYear() + i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="cvc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="cvc">CVC</FormLabel>
                      <FormControl>
                        <Input id="cvc" type="tel" maxLength="3" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full" type="submit">
              Continue
            </Button>
            <Button variant="outline" className="flex w-full gap-2">
              <Icons.paypal className="h-6 w-6" />
              <Label htmlFor="paypal">Continue with Paypal</Label>
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

export default PaymentForm;
