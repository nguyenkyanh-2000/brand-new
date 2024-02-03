"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import WholeScreenSlideIn from "../animation/WholeScreenSlideIn";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import UserProfile from "../header/UserProfile";
import { CartSheet } from "../forms/cart/CartSheet";
import SearchProduct from "../header/SearchProduct";

function CustomerNavigationMobile({ userId }) {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  return (
    <>
      {!isMenuOpened ? (
        <div className="flex items-center gap-5 xl:hidden">
          <SearchProduct size={16} />
          <UserProfile userId={userId} size={16} />
          <CartSheet userId={userId} />
          <Menu size={16} onClick={() => setIsMenuOpened(true)} />
        </div>
      ) : (
        <AnimatePresence>
          <WholeScreenSlideIn isOpen={isMenuOpened}>
            <div className="flex h-full flex-col">
              <div className="max-w-screen mx-10 mt-6 flex justify-end">
                <X onClick={() => setIsMenuOpened(false)} />
              </div>
              <nav className="mx-10 flex flex-1 flex-col items-center justify-evenly">
                <Link
                  className="text-3xl"
                  href={"/products"}
                  onClick={() => setIsMenuOpened(false)}
                >
                  Products
                </Link>
                <Link
                  className="text-3xl"
                  href={"/inspiration"}
                  onClick={() => setIsMenuOpened(false)}
                >
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
