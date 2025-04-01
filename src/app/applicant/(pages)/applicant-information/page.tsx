import React from "react";
import db from "@/lib/db";
import { getApplicantAccount } from "@/hooks/use-applicant";
import SpecificApplicationClient from "./specific-application-client";

const ApplicantInformation = async () => {
  const { applicant } = await getApplicantAccount();
  const data = await db.jobApplication.findFirst({
    where: {
      jobApplicantId: applicant?.jobApplicantId,
    },
    include: {
      jobApplicant: true,
    },
  });
  return (
    <div className="p-6">
      {data ? (
        <SpecificApplicationClient data={data} />
      ) : (
        <div>No data found</div>
      )}
    </div>
  );
};

export default ApplicantInformation;
