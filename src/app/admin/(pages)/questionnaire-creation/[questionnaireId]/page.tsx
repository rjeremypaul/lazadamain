import React from "react";
import { redirect } from "next/navigation";
import { LayoutDashboard, ListCheck } from "lucide-react";
import db from "@/lib/db";
import { IconBadge } from "@/components/globals/icon-badge";
import TitleForm from "./_components/title-form";
import QuestionForm from "./_components/question-form";
import DescriptionForm from "./_components/description-form";
import Banner from "@/components/globals/banner";
import Actions from "./_components/actions";
import Link from 'next/link';

const QuestionnaireId = async (props: {
  params: Promise<{ questionnaireId: string }>;
}) => {
  const params = await props.params;
  const questionnaire = await db.questionnaire.findUnique({
    where: {
      id: params.questionnaireId,
    },
    include: {
      question: true,
    },
  });

  if (!questionnaire) {
    return redirect("/admin/questionnaire-creation");
  }

  const requiredFields = [
    questionnaire.title,
    questionnaire.description,
    questionnaire.question.some((item) => item.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);
  return (
    <>
      {!questionnaire.isPublished && (
        <Banner
          variant="warning"
          label="This questionnaire is unpublished. It will not be visible to the applicant."
        />
      )}

      {questionnaire.isPublished && (
        <Banner
          variant="success"
          label="This questionnaire is published. It will be visible to the applicant."
        />
      )}
      <div className="p-6">
        <Link className='underline hover:text-primary' href="/admin/questionnaire-creation">&larr; Go back to the questionnaire record</Link>
        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-bold">Questionnaire Setup</h1>
            <span className="text-sm text-slate-700">
              Please complete all required fields. {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            questionnaireId={params.questionnaireId}
            isPublished={questionnaire.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex gap-x-2 items-center">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl font-semibold">
                Customize your questionnaire
              </h2>
            </div>
            <TitleForm
              initialData={questionnaire}
              questionnaireId={questionnaire.id}
            />
            <DescriptionForm
              initialData={questionnaire}
              questionnaireId={questionnaire.id}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListCheck} />
                <h2 className="text-xl font-semibold">Questionnaire items</h2>
              </div>
              <QuestionForm
                initialData={questionnaire}
                questionnaireId={questionnaire.id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionnaireId;
