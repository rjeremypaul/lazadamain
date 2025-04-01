import React from "react";
import db from "@/lib/db";
import Heading from "@/components/ui/heading";
import { getApplicantAccount } from "@/hooks/use-applicant";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  Calendar as CalendarIcon,
  ClockIcon,
  Map,
  User,
} from "lucide-react";
import { format } from "date-fns";

const InterviewSchedule = async () => {
  const { applicant } = await getApplicantAccount();
  const schedule = await db.interviewSchedule.findFirst({
    where: { jobApplicantId: applicant?.jobApplicantId },
  });
  return (
    <div className="p-6">
      <Heading
        title="Interview Schedule"
        description="Check the schedule of your interview here."
      />
      <Card className="mt-3">
        <CardContent className="p-4">
          {schedule ? (
            <div className="grid md:grid-cols-5 grid-cols-1 gap-4">
              <div className="md:col-span-4">
                <p className="text-xl font-semibold">
                  Your interview schedule for Lazada Expedise
                </p>
                <p className="text-sm text-muted-foreground">
                  Please bring this information with you when you visit the
                  office for your interview.
                </p>
                <div className="flex flex-col mt-5 space-y-2">
                  <div className="flex md:flex-row flex-col md:items-center gap-3">
                    <User size={18} />
                    <p>
                      {applicant?.jobApplicant.name} -{" "}
                      {applicant?.accountNumber}
                    </p>
                  </div>
                  <div className="flex md:flex-row flex-col md:items-center gap-3">
                    <CalendarIcon size={18} />
                    <p>
                      {schedule?.interviewDate
                        ? format(
                            new Date(schedule.interviewDate),
                            "MMMM dd, yyyy"
                          )
                        : ""}
                    </p>
                  </div>
                  <div className="flex md:flex-row flex-col md:items-center gap-3">
                    <ClockIcon size={18} />
                    <p>
                      {schedule?.interviewDate
                        ? format(new Date(schedule.interviewDate), "hh:mm a")
                        : ""}
                    </p>
                  </div>
                  <div className="flex md:flex-row flex-col md:items-center gap-3">
                    <Map size={18} />
                    <p>Lazada Logistics Office, 123 Business Road</p>
                  </div>
                  <div className="flex md:flex-row flex-col md:items-start gap-3">
                    <AlertTriangle size={18} className="mt-1" />
                    <p className="md:w-[700px] w-full">
                      After completing your interview, you will proceed to
                      practical training inside the warehouse. Once you
                      successfully complete the training, you will have digital
                      interview, and your performance will be evaluated by the
                      HR Admin. We will notify you if you are accepted for the
                      job.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-red-600">
              No interview schedule found.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewSchedule;
