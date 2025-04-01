"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { ScheduleManagementColumn, columns } from "./column";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { format, parse } from "date-fns";
import { Modal } from "@/components/ui/modal";

interface ScheduleManagementClientProps {
  data: ScheduleManagementColumn[];
}

const ScheduleManagementClient: React.FC<ScheduleManagementClientProps> = ({
  data,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const slotsPerDay = 10;

  // Helper function to check available slots for a specific day
  const getAvailableSlots = (date: string) => {
    const scheduledSlots = data.filter((item) => {
      // Parse the interview date to compare
      const parsedDate = parse(
        item.interviewDate,
        "MMMM dd, yyyy 'at' h:mm a",
        new Date()
      );
      const formattedDate = format(parsedDate, "yyyy-MM-dd");
      return formattedDate === date;
    }).length;

    return slotsPerDay - scheduledSlots;
  };

  // Group by date and create a single event for each day with available slots
  const events = Array.from(
    new Set(
      data.map((item) => {
        const parsedDate = parse(
          item.interviewDate,
          "MMMM dd, yyyy 'at' h:mm a",
          new Date()
        );
        const formattedDate = format(parsedDate, "yyyy-MM-dd"); // Standardize to YYYY-MM-DD

        return formattedDate;
      })
    )
  ).map((date) => {
    const availableSlots = getAvailableSlots(date);
    return {
      title: `Slots left: ${availableSlots}`,
      date: date, // Use the standardized date for the calendar
    };
  });

  // Filter data based on selected date
  const filteredData = selectedDate
    ? data.filter((item) => {
        const parsedDate = parse(
          item.interviewDate,
          "MMMM dd, yyyy 'at' h:mm a",
          new Date()
        );
        const formattedDate = format(parsedDate, "yyyy-MM-dd");
        return formattedDate === selectedDate;
      })
    : [];

  return (
    <>
      <Modal
        className="max-w-4xl"
        title="Scheduled Interviews"
        description={`Scheduled interviews on ${selectedDate}`}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <table className="w-full text-left border p-2 border-collapse">
          <thead className="border bg-gray-100">
            <tr className="border">
              <th className="border p-2">Name</th>
              <th className="border p-2">Account Number</th>
              <th className="border p-2">Interview Date</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody className="border">
            {filteredData.map((item, index) => {
              const parsedDate = parse(
                item.interviewDate,
                "MMMM dd, yyyy 'at' h:mm a",
                new Date()
              );
              const currentDate = new Date();
              const status =
                parsedDate < currentDate ? "Interviewed" : "For Interview"; // Compare interview date with current date

              return (
                <tr key={index}>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.accountNumber}</td>
                  <td className="border p-2">{item.interviewDate}</td>
                  <td className="border p-2">{status}</td>{" "}
                  {/* Show the status */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Modal>

      <DataTable searchKey="name" columns={columns} data={data} />

      <div className="my-8">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={(info) => {
            setSelectedDate(
              info.event.start ? format(info.event.start, "yyyy-MM-dd") : ""
            );
            setIsOpen(true); // Open the modal when a date is clicked
          }}
          eventContent={(eventInfo) => (
            <div>
              <strong>{eventInfo.event.title}</strong>
            </div>
          )}
        />
      </div>
    </>
  );
};

export default ScheduleManagementClient;
