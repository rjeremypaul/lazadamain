"use client";

import { JobApplicant, JobApplication } from "@prisma/client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { createAccount } from "@/actions/application";

interface ApplicationEvaluation extends JobApplication {
  jobApplicant: JobApplicant;
}

const AccountModal = ({ data }: { data: ApplicationEvaluation }) => {
  const [accountNumber, setAccountNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [adminNotice, setAdminNotice] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    // Generate unique account number
    const timestamp = Date.now();
    const uniqueAccountNumber = `ACC${timestamp}`;
    setAccountNumber(uniqueAccountNumber);

    // Generate random password
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let generatedPassword = "";
    for (let i = 0; i < 8; i++) {
      generatedPassword += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setPassword(generatedPassword);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createAccount(
        {
          accountNumber,
          password,
          adminNotice,
        },
        data.jobApplicant.email,
        data.jobApplicant.name,
        data.jobApplicantId
      );

      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(response.success);
        window.location.assign("/admin/application-management");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create account");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-1">
        <Label>Account Number <span className="text-red-500">*</span></Label>
        <Input
          value={accountNumber}
          disabled={loading}
          readOnly
          placeholder="Account Number"
        />
      </div>
      <div className="space-y-1">
        <Label>Password <span className="text-red-500">*</span></Label>
        <Input
          value={password}
          disabled={loading}
          readOnly
          placeholder="Password"
        />
      </div>
      <Separator />
      <div className="space-y-1">
        <Label>Admin Notice for {data.jobApplicant.name} <span className="text-red-500">*</span></Label>
        <Textarea
          value={adminNotice}
          onChange={(e) => setAdminNotice(e.target.value)}
          placeholder="Enter Admin Notice"
          disabled={loading}
          required
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
        Send Account &rarr;
      </Button>
    </form>
  );
};

export default AccountModal;
