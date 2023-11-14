import React from "react";
import Link from "next/link";
import AdminNavigationMobile from "./AdminNavigationMobile";
import AnimatedUnderline from "../animation/AnimatedUnderline";

function AdminNavigation() {
  return (
    <>
      <nav className="hidden lg:flex items-center gap-5 mx-10">
        <AnimatedUnderline>
          <Link className="text-lg" href={"#"}>
            Dashboard
          </Link>
        </AnimatedUnderline>
        <AnimatedUnderline>
          <Link className="text-lg" href={"/admin/products"}>
            Products
          </Link>
        </AnimatedUnderline>
        <AnimatedUnderline>
          <Link className="text-lg" href={"#"}>
            Customers
          </Link>
        </AnimatedUnderline>
        <AnimatedUnderline>
          <Link className="text-lg" href={"#"}>
            Orders
          </Link>
        </AnimatedUnderline>
      </nav>
      {/* Only show when screen size < 1280px*/}
      <div className="flex lg:hidden">
        <AdminNavigationMobile />
      </div>
    </>
  );
}

export default AdminNavigation;
