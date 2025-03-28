"use client";
import { useAuth } from "@/hooks/useAuth";
import React, { ReactNode } from "react";
import { FullPageLoader } from "../ui/loader";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { NuqsAdapter } from "nuqs/adapters/next/app";

interface ProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: ProviderProps) => {
  const loading = useAuth();

  const queryClient = new QueryClient();
  if (loading) return <FullPageLoader />;
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>{children}</NuqsAdapter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default AppProvider;
