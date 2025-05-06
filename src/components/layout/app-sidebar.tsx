"use client";

import * as React from "react";

import { NavMain } from "@/components/layout/nav-main";
import { NavUser } from "@/components/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/redux/hooks";
import { adminNavItems, userNavItems } from "@/constants/sidebar-data";

import { SidebarTopSection } from "./sidebar-top-section";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAppSelector((state) => state.auth);
  const navItems = user?.role === "admin" ? adminNavItems : userNavItems;
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarTopSection />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
