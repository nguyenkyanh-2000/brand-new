import React from "react";
import { Loader2 } from "lucide-react";

function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-20 w-20 animate-spin rounded-full"></Loader2>
    </div>
  );
}

export default Loading;
