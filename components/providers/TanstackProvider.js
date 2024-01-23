"use client";

import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useState } from "react";

const TanstackProvider = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 60 * 24, // 24 hours,
          },
        },
      }),
  );

  const persister = createSyncStoragePersister({
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  });

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
      <ReactQueryDevtools></ReactQueryDevtools>
    </PersistQueryClientProvider>
  );
};

export default TanstackProvider;
