import ForgotPassword from "@/components/forms/auth/ForgotPassword";
import Logo from "@/components/layout/Logo";
import { getCurrentSessionUser } from "@/utils/supabase-auth-utils";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Forgot password | Brand",
  description: "Forgot-password page for Brand.",
};

async function ForgotPasswordPage() {
  const user = await getCurrentSessionUser();
  if (user) redirect("/");

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 py-12 lg:px-8">
      <div className="mb-5 flex justify-center sm:mx-auto sm:w-full sm:max-w-sm">
        <Logo />
      </div>
      <ForgotPassword />
    </div>
  );
}

export default ForgotPasswordPage;
