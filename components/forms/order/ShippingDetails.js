"use client";

import { Button } from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/Command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Textarea } from "@/components/ui/Textarea";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/utils/tailwind-utils";
import countries from "@/data/countries.json";
import useQueryUser from "@/hooks/useQueryUser";
import { zodResolver } from "@hookform/resolvers/zod";
import shippingDetailSchema from "@/schema/shippingDetailSchema";
import { useCart } from "@/hooks/useCart";
import useAddOrder from "@/hooks/useAddOrder";
import { useRouter } from "next/navigation";

function ShippingDetail({ userId }) {
  const { items } = useCart();
  const { data } = useQueryUser(userId);
  const { user } = data;
  const { mutateAsync, data: orderDetail, isSuccess } = useAddOrder(userId);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(shippingDetailSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      home_address: "",
      delivery_note: "",
      country: "",
      province: "",
      city: "",
      house_number: "",
      street: "",
      phone_number: "",
    },
  });

  const onSubmit = async (data) => {
    const orderDetail = await mutateAsync({
      data: { ...data, cart_items: items, user_id: userId },
    });
    const { order } = orderDetail;
    router.push(`/payment/${order.id}`);
  };

  const onUseMyInfoClick = () => {
    form.setValue("first_name", user.first_name);
    form.setValue("last_name", user.last_name);
    form.setValue("home_address", user.home_address);
    form.setValue("delivery_note", user.delivery_note);
    form.setValue("country", user.country);
    form.setValue("province", user.province);
    form.setValue("city", user.city);
    form.setValue("house_number", user.house_number);
    form.setValue("street", user.street);
    form.setValue("phone_number", user.phone_number);
  };

  return (
    <section>
      <div className="mb-5 flex w-full flex-col justify-between gap-2 sm:flex-row">
        <h3 className="text-xl font-semibold">Shipping detail</h3>
        <Button onClick={onUseMyInfoClick}>Use my info for shipping</Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-4">
                <FormLabel htmlFor="first_name">First name</FormLabel>
                <FormControl>
                  <Input id="first_name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-4">
                <FormLabel htmlFor="last_name">Last name</FormLabel>
                <FormControl>
                  <Input id="last_name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-12 items-center gap-5">
            <FormField
              control={form.control}
              name="home_address"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormLabel htmlFor="home_address">Home address</FormLabel>
                  <FormControl>
                    <Textarea id="home_address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="delivery_note"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormLabel htmlFor="delivery_note">Delivery note</FormLabel>
                  <FormControl>
                    <Textarea id="delivery_note" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <FormLabel>Country</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "h-10 w-full justify-between bg-background",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? countries.find(
                                (country) => country.value === field.value,
                              )?.label
                            : "Select country"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search country..." />
                        <CommandEmpty>No country found.</CommandEmpty>
                        <ScrollArea className="h-40">
                          <CommandGroup>
                            {countries.map((country) => (
                              <CommandItem
                                value={country.label}
                                key={country.value}
                                onSelect={() => {
                                  form.setValue("country", country.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    country.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {country.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </ScrollArea>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <FormLabel htmlFor="province">Province</FormLabel>
                  <FormControl>
                    <Input id="province" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <FormLabel htmlFor="city">City</FormLabel>
                  <FormControl>
                    <Input id="city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="house_number"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <FormLabel htmlFor="house_number">House number</FormLabel>
                  <FormControl>
                    <Input id="house_number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <FormLabel htmlFor="street">Street</FormLabel>
                  <FormControl>
                    <Input id="street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <FormLabel htmlFor="phone_number">Phone number</FormLabel>
                  <FormControl>
                    <Input
                      id="phone_number"
                      type="tel"
                      maxLength={11}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-5 flex w-full justify-end gap-4">
            <Button
              className="w-[200px] bg-background"
              type="reset"
              variant="secondary"
              onClick={() => form.reset()}
            >
              Reset
            </Button>

            <Button className="w-[200px]" type="submit">
              To payment
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}

export default ShippingDetail;
