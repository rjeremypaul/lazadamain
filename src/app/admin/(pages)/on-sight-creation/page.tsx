import Heading from "@/components/ui/heading";
import db from "@/lib/db";
import { format } from "date-fns";
import React from "react";
import { TrainingCreationColumn } from "./_components/column";
import TrainingCreationClient from "./_components/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

const TrainingCreation = async () => {
  const datas = await db.trainingOnsite.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      applicantTraining: true
    },
  });

  const formattedData: TrainingCreationColumn[] = datas.map((item) => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      createdAt: format(item.createdAt, "MMMM dd, yyyy"),
    };
  });
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Heading
          title="Onsite Training Creation"
          description="Create and manage your onsite training evaluation here. You can add, edit, and delete your training evaluation."
        />
        <Link href="/admin/on-sight-creation/new">
          <Button size="sm">
            {" "}
            <PlusCircle />
            Add New Training Evaluation
          </Button>
        </Link>
      </div>
      <TrainingCreationClient data={formattedData} />
    </div>
  );
};

export default TrainingCreation;
