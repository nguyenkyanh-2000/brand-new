import { Button } from "@/components/ui/Button";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Auth Error",
  description: "Auth error page in Brand",
};

function AuthErrorPage() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center p-4">
      <h1 className="text-center font-serif text-4xl font-bold">
        There was an error. Please log in again.
      </h1>
      <div className="mt-4 flex items-center justify-center gap-3">
        <Button>
          <Link href={"/login"}>To login</Link>
        </Button>
        <Button variant="secondary">
          <Link href={"/"}>To homepage</Link>
        </Button>
      </div>
    </main>
  );
}

export default AuthErrorPage;
