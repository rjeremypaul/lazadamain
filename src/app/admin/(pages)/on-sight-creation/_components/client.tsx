"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { TrainingCreationColumn, columns } from "./column";

interface TrainingCreationClientProps {
  data: TrainingCreationColumn[];
}

const TrainingCreationClient: React.FC<TrainingCreationClientProps> = ({ data }) => {
  return (
    <>
      <DataTable searchKey="title" columns={columns} data={data} />
    </>
  );
};

export default TrainingCreationClient;
