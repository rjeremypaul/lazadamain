"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { CellAction } from "./cell-action";
import { Badge } from "@/components/ui/badge";

export type QueuingInterviewColumn = {
  id: string;
  rank: number;
  name: string;
  accountNumber: string;
  email: string;
  score: number;
  status: string;
};

export const columns: ColumnDef<QueuingInterviewColumn>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
  },
  {
    accessorKey: "name",
    header: "Applicant Name",
  },
  {
    accessorKey: "accountNumber",
    header: "Account Number",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "score",
    header: "Score (%)",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let variant:
        | "default"
        | "secondary"
        | "outline"
        | "destructive"
        | "success"
        | null
        | undefined = "default";

      if (status === "Next Batch Candidates") {
        variant = "destructive";
      } else if (status === "To Be Announced Candidates") {
        variant = "default";
      } else if (status === "Top Candidate") {
        variant = "success";
      }

      return <Badge variant={variant}>{status}</Badge>;
    },
  },
];
