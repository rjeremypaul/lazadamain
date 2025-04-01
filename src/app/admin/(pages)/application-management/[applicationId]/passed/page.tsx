import AccountModal from "@/components/modals/account-modal";
import { Modal } from "@/components/ui/modal";
import db from "@/lib/db";
import React from "react";

const AccountCreation = async (
  props: {
    params: Promise<{
      applicationId: string;
    }>;
  }
) => {
  const params = await props.params;
  const data = await db.jobApplication.findFirst({
    where: {
      id: params.applicationId,
    },
    include: {
      jobApplicant: true,
    },
  });

  return (
    <Modal
      title={`Create Account For ${data?.jobApplicant.name}`}
      description="Create an account for the applicant. The system provides the applicant with a temporary password that they can change later."
      isOpen
    >
      {data && <AccountModal data={data} />}
    </Modal>
  );
};

export default AccountCreation;
