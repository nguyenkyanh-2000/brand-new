"use client";
import React, { useEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/HoverCard";
import { User2 } from "lucide-react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useGetUser from "@/hooks/useGetUser";
import { Button } from "../ui/Button";
import useLogout from "@/hooks/useLogout";

function UserProfile({ size = 24 }) {
  const { logout } = useLogout();
  const [currentUser, setCurrentUser] = useState();
  const { data, refetch } = useGetUser(currentUser?.id);

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    refetch();
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      const supabase = createClientComponentClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);
    };

    getCurrentUser();
  }, []);

  if (data.user) {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Link href={"/me"}>
            <User2 size={size} className="hover:cursor-pointer"></User2>
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="w-30 my-1" align="end">
          <div className="flex flex-col gap-3">
            <h4 className="px-4 font-semibold">
              {`Welcome, ${data.user.first_name} ${data.user.last_name}!`}
            </h4>

            <Link href="/me" className="px-4 rounded-md hover:bg-muted">
              My profile
            </Link>

            <Link href="#" className="px-4 rounded-md hover:bg-muted">
              Settings
            </Link>

            <Button onClick={handleLogout} variant="default">
              Log out
            </Button>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  }
  return (
    <Link href={"/auth/login"}>
      <User2 size={size} className="hover:cursor-pointer"></User2>
    </Link>
  );
}

export default UserProfile;
