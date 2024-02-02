import ResetPassword from "@/components/forms/auth/ResetPassword";
import Logo from "@/components/layout/Logo";
import { getCurrentSessionUser } from "@/utils/supabase-auth-utils";
import { redirect } from "next/navigation";

async function ResetPasswordPage() {
  const user = await getCurrentSessionUser();
  if (!user) redirect("/login");
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 py-12 lg:px-8">
      <div className="mb-5 flex justify-center sm:mx-auto sm:w-full sm:max-w-sm">
        <Logo />
      </div>
      <ResetPassword />
    </div>
  );
}

export default ResetPasswordPage;
