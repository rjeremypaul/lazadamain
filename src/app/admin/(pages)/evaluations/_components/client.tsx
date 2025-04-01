"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import {
  EvaluationsWatchedColumn,
  EvaluationsInterviewedColumn,
  EvaluationsOnsiteColumn,
  columns1,
  columns2,
  columns3,
  columns4,
  EvaluationsOverallColumn,
} from "./column";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TrainingCreationClientProps {
  formattedVideo: EvaluationsWatchedColumn[];
  formattedInterview: EvaluationsInterviewedColumn[];
  formattedOnsite: EvaluationsOnsiteColumn[];
  formattedOverall: EvaluationsOverallColumn[];
}

const TrainingCreationClient: React.FC<TrainingCreationClientProps> = ({
  formattedVideo,
  formattedInterview,
  formattedOnsite,
  formattedOverall,
}) => {
  return (
    <>
      <Tabs defaultValue="video">
        <TabsList>
          <TabsTrigger value="video">Video Training</TabsTrigger>
          <TabsTrigger value="interview">Digital Interview</TabsTrigger>
          <TabsTrigger value="onsite">Onsite Training</TabsTrigger>
          <TabsTrigger value="overall">Overall Evaluation</TabsTrigger>
        </TabsList>
        <TabsContent value="video">
          <DataTable
            searchKey="name"
            columns={columns1}
            data={formattedVideo}
          />
        </TabsContent>
        <TabsContent value="interview">
          <DataTable
            searchKey="name"
            columns={columns2}
            data={formattedInterview}
          />
        </TabsContent>
        <TabsContent value="onsite">
          <DataTable
            searchKey="name"
            columns={columns3}
            data={formattedOnsite}
          />
        </TabsContent>
        <TabsContent value="overall">
          <DataTable
            searchKey="email"
            columns={columns4}
            data={formattedOverall}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default TrainingCreationClient;
