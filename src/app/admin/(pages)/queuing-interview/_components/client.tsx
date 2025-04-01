"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { QueuingInterviewColumn, columns } from "./column";

interface QueuingInterviewClientProps {
  data: QueuingInterviewColumn[];
}

const QueuingInterviewClient: React.FC<QueuingInterviewClientProps> = ({ data }) => {
  return (
    <>
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};

export default QueuingInterviewClient;
