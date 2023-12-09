import UserProfileDetail from "@/components/forms/user/UserProfileDetail";
import { getCurrentUser } from "@/utils/supabase-auth-utils";

import React from "react";

export const metadata = {
  title: "My profile | Brand",
  description: "User profile for Brand website",
};

async function ProfilePage() {
  const currentUser = await getCurrentUser();

  return (
    <section className="min-h-[500px] w-full gap-5 px-2 md:px-10">
      <UserProfileDetail userId={currentUser.id} />
    </section>
  );
}

export default ProfilePage;
