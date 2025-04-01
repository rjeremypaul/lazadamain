"use client";

import { Button } from "@/components/ui/button";
import { ListStart } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { EvaluationsOnsiteColumn } from "./column";

interface TrainingButtonProps {
  data: EvaluationsOnsiteColumn;
}

export const TrainingButton: React.FC<TrainingButtonProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <Button disabled={data.status === "Passed" || data.status === "Failed"} size="sm" onClick={() => router.push(`/admin/evaluations/${data.id}`)} variant="success">
        <ListStart />
        Start Training
      </Button>
    </>
  );
};
