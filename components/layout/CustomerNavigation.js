import React from "react";
import Link from "next/link";
import AnimatedUnderline from "../animation/AnimatedUnderline";
import CustomerNavigationMobile from "./CustomerNavigationMobile";
import { getCurrentUser } from "@/utils/supabase-auth-utils";

async function CustomerNavigation() {
  const currentUser = await getCurrentUser();
  return (
    <>
      <nav className="mx-10 hidden items-center gap-5 lg:flex">
        <AnimatedUnderline>
          <Link className="text-lg" href={"/products"}>
            Products
          </Link>
        </AnimatedUnderline>
        <AnimatedUnderline>
          <Link className="text-lg" href={"/inspiration"}>
            Inspiration
          </Link>
        </AnimatedUnderline>
        <AnimatedUnderline>
          <Link className="text-lg" href={"#"}>
            News
          </Link>
        </AnimatedUnderline>
        <AnimatedUnderline>
          <Link className="text-lg" href={"#"}>
            Contact
          </Link>
        </AnimatedUnderline>
      </nav>
      {/* Only show when screen size < 1280px*/}
      <div className="flex lg:hidden">
        <CustomerNavigationMobile userId={currentUser?.id} />
      </div>
    </>
  );
}

export default CustomerNavigation;
