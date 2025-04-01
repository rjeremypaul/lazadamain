"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
// import { CellAction } from "./cell-action";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { CellAction } from "./cell-action";
import Link from 'next/link';

export type VideoTrainingsColumn = {
  id: string;
  title: string;
  videoUrl: string;
  description: string;
  watchedVideo: number;
  createdAt: string;
};

export const columns: ColumnDef<VideoTrainingsColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "videoUrl",
    header: "Video URL",
    cell: ({ row }) => (
      <div className="w-96 truncate" title={row.original.videoUrl}>
        <Link className='hover:underline text-primary' href={row.original.videoUrl}>{row.original.videoUrl}</Link>
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
    accessorKey: "watchedVideo",
    header: "Watched Video",
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
