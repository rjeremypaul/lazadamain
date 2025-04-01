/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { JobApplicant, JobApplication } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface ApplicationEvaluation extends JobApplication {
  jobApplicant: JobApplicant;
}

const SpecificApplicationClient = ({
  data,
}: {
  data: ApplicationEvaluation;
}) => {
  return (
    <>
      <h3 className="text-xl font-semibold text-blue-700">
        Your Application Information
      </h3>
      <Card className="mt-3">
        <CardContent className="p-5">
          <p className="text-blue-700 font-semibold">Personal Information</p>
          <Image
            className="mt-2 rounded-full"
            src={data.jobApplicant.profileImage || ""}
            alt={data.jobApplicant.name}
            width={100}
            height={100}
          />
          <p className="mt-3">
            <span className="font-semibold">Name:</span>{" "}
            {data.jobApplicant.name}
          </p>
          <p className="mt-1">
            <span className="font-semibold">Email:</span>{" "}
            {data.jobApplicant.email}
          </p>
          <p className="mt-1">
            <span className="font-semibold">Age:</span> {data.jobApplicant.age}
          </p>
          <p className="mt-1">
            <span className="font-semibold">Sex:</span> {data.jobApplicant.sex}
          </p>
          <p className="mt-1">
            <span className="font-semibold">Address:</span>{" "}
            {data.jobApplicant.address}
          </p>
          <p className="mt-1">
            <span className="font-semibold">Contact Number:</span>{" "}
            {data.jobApplicant.contactNumber}
          </p>
          <div className="mt-3 flex flex-col gap-1">
            <span className="font-semibold">Experience (Years):</span>
            <Input readOnly value={data.jobApplicant.totalYearExperience} />
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <span className="font-semibold">Highest Role Achieved:</span>
            <Input readOnly value={data.jobApplicant.highestRoleAchieved} />
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <span className="font-semibold">Field of Expertise:</span>
            <Input readOnly value={data.jobApplicant.fieldOfExpertise} />
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <span className="font-semibold">Awards (if any):</span>
            <Input readOnly value={data.jobApplicant.awards ?? "N/A"} />
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <span className="font-semibold">Company Name:</span>
            <Input readOnly value={data.jobApplicant.companyName} />
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <span className="font-semibold">Job Role/Position:</span>
            <Input readOnly value={data.jobApplicant.jobPosition} />
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <span className="font-semibold">Years of Experience:</span>
            <Input readOnly value={data.jobApplicant.yearsWorkedInCompany} />
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <span className="font-semibold">Certification Received:</span>
            <Input readOnly value={data.jobApplicant.certificate ?? "N/A"} />
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <span className="font-semibold">Company Name:</span>
            <Input readOnly value={data.jobApplicant.logisticsCompany} />
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <span className="font-semibold">Years of Experience:</span>
            <Input readOnly value={data.jobApplicant.logisticsYearsWorked} />
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <span className="font-semibold">Degree/Undergraduate Status:</span>
            <Input readOnly value={data.jobApplicant.degreeStatus} />
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <span className="font-semibold">Year Graduated:</span>
            <Input readOnly value={data.jobApplicant.yearGraduated} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SpecificApplicationClient;
