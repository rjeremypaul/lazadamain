"use client";

import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getMonthlyApplicantCounts } from "@/actions/reports";

const chartConfig = {
  applicant: {
    label: "Applicants",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const LineChartCard = () => {
  const [chartData, setChartData] = useState<
    { month: string; applicant: number }[]
  >([]);
  const [trend, setTrend] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMonthlyApplicantCounts();
        console.log("Data", data);

        // Create an array for all months from Jan to Dec with default value 0
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        // Aggregate data by month
        const aggregatedData = months.map((month) => {
          // Filter all entries for the current month and sum the applicants
          let applicantCount = 0;
          if (Array.isArray(data)) {
            const monthApplicants = data.filter((item) => item.month === month);
            applicantCount = monthApplicants.reduce(
              (acc, curr) => acc + curr.applicant,
              0
            );
          }

          return { month, applicant: applicantCount };
        });

        setChartData(aggregatedData);

        // Calculate trend percentage
        if (aggregatedData.length > 1) {
          const lastMonth =
            aggregatedData[aggregatedData.length - 2].applicant || 0;
          const thisMonth =
            aggregatedData[aggregatedData.length - 1].applicant || 0;

          // Avoid division by zero by checking if lastMonth is zero
          if (lastMonth === 0) {
            setTrend(thisMonth > 0 ? 100 : 0); // 100% increase if lastMonth is 0 and thisMonth is > 0, else 0% if both are 0
          } else {
            const change = ((thisMonth - lastMonth) / lastMonth) * 100;
            setTrend(change);
          }
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Applicants Summary</CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <ChartContainer className="w-full h-[40vh] p-5" config={chartConfig}>
          <LineChart
            height={300}
            width={850}
            accessibilityLayer
            data={chartData}
            margin={{
              top: 40,
              left: 20,
              right: 10,
            }}
          >
            <XAxis
              dataKey="month"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="applicant"
              type="natural"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={{
                fill: "hsl(var(--chart-1))",
              }}
              activeDot={{
                r: 4,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {trend !== null
            ? `Trending ${trend > 0 ? "up" : "down"} by ${Math.abs(
                parseFloat(trend.toFixed(2))
              )}% this month`
            : "No data available"}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total applicants for the current year
        </div>
      </CardFooter>
    </Card>
  );
};

export default LineChartCard;
