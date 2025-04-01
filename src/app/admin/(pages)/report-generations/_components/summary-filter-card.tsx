"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { filterReport } from "@/actions/reports";

const SummaryFilterCard = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [filteredData, setFilteredData] = useState({
    total: 0,
    totalApplicants: 0,
    new: 0,
    interviewed: 0,
    evaluated: 0,
  });

  const applyFilter = async () => {
    if (!date) return;

    const formattedDate = format(date, "yyyy-MM-dd");

    try {
      const response = await filterReport(formattedDate);

      if (response) {
        setFilteredData({
          total: response.filteredApplicants.length,
          totalApplicants: response.totalApplicants,
          new: response.filteredApplicants.length,
          interviewed: response.interviewedApplicants.length,
          evaluated: response.evaluatedApplicants.length,
        });
      }

      console.log("response", response);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
      alert("Failed to fetch analytics data. Please try again.");
    }
  };

  console.log("filteredData", filteredData);

  return (
    <Card>
      <CardContent className="p-5">
        <h1 className="text-lg font-bold">Analytics Data</h1>
        <p className="text-muted-foreground text-sm mb-3">
          Filter the analytics data by selecting a date.
        </p>
        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] pl-3 text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                {date ? format(date, "PPP") : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date || undefined}
                onSelect={(date) => date && setDate(date)}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button variant="success" size="sm" onClick={applyFilter}>
            Apply Filter
          </Button>
        </div>
        {/* Display Filtered Data */}
        <h3 className="mt-3 mb-2 text-lg font-semibold">
          Applicants on Selected Date: ({date ? format(date, "PPP") : "N/A"})
        </h3>
        <Separator className="bg-zinc-300" />
        <p className="mt-3 text-md">
          Total Applicants in Database: {filteredData.totalApplicants}
        </p>
        <p className="text-md">
          Applicants on Selected Date: {filteredData.total}
        </p>
        <p className="text-md">New Applicants: {filteredData.new}</p>
        <p className="text-md">
          Interviewed Applicants: {filteredData.interviewed}
        </p>
        <p className="text-md">
          Evaluated Applicants: {filteredData.evaluated}
        </p>
      </CardContent>
    </Card>
  );
};

export default SummaryFilterCard;
