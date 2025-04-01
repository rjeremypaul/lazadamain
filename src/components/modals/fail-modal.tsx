/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Modal } from "../ui/modal";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { failApplicant } from "@/actions/application";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const FailModal = ({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}) => {
  const params = useParams();
  const [reason, setReason] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (typeof params.applicationId === "string") {
        const response = await failApplicant(
          params.applicationId,
          data.jobApplicant.name,
          data.jobApplicant.email,
          reason
        );
        if (response.error) {
          toast.error(response.error);
        } else {
          toast.success(response.success);
          window.location.assign("/admin/application-management");
        }
      } else {
        toast.error("Invalid application ID");
      }
    } catch (error) {
      toast.error("Failed to fail application");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      description="This action cannot be undone"
      title="Are you sure you want to fail this application?"
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1">
          <Label>
            Reason for Failure <span className="text-red-500">*</span>
          </Label>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            disabled={loading}
            placeholder="Enter Reason for Failure"
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="animate-spin mr-2 w-4 h-4" />}
          Submit Feedback &rarr;
        </Button>
      </form>
    </Modal>
  );
};

export default FailModal;
