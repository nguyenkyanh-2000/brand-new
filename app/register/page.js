import Register from "@/components/forms/auth/Register";
import Logo from "@/components/layout/Logo";
import { redirect } from "next/navigation";
import { getCurrentSessionUser } from "@/utils/supabase-auth-utils";

export const metadata = {
  title: "Register | Brand",
  description: "Register page of Brand.",
};

async function RegisterPage() {
  const user = await getCurrentSessionUser();
  if (user) redirect("/");

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 py-12 lg:px-8">
      <div className="flex justify-center sm:mx-auto sm:w-full sm:max-w-sm">
        <Logo />
      </div>
      <Register />
    </div>
  );
}

export default RegisterPage;
