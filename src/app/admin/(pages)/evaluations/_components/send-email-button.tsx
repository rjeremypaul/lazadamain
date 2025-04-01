"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { EvaluationsOverallColumn } from "./column";
import AlertModal from "@/components/ui/alert-modal";
import { toast } from "sonner";
import { sendEmailStatus } from "@/actions/employee";

interface SendEmailButtonProps {
  data: EvaluationsOverallColumn;
}

export const SendEmailButton: React.FC<SendEmailButtonProps> = ({ data }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  // generate a number between 86 - 100
  const interviewScore = Math.floor(
    Math.random() * (100 - 86 + 1) + 86
  ).toString();
  const handleSendEmail = async () => {
    setLoading(true);
    try {
      const res = await sendEmailStatus(
        data.name,
        data.accountNumber,
        data.email,
        interviewScore,
        data.interviewStatus,
        data.overallStatus,
        data.trainingScore,
        data.trainingStatus
      );
      if (res.success) {
        toast.success(res.success);
        router.refresh();
        setOpen(false);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send email");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AlertModal
        title="Are you sure you want to send an email?"
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={loading}
        onConfirm={handleSendEmail}
      />
      <Button
        disabled={
          data.overallStatus === "Pending" || data.overallStatus === "Failed"
        }
        onClick={() => setOpen(true)}
        size="sm"
        variant="success"
      >
        <Send />
        Send Email
      </Button>
    </>
  );
};
