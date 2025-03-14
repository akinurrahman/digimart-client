"use client";

import * as React from "react";

import { NavMain } from "@/components/layout/nav-main";
import { NavUser } from "@/components/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/redux/hooks";
import { adminNavItems, userNavItems } from "@/constants/sidebar-data";
import { APP_NAME } from "@/constants";
import { ShoppingBag } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  const { user } = useAppSelector((state) => state.auth);
  const navItems = user?.role === "admin" ? adminNavItems : userNavItems;
  return (
    <Sidebar collapsible="icon" {...props}>
      <div
        className={`flex ${open ? "justify-between" : "justify-center"} mt-3 p-2`}
      >
        <div
          className={`${!open && "hidden"} text-primary ml-2 flex items-center gap-2 text-xl font-medium tracking-wide`}
        >
          <ShoppingBag size={21} className="currentColor" /> {APP_NAME}
        </div>
        <SidebarTrigger />
      </div>

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
