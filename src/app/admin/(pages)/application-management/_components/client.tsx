"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { ApplicationManagementColumn, columns } from "./column";

interface ApplicationManagementClientProps {
  data: ApplicationManagementColumn[];
}

const ApplicationManagementClient: React.FC<
  ApplicationManagementClientProps
> = ({ data }) => {
  return (
    <>
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};

export default ApplicationManagementClient;
