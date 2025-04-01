import Heading from "@/components/ui/heading";
import db from "@/lib/db";
import { format } from "date-fns";
import React from "react";
import { NewsAnnouncementsColumn } from "./_components/column";
import NewsAnnouncementsClient from "./_components/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

const NewsAnnouncements = async () => {
  const datas = await db.newsAnnouncements.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedData: NewsAnnouncementsColumn[] = datas.map((item) => {
    return {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl || "N/A",
      description: item.description,
      createdAt: format(item.createdAt, "MMMM dd, yyyy"),
    };
  });
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Heading
          title="News & Announcements"
          description="Manage your news and announcements here. You can add, edit, and delete news and announcements."
        />
        <div className="flex items-center space-x-2">
          <Link href="/admin/news-announcements/new">
            <Button size="sm">
              {" "}
              <PlusCircle />
              Add News & Announcements
            </Button>
          </Link>
        </div>
      </div>
      <NewsAnnouncementsClient data={formattedData} />
    </div>
  );
};

export default NewsAnnouncements;
