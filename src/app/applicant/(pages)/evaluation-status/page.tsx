import React from "react";
import { getApplicantAccount } from "@/hooks/use-applicant";
import Heading from "@/components/ui/heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const EvaluationStatus = async () => {
  const { applicant } = await getApplicantAccount();
  const practicalTraining = await db.applicantTrainingScore.findFirst({
    where: {
      jobApplicantId: applicant?.jobApplicantId,
    },
  });

  const interview = await db.applicantScore.findMany({
    where: {
      jobApplicantId: applicant?.jobApplicantId,
    },
  });

  const interviewScore =
    interview.reduce((acc, curr) => {
      return acc + curr.score;
    }, 0) / interview.length;

  let interviewStatus;

  if (interviewScore >= 85) {
    interviewStatus = "Passed";
  } else {
    interviewStatus = "Failed";
  }

  const overallScore =
    ((practicalTraining?.totalScore ?? 0) + interviewScore) / 2;
  const overallStatus =
    practicalTraining?.status === "Passed" && interviewStatus === "Passed"
      ? "Passed" // Show Passed if both training and interview status are Passed
      : practicalTraining?.status === "Failed" && interviewStatus === "Failed"
        ? "Failed" // Show Failed if both training and interview status are Failed
        : "Pending"; // Show Pending if any status is pending or incomplete
  return (
    <div className="p-6">
      <Heading
        title="Practical Training & Digital Interview Evaluation"
        description="You can access your practical training, digital interview and overall status here."
      />
      <Table className="mt-5">
        <TableHeader className="border border-zinc-400">
          <TableRow className="border bg-zinc-200 hover:bg-zinc-200 border-zinc-400">
            <TableHead className="border border-zinc-400 text-black">
              Criteria
            </TableHead>
            <TableHead className="border border-zinc-400 text-black">
              Passing/Required Score
            </TableHead>
            <TableHead className="border border-zinc-400 text-black">
              Your Score
            </TableHead>
            <TableHead className="border border-zinc-400 text-black">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border border-zinc-400">
          <TableRow className="border border-zinc-400">
            <TableCell className="border border-zinc-400">
              Practical Training
            </TableCell>
            <TableCell className="border border-zinc-400">85%</TableCell>
            <TableCell className="border border-zinc-400">
              {practicalTraining?.totalScore}%
            </TableCell>
            <TableCell className="border border-zinc-400">
              <Badge
                variant={
                  practicalTraining?.status === "Passed"
                    ? "success"
                    : "destructive"
                }
              >
                {practicalTraining?.status}
              </Badge>
            </TableCell>
          </TableRow>
          <TableRow className="border border-zinc-400">
            <TableCell className="border border-zinc-400">
              Digital Interview
            </TableCell>
            <TableCell className="border border-zinc-400">85%</TableCell>
            <TableCell className="border border-zinc-400">
              {interviewScore}%
            </TableCell>
            <TableCell className="border border-zinc-400">
              <Badge
                variant={
                  interviewStatus === "Passed" ? "success" : "destructive"
                }
              >
                {interviewStatus}
              </Badge>
            </TableCell>
          </TableRow>
          <TableRow className="border border-zinc-400">
            <TableCell className="border border-zinc-400">
              Overall Score
            </TableCell>
            <TableCell className="border border-zinc-400">85%</TableCell>
            <TableCell className="border border-zinc-400">
              {overallScore}%
            </TableCell>
            <TableCell className="border border-zinc-400">
              <Badge
                variant={overallStatus === "Passed" ? "success" : "destructive"}
              >
                {overallStatus}
              </Badge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Separator className="" />
      <p className="mt-4">
        Please bring the following requirements to HR on Logistics within the
        next five (5) business days.
      </p>
      <p>1. NSO or PSA</p>
      <p>2. Valid ID</p>
      <p>3. Updated Resume</p>
      <p>4. 2x2 Picture</p>
    </div>
  );
};

export default EvaluationStatus;
