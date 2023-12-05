import UserProfileForm from "@/components/forms/user/UserProfileForm";
import getQueryClient from "@/utils/getQueryClient";
import { getCurrentUser } from "@/utils/supabase-auth-utils";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import React from "react";

async function ProfilePage() {
  const currentUser = await getCurrentUser();
  const dehydratedState = dehydrate(getQueryClient());
  return (
    <HydrationBoundary state={dehydratedState}>
      <section className="w-full gap-5 px-2 md:px-10">
        <UserProfileForm userId={currentUser.id} />
      </section>
    </HydrationBoundary>
  );
}

export default ProfilePage;
