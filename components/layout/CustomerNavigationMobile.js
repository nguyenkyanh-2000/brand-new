"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import WholeScreenSlideIn from "../animation/WholeScreenSlideIn";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Menu, Search, ShoppingCart, User2, X } from "lucide-react";

function CustomerNavigationMobile() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <>
      {!isMenuOpened ? (
        <div className="flex items-center gap-5 xl:hidden">
          <Search size={16} />
          <User2 size={16} />
          <ShoppingCart size={16} />
          <Menu size={16} onClick={() => setIsMenuOpened(true)} />
        </div>
      ) : (
        <AnimatePresence>
          <WholeScreenSlideIn isOpen={isMenuOpened}>
            <div className="flex flex-col h-full">
              <div className="flex max-w-screen justify-end mx-10 mt-6">
                <X onClick={() => setIsMenuOpened(false)} />
              </div>
              <nav className="flex flex-col flex-1 items-center justify-evenly mx-10">
                <Link className="text-3xl" href={"#"}>
                  Products
                </Link>
                <Link className="text-3xl" href={"#"}>
                  Inspiration
                </Link>
                <Link className="text-3xl" href={"#"}>
                  News
                </Link>
                <Link className="text-3xl" href={"#"}>
                  Contact
                </Link>
              </nav>
            </div>
          </WholeScreenSlideIn>
        </AnimatePresence>
      )}
    </>
  );
}

export default CustomerNavigationMobile;
