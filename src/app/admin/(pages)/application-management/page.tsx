import Heading from "@/components/ui/heading";
import db from "@/lib/db";
import { format } from "date-fns";
import React from "react";
import { ApplicationManagementColumn } from "./_components/column";
import ApplicationManagementClient from "./_components/client";

const ApplicationManagement = async () => {
  const datas = await db.jobApplication.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      jobApplicant: true,
    },
  });

  const formattedData: ApplicationManagementColumn[] = datas.map((item) => {
    return {
      id: item.id,
      name: item.jobApplicant.name,
      email: item.jobApplicant.email,
      imageUrl: item.jobApplicant.profileImage ?? "",
      status: item.status,
      createdAt: format(item.createdAt, "MMMM dd, yyyy"),
    };
  });
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Heading
          title="Application Management"
          description="Manage and track job applications seamlessly. Review, filter, and process applications from candidates applying to various roles in our recruitment system."
        />
      </div>
      <ApplicationManagementClient data={formattedData} />
    </div>
  );
};

export default ApplicationManagement;
