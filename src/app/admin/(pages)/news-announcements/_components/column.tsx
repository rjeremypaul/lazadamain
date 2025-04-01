"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
// import { CellAction } from "./cell-action";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { CellAction } from "./cell-action";
import Link from 'next/link';

export type NewsAnnouncementsColumn = {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  createdAt: string;
};

export const columns: ColumnDef<NewsAnnouncementsColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "imageUrl",
    header: "Image URL",
    cell: ({ row }) => (
      <div className="w-96 truncate" title={row.original.imageUrl}>
        <Link className='hover:underline text-primary' href={row.original.imageUrl}>{row.original.imageUrl}</Link>
      </div>
    ),
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
    accessorKey: "createdAt",
    header: "Date Created",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
