"use client";

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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "@/hooks/useLogin";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function LoginForm() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { login, isLoading, isSuccess } = useLogin();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const form = useForm({
    resolver: zodResolver(credentialSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data) => {
    login(data);
    if (isSuccess) router.back();
  };

  const loginWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const loginWithFacebook = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-[500px] flex-col space-y-6 max-sm:w-4/5"
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
          <div className="hidden items-center gap-1 md:flex">
            <Checkbox
              id="c1"
              checked={passwordVisibility}
              onCheckedChange={() => setPasswordVisibility(!passwordVisibility)}
            />
            <Label htmlFor="c1">Show password?</Label>
          </div>
          <Link
            href={"/forgot-password"}
            className="text-center text-sm font-semibold text-foreground hover:text-foreground/50"
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
          <div className="space-between flex w-full gap-5">
            <Button onClick={loginWithGoogle} type="button" className="w-full">
              Google
            </Button>
            <Button
              onClick={loginWithFacebook}
              type="button"
              className="w-full"
            >
              <span>Facebook</span>
            </Button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-foreground">
          Not a member?{" "}
          <Link
            href="/register"
            className="text-sm font-semibold text-foreground
    hover:text-foreground/50"
          >
            {" "}
            Register here
          </Link>
        </p>
      </form>
    </Form>
  );
}

export default LoginForm;
