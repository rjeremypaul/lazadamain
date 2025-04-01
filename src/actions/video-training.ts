"use server";

import db from "@/lib/db";

export const createVideoTraining = async (data: {
  title: string;
  description: string;
  videoUrl: string;
}) => {
  if (!data.title || !data.description || !data.videoUrl) {
    return { error: "All fields are required" };
  }

  try {
    await db.videoTraining.create({
      data: {
        title: data.title,
        description: data.description,
        videoUrl: data.videoUrl,
      },
    });
    return { success: "Video training created successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create video training" };
  }
};

export const updateVideoTraining = async (
  data: {
    title: string;
    description: string;
    videoUrl: string;
  },
  id: string
) => {
  if (!data.title || !data.description || !data.videoUrl) {
    return { error: "All fields are required" };
  }

  try {
    await db.videoTraining.update({
      where: {
        id: id,
      },
      data: {
        title: data.title,
        description: data.description,
        videoUrl: data.videoUrl,
      },
    });
    return { success: "Video training updated successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update video training" };
  }
};

export const deleteVideoTraining = async (id: string) => {
  if (!id) {
    return { error: "Invalid ID" };
  }

  try {
    await db.videoTraining.delete({
      where: {
        id: id,
      },
    });

    return { success: "Video training deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete video training" };
  }
};

export const videoTrainingEnded = async (id: string) => {
  if (!id) {
    return { error: "Invalid ID" };
  }

  try {
    await db.watchedVideo.update({
      data: {
        status: "Watched",
      },
      where: {
        id: id,
      },
    });

    return { success: "Video training watched successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to watch video training" };
  }
};
