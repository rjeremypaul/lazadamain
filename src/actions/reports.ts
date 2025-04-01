"use server";

import db from "@/lib/db";

export const filterReport = async (formattedDate: string) => {
  try {
    const startOfDay = new Date(formattedDate);
    const endOfDay = new Date(startOfDay.getTime() + 86400000);

    // Total applicants in the database (without filtering by date)
    const totalApplicants = await db.jobApplication.count();

    // Applicants filtered by date
    const filteredApplicants = await db.jobApplication.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });

    // Evaluated applicants filtered by date
    const evaluatedApplicants = await db.applicantTrainingScore.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });

    // Interviewed applicants filtered by date
    const interviewedApplicants = await db.applicantAnswer.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });

    return {
      totalApplicants,
      filteredApplicants,
      evaluatedApplicants,
      interviewedApplicants,
    };
  } catch (error) {
    console.error("Error fetching filtered data:", error);
    return null;
  }
};

export const getMonthlyApplicantCounts = async () => {
  try {
    // Fetch the total count of applicants grouped by month and year
    const result = await db.jobApplication.groupBy({
      by: ["createdAt"],
      _count: {
        createdAt: true,
      },
      where: {
        createdAt: {
          gte: new Date("2025-01-01"), // Example: Start of the year
          lt: new Date("2026-01-01"), // Example: End of the year
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Format the result into month names and counts
    const formattedData = result.map((item) => {
      const month = item.createdAt.toISOString().slice(5, 7);
      const monthName = new Date(item.createdAt).toLocaleString("default", {
        month: "short",
      });
      return {
        month: monthName,
        applicant: item._count.createdAt,
      };
    });

    return formattedData;
  } catch (error) {
    console.error("Error fetching monthly applicant counts:", error);
    return { error: "Failed to fetch monthly data" };
  }
};
