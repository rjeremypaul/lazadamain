import React from "react";
import db from "@/lib/db";
import NewsAnnouncementForm from './news-announcement-form';

const NewsAnnouncementId = async (props: {
  params: Promise<{ newsAnnouncementId: string }>;
}) => {
  const params = await props.params;
  const data = await db.newsAnnouncements.findUnique({
    where: {
      id: params.newsAnnouncementId,
    },
  });
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <NewsAnnouncementForm initialData={data} />
    </div>
  );
};

export default NewsAnnouncementId;
