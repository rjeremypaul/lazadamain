import React from "react";
import db from "@/lib/db";
import VideoTrainingForm from "./video-training-form";

const VideoTraining = async (props: {
  params: Promise<{ videoTrainingId: string }>;
}) => {
  const params = await props.params;
  const data = await db.videoTraining.findUnique({
    where: {
      id: params.videoTrainingId,
    },
  });
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <VideoTrainingForm initialData={data} />
    </div>
  );
};

export default VideoTraining;
