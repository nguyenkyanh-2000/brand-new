import UserProfileNavigation from "@/components/header/UserProfileNavigation";
import React from "react";

function Layout({ children }) {
  return (
    <section className="mt-10 grid w-full grid-cols-12 gap-5 px-10">
      <h2 className="col-span-12 mb-10 text-center font-serif text-3xl sm:text-5xl">
        My profile
      </h2>
      <div className="col-span-12 lg:col-span-2">
        <UserProfileNavigation />
      </div>
      <div className="col-span-12 h-screen bg-blue-500 lg:col-span-10">
        {children}
      </div>
    </section>
  );
}

export default Layout;
