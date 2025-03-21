"use client";
import React from "react";
import { AppSidebar } from "../layout/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { authenticationRoutes } from "@/constants/config-constants";

const SidebarWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const isAuthRoute = authenticationRoutes.includes(pathname);

  if (isAuthRoute) return <main>{children}</main>;
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header>
          <div className={`mt-5 ml-5 md:hidden`}>
            <SidebarTrigger />
          </div>
        </header>

        <main className="flex-1 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarWrapper;
