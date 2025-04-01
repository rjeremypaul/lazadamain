"use client";

import { Button } from "@/components/ui/button";
import { Calendar, View } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { QueuingInterviewColumn } from "./column";

interface CellActionProps {
  data: QueuingInterviewColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <Button
        size="sm"
        onClick={() => router.push(`/admin/application-management/${data.id}`)}
      >
        <Calendar className="w-4 h-4" />
        Select Interview
      </Button>
    </>
  );
};
