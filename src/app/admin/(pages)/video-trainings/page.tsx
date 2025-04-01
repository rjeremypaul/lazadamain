import Heading from "@/components/ui/heading";
import db from "@/lib/db";
import { format } from "date-fns";
import React from "react";
import { VideoTrainingsColumn } from "./_components/column";
import VideoTrainingsClient from "./_components/client";
import { Button } from "../../../../components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import SendVideo from "./_components/send-video";

const VideoTrainings = async () => {
  const datas = await db.videoTraining.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      watchedVideo: true,
    },
  });

  const formattedData: VideoTrainingsColumn[] = datas.map((item) => {
    return {
      id: item.id,
      title: item.title,
      videoUrl: item.videoUrl,
      description: item.description,
      watchedVideo: item.watchedVideo.length,
      createdAt: format(item.createdAt, "MMMM dd, yyyy"),
    };
  });
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Heading
          title="Uploaded Video Trainings"
          description="Manage all the video trainings uploaded by the admin here. You can view, update and delete the video trainings."
        />
        <div className='flex items-center space-x-2'>
          <SendVideo />
          <Link href="/admin/video-trainings/new">
            <Button size="sm">
              {" "}
              <PlusCircle />
              Add New Video
            </Button>
          </Link>
        </div>
      </div>
      <VideoTrainingsClient data={formattedData} />
    </div>
  );
};

export default VideoTrainings;
