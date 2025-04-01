import React from "react";
import db from "@/lib/db";
import Heading from "@/components/ui/heading";
import OnsiteTrainingComponent from "./onsite-training-component";

const TrainingApplicantOnsite = async (
  props: {
    params: Promise<{ applicantId: string }>;
  }
) => {
  const params = await props.params;
  const applicant = await db.jobApplicant.findUnique({
    where: {
      id: params.applicantId,
    },
    include: {
      applicantAccount: true,
      applicantTraining: true,
      applicantTrainingScore: true,
    },
  });

  const onsiteTraining = await db.trainingOnsite.findMany({
    include: {
      applicantTraining: true,
    },
  });
  return (
    <div className="p-6">
      <Heading title="Practical Onsite Training Evaluation" description="" />
      <OnsiteTrainingComponent
        applicant={applicant}
        onsiteTraining={onsiteTraining}
      />
    </div>
  );
};

export default TrainingApplicantOnsite;
