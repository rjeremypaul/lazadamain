"use client";

import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { submitAnswers } from "@/actions/employee";

const InterviewQuestionForm = ({
  applicant,
  questionnaire,
}: {
  applicant: any;
  questionnaire: any;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = questionnaire.question.map((question: any) => ({
      questionId: question.id,
      answer: answers[question.id] || "",
      jobApplicantId: applicant.id,
    }));

    try {
      const res = await submitAnswers(payload);
      if (res.success) {
        toast.success(res.success);
        router.push("/admin/questionnaire-creation");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error("Failed to submit answers");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="mt-5 border bg-white shadow-lg p-5 rounded-lg">
      <h3 className="text-sm">Welcome, {applicant.name}!</h3>
      <h1 className="font-bold text-2xl mt-3">{questionnaire.title}</h1>
      <p className="text-sm text-muted-foreground">
        {questionnaire.description}
      </p>
      <div>
        <form onSubmit={handleSubmit}>
          {questionnaire.question.map((question: any, index: number) => {
            return (
              <div key={question.id} className="mt-5">
                <h3 className="text-sm">
                  {index + 1}. {question.question}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {question.description}
                </p>
                <Textarea
                  value={answers[question.id] || ""}
                  onChange={(e) =>
                    handleAnswerChange(question.id, e.target.value)
                  }
                  disabled={isLoading}
                  className="mt-3 w-full bg-gray-100 p-3 rounded-lg"
                  placeholder="Type your answer here..."
                />
              </div>
            );
          })}
          <Button disabled={isLoading} className="mt-4" type="submit">
            Submit Answers
          </Button>
        </form>
      </div>
    </div>
  );
};

export default InterviewQuestionForm;
