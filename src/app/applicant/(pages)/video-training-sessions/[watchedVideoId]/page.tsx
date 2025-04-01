import React from "react";
import Heading from "@/components/ui/heading";
import db from "@/lib/db";
import VideoPlayer from "./video-player";

const WatchedVideoId = async (
  props: {
    params: Promise<{
      watchedVideoId: string;
    }>;
  }
) => {
  const params = await props.params;
  const data = await db.watchedVideo.findUnique({
    where: {
      id: params.watchedVideoId,
    },
    include: {
      jobApplicant: true,
      videoTraining: true,
    },
  });
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Heading description="" title={data?.videoTraining.title || ""} />
      </div>
      <div className="bg-white rounded-lg shadow-lg border p-4 flex flex-col space-y-2">
        <VideoPlayer
          videoWatchedId={data?.id || ""}
          videoUrl={data?.videoTraining.videoUrl || ""}
        />
        <p className="text-sm text-gray-500">
          {data?.videoTraining.description}
        </p>
      </div>
    </div>
  );
};

export default WatchedVideoId;
