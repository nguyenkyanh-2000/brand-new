import React from "react";
import Link from "next/link";
import AnimatedUnderline from "../animation/AnimatedUnderline";
import CustomerNavigationMobile from "./CustomerNavigationMobile";

function CustomerNavigation() {
  return (
    <>
      <nav className="hidden lg:flex items-center gap-5 mx-10">
        <AnimatedUnderline>
          <Link className="text-lg" href={"#"}>
            Products
          </Link>
        </AnimatedUnderline>
        <AnimatedUnderline>
          <Link className="text-lg" href={"#"}>
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
        <CustomerNavigationMobile />
      </div>
    </>
  );
}

export default CustomerNavigation;
