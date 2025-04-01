import Heading from "@/components/ui/heading";
import db from "@/lib/db";
import { format } from "date-fns";
import React from "react";
import { QuestionnaireCreationColumn } from "./_components/column";
import QuestionnaireCreationClient from "./_components/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import InterviewApplicant from './_components/interview-applicant';

const QuestionnaireCreation = async () => {
  const datas = await db.questionnaire.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      question: true,
    },
  });

  const formattedData: QuestionnaireCreationColumn[] = datas.map((item) => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      howManyQuestions: item.question.length + " question/s",
      status: item.isPublished,
      createdAt: format(item.createdAt, "MMMM dd, yyyy"),
    };
  });
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Heading
          title="Questionnaire Creation"
          description="Create a new questionnaire for your applicants. You can add, update and delete questions."
        />
        <div className="flex items-center space-x-2">
          <InterviewApplicant />
          <Link href="/admin/questionnaire-creation/create">
            <Button size="sm">
              {" "}
              <PlusCircle />
              Add New Questionnaire
            </Button>
          </Link>
        </div>
      </div>
      <QuestionnaireCreationClient data={formattedData} />
    </div>
  );
};

export default QuestionnaireCreation;
