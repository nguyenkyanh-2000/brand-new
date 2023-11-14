"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

const Error = ({ error, reset }) => {
  const router = useRouter();
  return (
    <div className="bg-destructive text-destructive-foreground min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="text-center space-y-6">
        <h1 className="text-4xl sm:text-6xl font-bold">Oops!</h1>
        <p className="text-lg sm:text-2xl">{`Something went wrong. Error: "${error.message}"`}</p>
        <p className="text-base sm:text-lg">
          We apologize for the inconvenience.
        </p>
        <div className="flex mt-4 gap-3 items-center justify-center">
          <Button onClick={() => router.back()}>Go back</Button>
          <Button variant="secondary" onClick={reset}>
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;
