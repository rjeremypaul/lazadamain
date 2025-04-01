"use server";

import db from "@/lib/db";
import nodemailer from "nodemailer";
import { SendVideoEmailHTML } from "../components/globals/video-notify-email";

export const createOnsiteTraining = async (data: {
  title: string;
  description: string;
}) => {
  if (!data.title || !data.description) {
    return { error: "Title and description are required" };
  }

  try {
    await db.trainingOnsite.create({
      data: {
        title: data.title,
        description: data.description,
      },
    });

    return { success: "Onsite training created successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create onsite training" };
  }
};

export const updateOnsiteTraining = async (
  data: { title: string; description: string },
  id: string
) => {
  if (!data.title || !data.description) {
    return { error: "Title and description are required" };
  }

  try {
    await db.trainingOnsite.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
      },
    });

    return { success: "Onsite training updated successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update onsite training" };
  }
};

export const deleteOnsiteTraining = async (id: string) => {
  if (!id) {
    return { error: "Onsite training ID is required" };
  }

  try {
    await db.trainingOnsite.delete({ where: { id } });
    return { success: "Onsite training deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete onsite training" };
  }
};

export const sendVideoToApplicant = async (data: {
  applicantId: string;
  videoId: string;
}) => {
  if (!data.applicantId || !data.videoId) {
    return { error: "Applicant and video are required" };
  }

  try {
    const existingVideoAndApplicant = await db.watchedVideo.findFirst({
      where: {
        jobApplicantId: data.applicantId,
        videoTrainingId: data.videoId,
      },
    });

    if (existingVideoAndApplicant) {
      return { error: "Video already sent to applicant" };
    }

    const response = await db.watchedVideo.create({
      data: {
        jobApplicantId: data.applicantId,
        videoTrainingId: data.videoId,
        status: "Pending",
      },
      include: {
        jobApplicant: {
          include: {
            applicantAccount: true,
          },
        },
      },
    });

    await sendVideoEmail(
      response.jobApplicant.name,
      response.id,
      response.jobApplicant.applicantAccount[0].accountNumber,
      response.jobApplicant.email
    );
    return { success: "Video sent to applicant" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to send video to applicant" };
  }
};

export const sendVideoEmail = async (
  name: string,
  videoTrainingId: string,
  accountNumber: string,
  email: string
) => {
  const htmlContent = await SendVideoEmailHTML({
    name,
    videoTrainingId,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "christian12345montero@gmail.com",
      pass: "xyfmpnnnrmewfnys",
    },
  });

  const message = {
    from: "christian12345montero@gmail.com",
    to: email,
    subject: "Lazada Expedise Video Training Session",
    text: `Video training tutorial for Lazada Expedise`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(message);

    await db.notification.create({
      data: {
        title: "Video Training Session",
        description: `A video training session has been sent to your email.`,
        accountNumber: accountNumber,
      },
    });
    return { success: "Video training session has been sent." };
  } catch (error) {
    console.error("Error sending notification", error);
    return { message: "An error occurred. Please try again." };
  }
};
