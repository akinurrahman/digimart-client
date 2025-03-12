import RoleProtectionProvider from "@/components/providers/role-protection-provider";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <RoleProtectionProvider>{children}</RoleProtectionProvider>;
};

export default Layout;
