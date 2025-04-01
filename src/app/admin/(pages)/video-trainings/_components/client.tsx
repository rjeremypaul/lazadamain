"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { VideoTrainingsColumn, columns } from "./column";

interface VideoTrainingsClientProps {
  data: VideoTrainingsColumn[];
}

const VideoTrainingsClient: React.FC<VideoTrainingsClientProps> = ({ data }) => {
  return (
    <>
      <DataTable searchKey="title" columns={columns} data={data} />
    </>
  );
};

export default VideoTrainingsClient;
