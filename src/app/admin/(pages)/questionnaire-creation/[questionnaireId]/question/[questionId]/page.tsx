import { ArrowLeft, Eye, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import React from "react";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { IconBadge } from "@/components/globals/icon-badge";
import QuestionTitleForm from './_components/question-title-form';
import QuestionAccessForm from './_components/question-access-form';

const QuestionId = async (
  props: {
    params: Promise<{ questionnaireId: string; questionId: string }>;
  }
) => {
  const params = await props.params;
  const question = await db.question.findUnique({
    where: {
      id: params.questionId,
      questionnaireId: params.questionnaireId,
    },
  });

  if (!question) {
    return redirect(`/admin/questionnaire-creation/${params.questionnaireId}`);
  }

  const requiredFields = [question.question, question.isPublished];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href={`/admin/questionnaire-creation/${params.questionnaireId}`}
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to questionnaire setup
          </Link>
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-bold">Question Creation</h1>
              <span className="text-sm text-slate-700">
                Please complete all required fields. {completionText}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl font-semibold">Customize your question</h2>
            </div>
            <QuestionTitleForm
              initialData={question}
              questionnaireId={params.questionnaireId}
              questionId={params.questionId}
            />
          </div>
        </div>
        <div>
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Eye} />
              <h2 className="text-xl font-semibold">Access settings</h2>
            </div>
            <QuestionAccessForm
              initialData={question}
              questionnaireId={params.questionnaireId}
              questionId={params.questionId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionId;
