"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { NewsAnnouncementsColumn, columns } from "./column";

interface NewsAnnouncementsClientProps {
  data: NewsAnnouncementsColumn[];
}

const NewsAnnouncementsClient: React.FC<NewsAnnouncementsClientProps> = ({ data }) => {
  return (
    <>
      <DataTable searchKey="title" columns={columns} data={data} />
    </>
  );
};

export default NewsAnnouncementsClient;
