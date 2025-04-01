"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Edit, View } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { ScheduleManagementColumn } from "./column";
import EditSchedule from "./edit-schedule";
import AlertModal from "@/components/ui/alert-modal";
import { toast } from "sonner";
import { sendSchedule } from '@/actions/application';

interface CellActionProps {
  data: ScheduleManagementColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [editOpen, setEditOpen] = React.useState(false);
  const [sendOpen, setSendOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSend = async () => {
    setLoading(true);
    try {
      const res = await sendSchedule(data.name, data.interviewDate, data.email, data.accountNumber);
      if (res.success) {
        toast.success(res.success);
        setSendOpen(false);
        router.refresh();
      } else {
        toast.error("Failed to send schedule");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send schedule");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <EditSchedule
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        data={data}
      />
      <AlertModal
        isOpen={sendOpen}
        title="Are you sure you want to send this to the applicant?"
        onClose={() => setSendOpen(false)}
        loading={loading}
        onConfirm={handleSend}
      />
      <Button
        onClick={() => setEditOpen(true)}
        variant="success"
        size="sm"
        className="mr-2"
      >
        <Edit className="w-4 h-4" />
        Edit
      </Button>
      <Button onClick={() => setSendOpen(true)} size="sm">
        <Calendar className="w-4 h-4" />
        Send Schedule
      </Button>
    </>
  );
};
