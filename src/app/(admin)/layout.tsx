import RoleProtectionProvider from "@/components/providers/role-protection-provider";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <RoleProtectionProvider allowedRoles={["user"]}>
      {children}
    </RoleProtectionProvider>
  );
};

export default Layout;
