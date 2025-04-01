"use client";

import * as React from "react";
import {
  BellDot,
  BookOpenCheck,
  BrainCog,
  CalendarCheck,
  ChartPie,
  CircleDotDashed,
  ClipboardPlus,
  LoaderPinwheelIcon,
  Megaphone,
  SquareTerminal,
  TableOfContents,
  UserCog,
  Video,
  WashingMachine,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import { ApplicantAccount, JobApplicant } from "@prisma/client";

interface ApplicantInterface extends ApplicantAccount {
  jobApplicant: JobApplicant;
}

const data = {
  navMain: [
    {
      title: "Applicant Progress",
      url: "/applicant/my-progress",
      icon: LoaderPinwheelIcon,
    },
    {
      title: "Video Training Sessions",
      url: "/applicant/video-training-sessions",
      icon: Video,
    },
    {
      title: "Interview Schedule",
      url: "/applicant/interview-schedule",
      icon: CalendarCheck,
    },
    {
      title: "Evaluation Status",
      url: "/applicant/evaluation-status",
      icon: BookOpenCheck,
    },
    {
      title: "News & Announcements",
      url: "/applicant/news-announcements",
      icon: Megaphone,
    },
    {
      title: "Notifications",
      url: "/applicant/notifications",
      icon: BellDot,
    },
  ],
};

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: ApplicantInterface }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
