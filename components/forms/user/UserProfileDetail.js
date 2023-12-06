"use client";

import React from "react";
import UserProfileForm from "./UserProfileForm";
import useGetUser from "@/hooks/useGetUser";
import useEditUserProfile from "@/hooks/UseEditUserProfile";
import { Loader2 } from "lucide-react";

function UserProfileDetail({ userId }) {
  const { data, isLoading } = useGetUser(userId);
  const { mutate, isPending } = useEditUserProfile(userId);

  if (data)
    return (
      <UserProfileForm
        user={data.user}
        onSubmit={mutate}
        isPending={isPending}
      />
    );

  if (isLoading)
    return (
      <div className="flex place-items-center justify-center">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    );
}

export default UserProfileDetail;
