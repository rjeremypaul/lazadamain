import Heading from "@/components/ui/heading";
import db from "@/lib/db";
import React from "react";
import { ScheduleManagementColumn } from "./_components/column";
import ScheduleManagementClient from "./_components/client";
import { format } from "date-fns";

const ScheduleManagement = async () => {
  const datas = await db.interviewSchedule.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      jobApplicant: {
        include: {
          applicantAccount: true,
        },
      },
    },
  });

  const formattedData: ScheduleManagementColumn[] = datas.map((item, index) => {
    return {
      id: item.id,
      name: item.jobApplicant.name,
      accountNumber: item.jobApplicant.applicantAccount[0]?.accountNumber ?? "N/A",
      email: item.jobApplicant.email ?? "",
      interviewDate: format(item.interviewDate, "MMMM dd, yyyy 'at' h:mm a"),
    };
  });
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Heading
          title="Interview Schedule Management"
          description="Manage all interview schedules here. You can edit, and send the schedule to the applicant."
        />
      </div>
      <ScheduleManagementClient data={formattedData} />
    </div>
  );
};

export default ScheduleManagement;
