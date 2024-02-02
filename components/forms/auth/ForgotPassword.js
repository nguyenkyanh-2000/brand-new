"use client";

import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import forgotPasswordSchema from "@/schema/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function ForgotPassword() {
  const [success, setSuccess] = useState(false);
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const supabase = createClientComponentClient();
  const onSubmit = async (data) => {
    const { data: resetData, error } =
      await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${process.env.NEXT_PUBLIC_LOCATION_ORIGIN}/auth/reset-password`,
      });
    if (error)
      toast({
        variant: "destructive",
        title: "Error!",
        description: `${error.message}`,
      });
    else setSuccess(true);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-[500px] flex-col gap-4 max-sm:w-4/5"
      >
        <p>Input your email to receive the link to reset password.</p>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input id="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {success && (
          <p className="">Reset password link sent. Check your email.</p>
        )}
        <Button variant="default" type="submit">
          Reset password
        </Button>
        <p className="mt-10 text-center text-sm text-foreground">
          Back to the{" "}
          <Link
            href="/login"
            className="text-sm font-semibold text-foreground
        hover:text-foreground/50"
          >
            {" "}
            login page
          </Link>
        </p>
      </form>
    </Form>
  );
}

export default ForgotPassword;
