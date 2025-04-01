"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { EvaluationsInterviewedColumn } from "./column";

interface InterviewButtonProps {
  data: EvaluationsInterviewedColumn;
}

export const InterviewButton: React.FC<InterviewButtonProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <Button
        onClick={() =>
          router.push(
            `/admin/questionnaire-creation/${data.questionnaireId}/interview-applicant/${data.id}/check-interview`
          )
        }
        size="sm"
        variant="success"
      >
        <CheckCircle />
        Check Interview
      </Button>
    </>
  );
};
