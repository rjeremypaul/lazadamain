import React from "react";
import Heading from "@/components/ui/heading";
import db from "@/lib/db";
import InterviewAnswerForm from "../../_components/interview-answer-form";

const CheckInterview = async (
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
        include: {
          applicantAnswer: true
        },
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
        title="HR Digital Interview Evaluations"
        description="Please evaluate the following answers of the applicant. You can also add your own comments if failed."
      />
      <InterviewAnswerForm
        applicant={applicant}
        questionnaire={questionnaire}
      />
    </div>
  );
};

export default CheckInterview;
