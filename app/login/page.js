import Logo from "@/components/layout/Logo";

import React from "react";
import LoginForm from "@/components/forms/auth/LoginForm";
import { getCurrentSessionUser } from "@/utils/supabase-auth-utils";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Login | Brand",
  description: "Login page of Brand.",
};

async function LoginPage() {
  const user = await getCurrentSessionUser();
  if (user) redirect("/");

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 py-12 lg:px-8">
      <div className="flex justify-center sm:mx-auto sm:w-full sm:max-w-sm">
        <Logo />
      </div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
