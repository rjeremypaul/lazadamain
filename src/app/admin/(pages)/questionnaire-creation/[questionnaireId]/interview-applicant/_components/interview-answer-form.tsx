"use client";

import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { submitAnswers, submitEvaluations } from "@/actions/employee";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const InterviewAnswerForm = ({
  applicant,
  questionnaire,
}: {
  applicant: any;
  questionnaire: any;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [statusMap, setStatusMap] = React.useState<Record<string, string>>({});
  const [feedbackMap, setFeedbackMap] = React.useState<Record<string, string>>(
    {}
  );

  const isButtonDisabled = questionnaire?.question?.some((question: any) => {
    const applicantAnswer = question.applicantAnswer?.[0];
    return (
      applicantAnswer?.status !== null && applicantAnswer?.status !== undefined
    );
  });

  const handleStatusChange = (questionId: string, value: string) => {
    setStatusMap((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = questionnaire.question.map((question: any) => {
      const applicantAnswer = question.applicantAnswer?.[0] || null;
      return {
        questionId: question.id,
        applicantAnswerId: applicantAnswer ? applicantAnswer.id : null, // Handle undefined
        status: statusMap[question.id] || "",
        feedback: feedbackMap[question.id] || "",
        jobApplicantId: applicant.id,
      };
    });

    if (
      Object.values(statusMap).includes("Failed") &&
      !Object.values(feedbackMap).some(Boolean)
    ) {
      toast.error("Please provide feedback for failed statuses.");
      setIsLoading(false);
      return;
    }

    console.log("Payload:", payload);

    try {
      const res = await submitEvaluations(payload);
      if (res.success) {
        toast.success(res.success);
        setStatusMap({});
        setFeedbackMap({});
        router.push("/admin/evaluations");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error("Failed to submit evaluation");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!questionnaire && (
        <Badge variant="secondary" className="text-red-700 font-semibold mt-2">
          Applicant did not answer yet
        </Badge>
      )}
      {questionnaire &&
        questionnaire.question &&
        questionnaire.question.length > 0 && (
          <div className="mt-5 border bg-white shadow-lg p-5 rounded-lg">
            <h1 className="font-bold text-2xl mt-3">{questionnaire.title}</h1>
            <p className="text-sm text-muted-foreground">
              {questionnaire.description}
            </p>
            <h3 className="text-sm mt-5">
              <b>Applicant's Name</b>: {applicant?.name}
            </h3>
            <h3 className="text-sm mt-1">
              <b>Email Address</b>: {applicant?.email}
            </h3>
            <h3 className="text-sm mt-1">
              <b>Account Number</b>:{" "}
              {applicant?.applicantAccount?.[0]?.accountNumber}
            </h3>
            <form onSubmit={handleSubmit}>
              {questionnaire.question.map((question: any, index: number) => {
                const applicantAnswer = question.applicantAnswer?.[0] || {};
                return (
                  <div key={question.id} className="mt-5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm">
                        {index + 1}. {question.question}
                      </h3>
                      {applicantAnswer.status ? (
                        <p
                          className={`${
                            applicantAnswer.status === "Passed"
                              ? "text-green-700"
                              : "text-red-700"
                          }`}
                        >
                          {applicantAnswer.status === "Passed"
                            ? "(Passed)"
                            : `(${applicantAnswer.status} due to ${applicantAnswer.reason})`}
                        </p>
                      ) : (
                        <Select
                          onValueChange={(value) =>
                            handleStatusChange(question.id, value)
                          }
                          disabled={isLoading}
                        >
                          <SelectTrigger
                            className={`w-[180px] text-black ${
                              statusMap[question.id] === "Failed"
                                ? "bg-red-700 text-white"
                                : statusMap[question.id] === "Passed"
                                  ? "bg-green-700 text-white"
                                  : "bg-gray-100"
                            }`}
                          >
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Passed">Passed</SelectItem>
                            <SelectItem value="Failed">Failed</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                    {statusMap[question.id] === "Failed" && (
                      <Textarea
                        value={feedbackMap[question.id]}
                        onChange={(e) =>
                          setFeedbackMap((prev) => ({
                            ...prev,
                            [question.id]: e.target.value,
                          }))
                        }
                        disabled={isLoading}
                        className="mb-3 mt-2 w-full bg-gray-100 p-3 rounded-lg"
                        placeholder="Please provide comments here..."
                      />
                    )}
                    <p className="text-muted-foreground italic">
                      Applicant's Answer: {applicantAnswer.answer}
                    </p>
                  </div>
                );
              })}
              <Button
                disabled={isLoading || isButtonDisabled}
                className="mt-4"
                type="submit"
              >
                Submit Evaluation
              </Button>
            </form>
          </div>
        )}
    </>
  );
};

export default InterviewAnswerForm;
