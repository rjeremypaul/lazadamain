"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { QuestionnaireCreationColumn, columns } from "./column";

interface QuestionnaireCreationClientProps {
  data: QuestionnaireCreationColumn[];
}

const QuestionnaireCreationClient: React.FC<QuestionnaireCreationClientProps> = ({ data }) => {
  return (
    <>
      <DataTable searchKey="title" columns={columns} data={data} />
    </>
  );
};

export default QuestionnaireCreationClient;
