import Heading from "@/components/ui/heading";
import db from "@/lib/db";
import { format } from "date-fns";
import React from "react";
import {
  EvaluationsInterviewedColumn,
  EvaluationsOnsiteColumn,
  EvaluationsOverallColumn,
  EvaluationsWatchedColumn,
} from "./_components/column";
import EvaluationsClient from "./_components/client";

const Evaluations = async () => {
  const watchedVideos = await db.watchedVideo.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      jobApplicant: {
        include: {
          applicantAccount: true,
        },
      },
      videoTraining: true,
    },
  });

  const digitalInterview = await db.jobApplicant.findMany({
    where: {
      jobApplication: {
        some: {
          status: "Passed",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      applicantAnswer: {
        include: {
          question: {
            include: {
              questionnaire: true,
            },
          },
        },
      },
      applicantAccount: true,
      jobApplication: true,
    },
  });

  const onsiteTraining = await db.jobApplicant.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      jobApplication: {
        some: {
          status: "Passed",
        },
      },
    },
    include: {
      applicantAccount: true,
      applicantTraining: true,
      applicantTrainingScore: true,
    },
  });

  const formattedVideo: EvaluationsWatchedColumn[] = watchedVideos.map(
    (item) => {
      return {
        id: item.id,
        name: item.jobApplicant.name,
        email: item.jobApplicant.email,
        video: item.videoTraining.title,
        accountNumber: item.jobApplicant.applicantAccount[0].accountNumber,
        status: item.status === "Pending" ? "Not Watched" : "Watched",
        createdAt: format(item.createdAt, "MMMM dd, yyyy"),
      };
    }
  );

  const formattedInterview: EvaluationsInterviewedColumn[] =
    digitalInterview.map((item) => {
      // Count the number of passed and failed answers
      const passedCount = item.applicantAnswer.filter(
        (answer) => answer.status === "Passed"
      ).length;
      const failedCount = item.applicantAnswer.filter(
        (answer) => answer.status === "Failed"
      ).length;

      // Determine interview status based on counts
      const interviewStatus =
        passedCount > failedCount
          ? "Passed"
          : failedCount > passedCount
            ? "Failed"
            : passedCount === failedCount && passedCount > 0
              ? "Passed" // Favor "Passed" in case of a tie
              : "Pending"; // Default to "Pending" if no evaluations exist

      console.log("interviewStatus", interviewStatus);

      return {
        id: item.id,
        questionnaireId: item.applicantAnswer[0]?.question.questionnaire.id,
        name: item.name,
        email: item.email,
        accountNumber: item.applicantAccount[0]?.accountNumber || "N/A",
        createdAt: format(item.createdAt, "MMMM dd, yyyy"),
        status: interviewStatus, // Include the status here
      };
    });

  const formattedOnsite: EvaluationsOnsiteColumn[] = onsiteTraining.map(
    (item) => {
      return {
        id: item.id,
        name: item.name,
        email: item.email,
        accountNumber: item.applicantAccount[0]?.accountNumber || "N/A",
        status: item.applicantTrainingScore[0]?.status || "Not Evaluated",
        createdAt: format(item.createdAt, "MMMM dd, yyyy"),
      };
    }
  );

  const formattedOverall: EvaluationsOverallColumn[] = onsiteTraining.map(
    (item) => {
      // Find the interview status from the formattedInterview array using id for better matching
      const interview = formattedInterview.find(
        (interview) => interview.id === item.id // Use id for matching
      );

      // If interview status is not found, fallback to "Pending"
      const interviewStatus = interview ? interview.status : "Pending";

      const trainingStatus =
        item.applicantTrainingScore[0]?.status || "Pending";

      // Determine overall status based on both interview and training status
      const overallStatus =
        trainingStatus === "Passed" && interviewStatus === "Passed"
          ? "Passed" // Show Passed if both training and interview status are Passed
          : trainingStatus === "Failed" && interviewStatus === "Failed"
            ? "Failed" // Show Failed if both training and interview status are Failed
            : "Pending"; // Show Pending if any status is pending or incomplete

      return {
        id: item.id,
        name: item.name,
        email: item.email,
        trainingScore: item.applicantTrainingScore[0]?.totalScore.toString() || "N/A",
        accountNumber: item.applicantAccount[0]?.accountNumber || "N/A",
        role: "Applicant",
        jobRegistrationStatus: "Passed", // Assuming this should always be Passed
        trainingStatus: trainingStatus,
        interviewStatus: interviewStatus, // Correct interviewStatus assignment
        overallStatus: overallStatus,
        createdAt: format(item.createdAt, "MMMM dd, yyyy"),
      };
    }
  );

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Heading
          title="Job Applicant Management"
          description="Manage all job applicants here. You can view their training evaluation, status, and account information."
        />
      </div>
      <EvaluationsClient
        formattedVideo={formattedVideo}
        formattedInterview={formattedInterview}
        formattedOnsite={formattedOnsite}
        formattedOverall={formattedOverall}
      />
    </div>
  );
};

export default Evaluations;
