"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "@/components/layout/Logo";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/Button";
import registrationSchema from "@/schema/registrationSchema";
import useSignUp from "@/hooks/useSignUp";
import { Loader2 } from "lucide-react";

function RegisterPage() {
  const { signUp, isLoading } = useSignUp();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const form = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = (data) => {
    signUp(data);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 py-12 lg:px-8">
      <div className="flex justify-center sm:mx-auto sm:w-full sm:max-w-sm">
        <Logo />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[500px] max-sm:w-4/5 space-y-6 flex flex-col"
        >
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type={passwordVisibility ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="confirmPassword">
                  Confirm your password
                </FormLabel>
                <FormControl>
                  <Input
                    id="confirmPassword"
                    type={passwordVisibility ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-1">
            <Checkbox
              id="c1"
              checked={passwordVisibility}
              onCheckedChange={() => setPasswordVisibility(!passwordVisibility)}
            />
            <Label htmlFor="c1">Show password?</Label>
          </div>
          <Button variant="default" type="submit">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Register now"
            )}
          </Button>
          <p className="mt-10 text-center text-sm text-foreground">
            Back to the{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-sm text-foreground
              hover:text-foreground/50"
            >
              {" "}
              login page
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}

export default RegisterPage;
