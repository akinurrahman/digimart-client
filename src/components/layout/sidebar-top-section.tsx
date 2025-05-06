"use client";

import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { APP_NAME } from "@/constants";
import { formatPropertyName, getInitials } from "@/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function SidebarTopSection() {
  const { open } = useSidebar();

  const logo = "";

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-2">
        <SidebarMenuButton size="lg" className="flex-1">
          <Avatar className="ring-offset-background hover:ring-ring size-8 cursor-pointer transition-all hover:ring-2 hover:ring-offset-2">
            <AvatarImage src={logo!} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(APP_NAME)}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {formatPropertyName(APP_NAME)}
            </span>
            <span className="truncate text-xs">Super Admin</span>
          </div>
        </SidebarMenuButton>
        {
          <div className={`${!open && "-ml-2"}`}>
            <SidebarTrigger />
          </div>
        }
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
