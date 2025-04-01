import React from "react";
import Heading from "@/components/ui/heading";
import db from "@/lib/db";
import InterviewQuestionForm from "../_components/interview-question-form";

const InterviewApplicant = async (
  props: {
    params: Promise<{ questionnaireId: string; applicantId: string }>;
  }
) => {
  const params = await props.params;
  const applicant = await db.jobApplicant.findUnique({
    where: {
      id: params.applicantId,
    },
    include: {
      applicantAccount: true,
      jobApplication: true,
    },
  });

  const questionnaire = await db.questionnaire.findUnique({
    where: {
      id: params.questionnaireId,
    },
    include: {
      question: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });
  return (
    <div className="p-6">
      <Heading
        title="Job Applicant Digital Interview Questions"
        description="Please answer the following questions to proceed with the interview."
      />
      <InterviewQuestionForm
        applicant={applicant}
        questionnaire={questionnaire}
      />
    </div>
  );
};

export default InterviewApplicant;
