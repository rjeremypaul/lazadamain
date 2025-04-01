/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { LazadaLoginCodeEmailHTML } from "@/components/globals/account-notify-email";
import { LazadaFailEmailHTML } from "@/components/globals/fail-notify-email";
import db from "@/lib/db";
import nodemailer from "nodemailer";
import { SendScheduleEmailHTML } from "@/components/globals/send-schedule-email";

export const passApplicant = async (
  id: string,
  totalScore: number,
  status: string,
  jobApplicantId: string
) => {
  if (!id) {
    return { error: "No ID provided" };
  }

  try {
    const applicant = await db.jobApplication.findFirst({
      where: {
        id: id,
      },
    });

    if (!applicant) {
      return { error: "Applicant not found" };
    }

    await db.jobApplication.update({
      where: {
        id: id,
      },
      data: {
        status: "Passed",
      },
    });

    await db.applicantScore.create({
      data: {
        jobApplicantId: jobApplicantId,
        score: totalScore,
        status: status,
      },
    });

    let interviewSchedule: string | null = null;

    if (totalScore >= 90) {
      const today = new Date();
      today.setDate(today.getDate() + 2);
      interviewSchedule = today.toISOString().split("T")[0];
    } else if (totalScore >= 70) {
      const today = new Date();
      today.setDate(today.getDate() + 5);
      interviewSchedule = today.toISOString().split("T")[0];
    } else {
      interviewSchedule = "TBA";
    }

    await db.interviewSchedule.create({
      data: {
        jobApplicantId: jobApplicantId,
        interviewDate: new Date(interviewSchedule),
      },
    });

    return { success: "Job application passed successfully" };
  } catch (error) {
    console.error("Error passing applicant:", error);
    return { error: "Failed to pass applicant" };
  }
};

export const sendEmail = async (
  accountNumber: string,
  password: string,
  name: string,
  accountNotice: string,
  email: string
) => {
  const htmlContent = await LazadaLoginCodeEmailHTML({
    accountNumber,
    password,
    name,
    accountNotice,
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
    subject: "Lazada Expedise Account Creation",
    text: `Your account has been created. Your account number is ${accountNumber} and your password is ${password}.`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(message);
    return { success: true };
  } catch (error) {
    console.error("Error sending notification", error);
    return { message: "An error occurred. Please try again." };
  }
};

export const createAccount = async (
  data: { accountNumber: string; password: string; adminNotice: string },
  email: string,
  name: string,
  applicantId: string
) => {
  if (
    !data.accountNumber ||
    !data.password ||
    !email ||
    !name ||
    !applicantId
  ) {
    return { error: "Missing required fields" };
  }

  try {
    const account = await db.applicantAccount.create({
      data: {
        accountNumber: data.accountNumber,
        password: data.password,
        jobApplicantId: applicantId,
      },
    });

    await sendEmail(
      data.accountNumber,
      data.password,
      name,
      data.adminNotice,
      email
    );

    return { success: "Account created successfully", account };
  } catch (error: any) {
    return {
      error: `Failed to create account. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const failApplicant = async (
  id: string,
  name: string,
  email: string,
  reason: string
) => {
  if (!id) {
    return { error: "No ID provided" };
  }

  try {
    const applicant = await db.jobApplication.findFirst({
      where: {
        id: id,
      },
    });

    if (!applicant) {
      return { error: "Applicant not found" };
    }

    await db.jobApplication.update({
      where: {
        id: id,
      },
      data: {
        status: "Failed",
      },
    });

    await sendEmailFail(name, reason, email);

    return { success: "Job application failed successfully" };
  } catch (error) {
    console.error("Error failing applicant:", error);
    return { error: "Failed to fail applicant" };
  }
};

export const sendEmailFail = async (
  name: string,
  reason: string,
  email: string
) => {
  const htmlContent = await LazadaFailEmailHTML({
    name,
    reason,
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
    subject: "Lazada Expedise Job Application Failed",
    text: `We regret to inform you that your job application has been declined due to the following reason: ${reason}.`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(message);
    return { success: true };
  } catch (error) {
    console.error("Error sending notification", error);
    return { message: "An error occurred. Please try again." };
  }
};

export const updateSchedule = async (data: {
  interviewDate: string;
  id: string;
}) => {
  if (!data.interviewDate) {
    return { error: "No interview date provided" };
  }

  try {
    await db.interviewSchedule.update({
      where: {
        id: data.id,
      },
      data: {
        interviewDate: new Date(data.interviewDate),
      },
    });

    return { success: "Interview schedule updated successfully" };
  } catch (error) {
    console.error("Error updating interview schedule:", error);
    return { error: "Failed to update interview schedule" };
  }
};

export const sendSchedule = async (
  name: string,
  interviewDate: string,
  email: string,
  accountNumber: string
) => {
  const htmlContent = await SendScheduleEmailHTML({
    accountNumber,
    name,
    interviewDate,
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
    subject: "Lazada Expedise Interview Schedule",
    text: `Your interview schedule has been set. Please be ready on ${interviewDate}.`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(message);

    await db.notification.create({
      data: {
        title: "Interview Schedule",
        description: `An interview schedule has been sent to your email.`,
        accountNumber: accountNumber,
      },
    });
    return { success: "Interview schedule has been sent." };
  } catch (error) {
    console.error("Error sending notification", error);
    return { message: "An error occurred. Please try again." };
  }
};

export const getScheduleByDate = async (data: { date: string }) => {
  if (!data.date) {
    return { error: "No date provided" };
  }

  try {
    const scheduledTimes = await db.interviewSchedule.findMany({
      where: {
        interviewDate: {
          gte: new Date(data.date),
          lt: new Date(`${data.date}T23:59:59.999Z`),
        },
      },
      select: {
        interviewDate: true,
      },
    });

    // Format the scheduled times to match the "HH:mm AM/PM" format
    const formattedScheduledTimes = scheduledTimes.map((time) => {
      const date = new Date(time.interviewDate);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHour = hours % 12 || 12; // Convert to 12-hour format
      const formattedMinute = minutes.toString().padStart(2, "0");
      return `${formattedHour}:${formattedMinute} ${period}`;
    });

    return {
      scheduledTimes: formattedScheduledTimes,
      scheduledCount: formattedScheduledTimes.length,
    };
  } catch (error) {
    console.error("Error getting scheduled times:", error);
    return { error: "Failed to get scheduled times" };
  }
};
