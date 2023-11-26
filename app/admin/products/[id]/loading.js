import React from "react";
import { Loader2 } from "lucide-react";

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="animate-spin rounded-full h-20 w-20"></Loader2>
    </div>
  );
}

export default Loading;
