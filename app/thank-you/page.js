import { Button } from "@/components/ui/Button";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Thank you!",
  description: "Thank you page in Brand",
};

function ThankYouPage({ searchParams }) {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="font-serif text-4xl font-bold">
        Your order is received. Thank you for ordering!
      </h1>
      <div className="mt-4 flex items-center justify-center gap-3">
        <Button>
          <Link href={"/products"}>Continue shopping</Link>
        </Button>
        <Button variant="secondary">
          <Link href={"/"}>To homepage</Link>
        </Button>
      </div>
    </main>
  );
}

export default ThankYouPage;
