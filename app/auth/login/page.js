"use client";

import { useState } from "react";
import Logo from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
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
import credentialSchema from "@/schema/credentialSchema";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "@/hooks/useLogin";
import { Loader2 } from "lucide-react";

function LoginPage() {
  const { login, isLoading } = useLogin();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const form = useForm({
    resolver: zodResolver(credentialSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data) => {
    login(data);
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

          <div className="flex flex-col justify-between md:flex-row md:gap-3">
            <div className="hidden md:flex items-center gap-1">
              <Checkbox
                id="c1"
                checked={passwordVisibility}
                onCheckedChange={() =>
                  setPasswordVisibility(!passwordVisibility)
                }
              />
              <Label htmlFor="c1">Show password?</Label>
            </div>
            <Link
              href={"#"}
              className="font-semibold text-sm text-foreground hover:text-foreground/50 text-center"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Button
              isLoading={isLoading}
              disabled={isLoading}
              type="submit"
              className="w-full"
            >
              Sign in with email
            </Button>
            <p className="text-xs text-foreground">Or sign in with</p>
            <div className="flex w-full gap-5 space-between">
              <Button type="button" className="w-full">
                Google
              </Button>
              <Button type="button" className="w-full">
                <span>Facebook</span>
              </Button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-foreground">
            Not a member?{" "}
            <Link
              href="/auth/register"
              className="font-semibold text-sm text-foreground
        hover:text-foreground/50"
            >
              {" "}
              Register here
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}

export default LoginPage;
