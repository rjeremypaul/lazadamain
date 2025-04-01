import React from "react";
import db from "@/lib/db";
import InterviewApplicantForm from './interview-applicant-form';

const InterviewApplicant = async () => {
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

  const questionnaire = await db.questionnaire.findMany();
  return (
    <>
      <InterviewApplicantForm applicants={applicants} questionnaire={questionnaire} />
    </>
  );
};

export default InterviewApplicant;
