"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { SystemAdministrationColumn, columns } from "./column";

interface SystemAdministrationClientProps {
  data: SystemAdministrationColumn[];
}

const SystemAdministrationClient: React.FC<SystemAdministrationClientProps> = ({ data }) => {
  return (
    <>
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};

export default SystemAdministrationClient;
