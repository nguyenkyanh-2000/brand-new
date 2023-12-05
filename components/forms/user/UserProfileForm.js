"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/Calendar";
import { cn } from "@/utils/tailwind-utils";
import { Textarea } from "@/components/ui/Textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/Command";
import profileSchema from "@/schema/profileSchema";
import countries from "@/data/countries.json";
import { ScrollArea } from "@/components/ui/ScrollArea";
import useGetUser from "@/hooks/useGetUser";
import useEditUserProfile from "@/hooks/UseEditUserProfile";

function UserProfileForm({ userId }) {
  const { data, isLoading } = useGetUser(userId);
  const { mutate, error } = useEditUserProfile(userId);
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      gender: "",
      date_of_birth: "",
      home_address: "",
      delivery_note: "",
      country: "",
      province: "",
      city: "",
      house_number: "",
      street: "",
      phone_number: "",
    },
    values: data?.user,
  });

  const onSubmit = (data) => {
    mutate({ data });
  };

  if (isLoading) return <p> Loading...</p>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <div className="grid grid-cols-12 items-center gap-5">
          <h3 className=" col-span-12 text-xl font-bold"> Basic information</h3>

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

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-2">
                <FormLabel>Gender</FormLabel>
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
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-2">
                <FormLabel>Date of birth</FormLabel>
                <Popover key={field.value}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "h-10 w-full bg-background text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? format(parseISO(field.value), "PPP")
                          : "Please select a date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      selected={field.value}
                      onSelect={field.onChange}
                      fromYear={1960}
                      toYear={2030}
                      disabled={(date) => date > new Date()}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-12 items-center gap-5">
          <h3 className="col-span-12 text-xl font-bold">Contact information</h3>

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
                  <Input id="phone_number" type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-5 flex w-full justify-end gap-4">
          <Button
            className="w-[100px] bg-background"
            type="reset"
            variant="secondary"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button className="w-[100px]" type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
export default UserProfileForm;
