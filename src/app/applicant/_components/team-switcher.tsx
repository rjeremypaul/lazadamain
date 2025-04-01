"use client";

import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Lazada Logistics</span>
            <span className="truncate text-xs">
              Applicant Information System
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
