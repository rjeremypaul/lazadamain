import Heading from "@/components/ui/heading";
import db from "@/lib/db";
import { format } from "date-fns";
import React from "react";
import VideoSessionClient from "./_components/client";
import { getApplicantAccount } from "@/hooks/use-applicant";

const VideoSession = async () => {
  const { applicantId } = await getApplicantAccount();
  const datas = await db.watchedVideo.findMany({
    where: {
      jobApplicant: {
        applicantAccount: { some: { id: applicantId } },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      jobApplicant: true,
      videoTraining: true,
    },
  });

  const formattedData = datas.map((item) => {
    return {
      id: item.id,
      videoName: item.videoTraining.title,
      description: item.videoTraining.description,
      status: item.status === "Pending" ? "Not Watched" : "Watched",
      createdAt: format(item.createdAt, "MMMM dd, yyyy"),
    };
  });
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Heading
          title="Video Training Sessions"
          description="Here you can view all the video training sessions that admin has sent to you."
        />
      </div>
      <VideoSessionClient data={formattedData} />
    </div>
  );
};

export default VideoSession;
