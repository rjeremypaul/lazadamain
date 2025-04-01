"use client";

import React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateSchedule } from "@/actions/application";
import { format } from "date-fns";

const SendSchedule = ({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: any | null;
}) => {
  const router = useRouter();
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (data?.interviewDate) {
      const [fullDate, fullTime] = data.interviewDate.split(" at ");
      const formattedDate = new Date(fullDate).toISOString().split("T")[0]; // Converts to "YYYY-MM-DD"

      // Convert time to HH:mm format
      const timeParts = fullTime.match(/(\d+):(\d+) (AM|PM)/);
      if (timeParts) {
        let [_, hours, minutes, period] = timeParts;
        if (period === "PM" && hours !== "12") {
          hours = (parseInt(hours, 10) + 12).toString();
        }
        if (period === "AM" && hours === "12") {
          hours = "00";
        }
        setTime(`${hours.padStart(2, "0")}:${minutes}`);
      }

      setDate(formattedDate);
    }
  }, [data]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Combine date and time into a single Date object
      const [year, month, day] = date.split("-").map(Number); // Extract year, month, day
      const [hour, minute] = time.split(":").map(Number); // Extract hour, minute

      // Create a new Date object in local time
      const localDateTime = new Date(year, month - 1, day, hour, minute);

      // Convert to ISO string for the database
      const isoDateTime = localDateTime.toISOString();

      const res = await updateSchedule({
        interviewDate: isoDateTime,
        id: data.id,
      });

      if (res.success) {
        toast.success(res.success);
        onClose();
        router.refresh();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update interview schedule");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={`Edit Interview Schedule`}
      description="Edit the interview schedule here. You can change the interview date and time."
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={onSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Interview Date</Label>
            <Input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Interview Time</Label>
            <Input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              type="time"
              required
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-3">
          <Button variant="success" type="submit" disabled={loading}>
            Save Changes
          </Button>
          <Button type="button" variant="destructive" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SendSchedule;
