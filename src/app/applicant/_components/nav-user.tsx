"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { logout } from "@/actions/employee";
import AlertModal from "@/components/ui/alert-modal";
import React from "react";
import { toast } from "sonner";
import { ApplicantAccount, JobApplicant } from "@prisma/client";

interface ApplicantInterface extends ApplicantAccount {
  jobApplicant: JobApplicant;
}

export function NavUser({ user }: { user: ApplicantInterface }) {
  const [open, setOpen] = React.useState(false);
  const { isMobile } = useSidebar();
  const handleLogout = async () => {
    await logout();
    window.location.assign("/");
    toast.success("You have been logged out.");
  };

  return (
    <>
      <AlertModal
        title="Are you sure you want to logout?"
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleLogout}
      />
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user.jobApplicant.profileImage as string}
                    alt={user.jobApplicant.name}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user.jobApplicant.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user.jobApplicant.name}
                  </span>
                  <span className="truncate text-xs">{user.accountNumber}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user.jobApplicant.profileImage as string}
                      alt={user.jobApplicant.name}
                    />
                    <AvatarFallback className="rounded-lg">
                      {user.jobApplicant.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user.jobApplicant.name}
                    </span>
                    <span className="truncate text-xs">
                      {user.accountNumber}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() =>
                    window.location.assign("/applicant/applicant-information")
                  }
                >
                  <BadgeCheck />
                  Application Information
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
