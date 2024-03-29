import { Button } from "@/components/ui/Button";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Thank you!",
  description: "Thank you page in Brand",
};

function ThankYouPage() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center p-4">
      <h1 className="text-center font-serif text-4xl font-bold">
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
