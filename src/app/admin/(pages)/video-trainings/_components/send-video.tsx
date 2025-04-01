import React from "react";
import SendVideoForm from "./send-video-form";
import db from "@/lib/db";

const SendVideo = async () => {
  const applicants = await db.jobApplicant.findMany({
    where: {
      jobApplication: {
        some: {
          status: "Passed",
        },
      },
    },
    include: {
      applicantAccount: true,
      jobApplication: true,
    },
  });

  const videos = await db.videoTraining.findMany();
  return (
    <>
      <SendVideoForm applicants={applicants} videos={videos} />
    </>
  );
};

export default SendVideo;
