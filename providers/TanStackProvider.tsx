// app/providers.tsx
"use client";

import { useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";

export function TanstackProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
