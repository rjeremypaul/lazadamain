import React from "react";
import db from "@/lib/db";
import Heading from "@/components/ui/heading";
import AnnouncementCard from "./_components/announcement-card";

const NewsAndAnnouncements = async () => {
  const announcement = await db.newsAnnouncements.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="p-6">
      <Heading
        title="News & Announcements"
        description="View all the recent news and announcement posted by Admin."
      />
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4 mt-3">
        {announcement.map((item) => (
          <AnnouncementCard
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsAndAnnouncements;
