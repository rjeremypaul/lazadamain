import React from "react";
import db from "@/lib/db";
import TrainingForm from "./training-form";

const TrainingId = async (props: {
  params: Promise<{ trainingId: string }>;
}) => {
  const params = await props.params;
  const training = await db.trainingOnsite.findUnique({
    where: {
      id: params.trainingId,
    },
  });
  return (
    <div className="p-6">
      <TrainingForm initialData={training} />
    </div>
  );
};

export default TrainingId;
