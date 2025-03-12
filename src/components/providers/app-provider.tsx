"use client";
import { useAuth } from "@/hooks/useAuth";
import React, { ReactNode } from "react";
import { FullPageLoader } from "../ui/loader";

interface ProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: ProviderProps) => {
  const loading = useAuth();
  if (loading) return <FullPageLoader />;
  return <>{children}</>;
};

export default AppProvider;
