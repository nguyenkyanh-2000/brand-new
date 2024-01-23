import React from "react";
import { getCurrentUser } from "@/utils/supabase-auth-utils";
import PaymentForm from "@/components/forms/payment/PaymentForm";

async function page({ params }) {
  const user = await getCurrentUser();
  const orderEncryptedId = params.id;
  if (!user) {
    redirect("/auth/login");
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <PaymentForm orderEncryptedId={orderEncryptedId} />
    </div>
  );
}

export default page;
