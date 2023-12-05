"use client";

import React from "react";
import UserProfileForm from "./UserProfileForm";
import useGetUser from "@/hooks/useGetUser";
import useEditUserProfile from "@/hooks/UseEditUserProfile";
import { Skeleton } from "@/components/ui/Skeleton";
import { Loader2 } from "lucide-react";

function UserProfileDetail({ userId }) {
  const { data, isLoading } = useGetUser(userId);
  const { mutate, error } = useEditUserProfile(userId);

  if (data) return <UserProfileForm user={data.user} onSubmit={mutate} />;

  if (isLoading)
    return (
      <div className="flex place-items-center justify-center">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    );
}

export default UserProfileDetail;
