import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "../_components/app-sidebar";
import Header from "../_components/header";
import { getAdminAccount } from "@/hooks/use-admin";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const { admin } = await getAdminAccount();
  return (
    <SidebarProvider>
      {admin && <AppSidebar admin={admin} />}
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
