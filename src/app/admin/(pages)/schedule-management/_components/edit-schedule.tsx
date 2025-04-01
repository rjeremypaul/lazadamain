"use client";

import React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getScheduleByDate, updateSchedule } from "@/actions/application";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateAllTimes } from "@/lib/utils";

const EditSchedule = ({
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
  const [availableTimes, setAvailableTimes] = React.useState<string[]>([]);
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

  React.useEffect(() => {
    const fetchAvailableTimes = async () => {
      if (!date) return;

      try {
        const res = await getScheduleByDate({ date });
        if (res.error) {
          throw new Error(res.error);
        }

        const scheduledTimes = res.scheduledTimes || [];
        const scheduledCount = res.scheduledCount || 0;

        // Check if more than 10 slots are already scheduled
        if (scheduledCount >= 10) {
          toast.error("You cannot schedule more than 10 slots per day.");
          return;
        }

        // Generate all available times and filter out scheduled ones
        const allTimes = generateAllTimes();
        const available = allTimes.filter(
          (time) => !scheduledTimes.includes(time)
        );

        setAvailableTimes(available);
      } catch (error) {
        console.error("Failed to fetch available times:", error);
        toast.error("Failed to fetch available times");
      }
    };

    fetchAvailableTimes();
  }, [date]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const [year, month, day] = date.split("-").map(Number);
      const [hour, minute] = time
        .split(/:| /)
        .map((value) => (isNaN(Number(value)) ? value : Number(value)));
      const isPM = time.includes("PM");
      const formattedHour =
        isPM && hour !== 12
          ? Number(hour) + 12
          : hour === 12 && !isPM
            ? 0
            : Number(hour);

      const localDateTime = new Date(
        year,
        month - 1,
        day,
        Number(formattedHour),
        Number(minute)
      );
      const isoDateTime = localDateTime.toISOString();

      // Check how many slots are already scheduled for the selected date
      const res = await getScheduleByDate({ date });
      if ((res.scheduledCount ?? 0) >= 10) {
        toast.error("You cannot add more than 10 slots for this date.");
        return;
      }

      // Proceed with updating the schedule
      const updateRes = await updateSchedule({
        interviewDate: isoDateTime,
        id: data.id,
      });

      if (updateRes.success) {
        toast.success(updateRes.success);
        onClose();
        router.refresh();
      } else {
        toast.error(updateRes.error);
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
            <Select
              defaultValue={time}
              onValueChange={(value) => setTime(value)}
              disabled={!availableTimes.length}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {availableTimes.map((availableTime) => (
                  <SelectItem key={availableTime} value={availableTime}>
                    {availableTime}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

export default EditSchedule;
