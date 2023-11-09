"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import WholeScreenSlideIn from "../animation/WholeScreenSlideIn";
import Link from "next/link";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { Menu, User2, X } from "lucide-react";

function AdminNavigationMobile() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <>
      {!isMenuOpened ? (
        <div className="flex items-center gap-5 xl:hidden">
          <ThemeToggle />
          <User2 />
          <Menu onClick={() => setIsMenuOpened(true)} />
        </div>
      ) : (
        <AnimatePresence>
          <WholeScreenSlideIn isOpen={isMenuOpened}>
            <div className="flex flex-col h-full">
              <div className="flex max-w-screen justify-end mx-10 mt-6">
                <X
                  className="text-primary-foreground"
                  onClick={() => setIsMenuOpened(false)}
                />
              </div>
              <nav className="flex flex-col flex-1 items-center justify-evenly mx-10">
                <Link className="text-3xl" href={"#"}>
                  Dashboard
                </Link>
                <Link className="text-3xl" href={"#"}>
                  Products
                </Link>
                <Link className="text-3xl" href={"#"}>
                  Customers
                </Link>
                <Link className="text-3xl" href={"#"}>
                  Orders
                </Link>
              </nav>
            </div>
          </WholeScreenSlideIn>
        </AnimatePresence>
      )}
    </>
  );
}

export default AdminNavigationMobile;
