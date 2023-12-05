import UserProfileNavigation from "@/components/header/UserProfileNavigation";
import React from "react";
import { getCurrentUser } from "@/utils/supabase-auth-utils";
import { redirect } from "next/navigation";

async function Layout({ children }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect("/auth/login");

  return (
    <section className="mt-10 grid w-full grid-cols-12 gap-5 px-10">
      <h2 className="col-span-12 mb-10 text-center font-serif text-3xl sm:text-5xl">
        My profile
      </h2>
      <div className="col-span-12 py-5 lg:col-span-1">
        <UserProfileNavigation />
      </div>
      <div className="col-span-12 rounded-md bg-muted py-5 lg:col-span-11">
        {children}
      </div>
    </section>
  );
}

export default Layout;
