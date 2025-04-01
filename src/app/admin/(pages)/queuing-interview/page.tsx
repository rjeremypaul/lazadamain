import Heading from "@/components/ui/heading";
import db from "@/lib/db";
import React from "react";
import { QueuingInterviewColumn } from "./_components/column";
import QueuingInterviewClient from "./_components/client";

const QueuingInterview = async () => {
  const datas = await db.jobApplication.findMany({
    where: {
      status: "Passed",
    },
    include: {
      jobApplicant: {
        include: {
          applicantAccount: true,
		  applicantScore: {
			orderBy: {
				score: "desc"
			}
		  },
        },
      },
    },
  });

  const formattedData: QueuingInterviewColumn[] = datas.map((item, index) => {
    return {
      id: item.id,
      rank: index + 1,
      name: item.jobApplicant.name,
      accountNumber: item.jobApplicant.applicantAccount[0]?.accountNumber ?? "N/A",
      email: item.jobApplicant.email ?? "",
      score: item.jobApplicant.applicantScore[0].score,
      status: item.jobApplicant.applicantScore[0].status,
    };
  });
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Heading
          title="Queuing Interview List for the Most Qualified Applicants"
          description="List of applicants who passed the initial screening and are now queued for the interview."
        />
      </div>
      <QueuingInterviewClient data={formattedData} />
    </div>
  );
};

export default QueuingInterview;
