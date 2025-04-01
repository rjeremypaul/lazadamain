import React from "react";
import db from "@/lib/db";
import { getApplicantAccount } from "@/hooks/use-applicant";
import { format } from "date-fns";

const Notification = async () => {
  const { applicant } = await getApplicantAccount();
  const data = await db.notification.findMany({
    where: {
      accountNumber: applicant?.accountNumber,
    },
  });
  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-bold">Notifications ({data.length})</h1>
        <div className="mt-4">
          {data.map((notification) => {
            return (
              <div
                key={notification.id}
                className="p-4 bg-gray-100 rounded-lg mt-2"
              >
                <h2 className="text-lg font-bold">{notification.title}</h2>
                <p className="mt-1">{notification.description}</p>
                <p className="text-sm mt-3 text-muted-foreground">
                  Date Created: {format(notification.createdAt, "MMMM dd, yyyy")}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notification;
