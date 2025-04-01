import React from "react";
import Heading from "@/components/ui/heading";
import ProgressBar from "./_components/progress-bar";
import db from "@/lib/db";
import { getApplicantAccount } from "@/hooks/use-applicant";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

const MyProgress = async () => {
  const { applicant } = await getApplicantAccount();

  const application = await db.jobApplication.findFirst({
    where: {
      jobApplicantId: applicant?.jobApplicantId,
    },
    include: {
      jobApplicant: {
        include: {
          applicantAccount: true,
        },
      },
    },
  });

  const watchedVideo = await db.watchedVideo.findMany({
    where: {
      jobApplicantId: applicant?.jobApplicantId,
    },
  });

  const onsite = await db.applicantTrainingScore.findMany({
    where: {
      jobApplicantId: applicant?.jobApplicantId,
    },
  });

  const digitalInterview = await db.applicantAnswer.findMany({
    where: {
      jobApplicantId: applicant?.jobApplicantId,
    },
  });

  let step = 1;

  // Check if all steps are completed and move to step 6
  if (
    digitalInterview.some((interview) => interview.status === "Passed") &&
    application?.status === "Finalized"
  ) {
    step = 6; // Final step
  } else if (
    digitalInterview.some((interview) => interview.status === "Passed")
  ) {
    step = 5;
  } else if (onsite.some((o) => o.status === "Passed")) {
    step = 4;
  } else if (watchedVideo.some((video) => video.status === "Watched")) {
    step = 3;
  } else if (application?.status === "Passed") {
    step = 2;
  } else if (application?.status === "Failed") {
    step = 1;
  }

  return (
    <div className="p-6">
      <Heading
        title="My Application Progress"
        description="Check the progress of your application here."
      />
      <ProgressBar step={step} />

      {step === 1 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Position Applied</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                {application?.jobApplicant.applicantAccount[0].accountNumber}
              </TableCell>
              <TableCell>{application?.jobApplicant.name}</TableCell>
              <TableCell>{application?.positionApplied}</TableCell>
              <TableCell>
                {application?.status === "Passed"
                  ? "Application Form Passed"
                  : "Application Form Pending"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      {step === 2 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Position Applied</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                {application?.jobApplicant.applicantAccount[0].accountNumber}
              </TableCell>
              <TableCell>{application?.jobApplicant.name}</TableCell>
              <TableCell>{application?.positionApplied}</TableCell>
              <TableCell>
                {watchedVideo.some((video) => video.status === "Watched")
                  ? "For Interview"
                  : "Not Completed"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      {step === 3 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Position Applied</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                {application?.jobApplicant.applicantAccount[0].accountNumber}
              </TableCell>
              <TableCell>{application?.jobApplicant.name}</TableCell>
              <TableCell>{application?.positionApplied}</TableCell>
              <TableCell>
                {onsite.some((onsite) => onsite.status === "Passed")
                  ? "Passed"
                  : "Failed"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      {step === 4 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Position Applied</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                {application?.jobApplicant.applicantAccount[0].accountNumber}
              </TableCell>
              <TableCell>{application?.jobApplicant.name}</TableCell>
              <TableCell>{application?.positionApplied}</TableCell>
              <TableCell>
                {onsite.some((onsite) => onsite.status === "Passed")
                  ? "Completed"
                  : "Not Completed"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      {step === 5 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Position Applied</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                {application?.jobApplicant.applicantAccount[0].accountNumber}
              </TableCell>
              <TableCell>{application?.jobApplicant.name}</TableCell>
              <TableCell>{application?.positionApplied}</TableCell>
              <TableCell>
                {digitalInterview.some(
                  (interview) => interview.status === "Passed"
                )
                  ? "Completed"
                  : "Not Completed"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      {step === 6 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Position Applied</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                {application?.jobApplicant.applicantAccount[0].accountNumber}
              </TableCell>
              <TableCell>{application?.jobApplicant.name}</TableCell>
              <TableCell>{application?.positionApplied}</TableCell>
              <TableCell>Waiting For Final Evaluation</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default MyProgress;
