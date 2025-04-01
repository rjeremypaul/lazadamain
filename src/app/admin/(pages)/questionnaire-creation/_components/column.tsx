"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { CellAction } from "./cell-action";
import { CellAction } from "./cell-action";
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export type QuestionnaireCreationColumn = {
  id: string;
  title: string;
  description: string;
  howManyQuestions: string;
  status: boolean;
  createdAt: string;
};

export const columns: ColumnDef<QuestionnaireCreationColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="w-64 truncate" title={row.original.description}>
        {row.original.description}
      </div>
    ),
  },
  {
    accessorKey: "howManyQuestions",
    header: "Questions",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const isPublished = row.getValue("status") || false;
      return (
        <Badge variant={isPublished ? "success" : "default"}>
          {isPublished ? "Published" : "Draft"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
