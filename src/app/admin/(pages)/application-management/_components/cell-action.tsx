"use client";

import { Button } from "@/components/ui/button";
import { View } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { ApplicationManagementColumn } from "./column";

interface CellActionProps {
  data: ApplicationManagementColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <Button
        size="sm"
        onClick={() => router.push(`/admin/application-management/${data.id}`)}
      >
        <View className="w-4 h-4 mr-2" />
        View
      </Button>
    </>
  );
};
