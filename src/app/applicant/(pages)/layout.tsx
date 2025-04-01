import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "../_components/app-sidebar";
import Header from "../_components/header";
import { getApplicantAccount } from "@/hooks/use-applicant";

const ApplicantLayout = async ({ children }: { children: React.ReactNode }) => {
  const { applicant } = await getApplicantAccount();
  return (
    <SidebarProvider>
      {applicant && <AppSidebar user={applicant} />}
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ApplicantLayout;
