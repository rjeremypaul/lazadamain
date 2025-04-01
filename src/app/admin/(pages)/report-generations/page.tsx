"use client";

import React, { useEffect } from "react";
import Heading from "@/components/ui/heading";
import ReportCard from "./_components/report-card";
import { BrainCog, FileText, UsersRound, Video, Printer } from "lucide-react";
import db from "@/lib/db";
import LineChartCard from "./_components/line-chart-card";
import SummaryFilterCard from "./_components/summary-filter-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
    <h3 className="text-red-800 font-medium">Error loading data</h3>
    <p className="text-red-600 text-sm">{error.message}</p>
  </div>
);

const ReportGenerations = () => {
  const [metrics, setMetrics] = React.useState({
    applicants: 22,
    videos: 15,
    interviewed: 15,
    trained: 16,
    date: "April 1st, 2025"
  });

  const [isLoading, setIsLoading] = React.useState(false);

  // Print functionality
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        handlePrint();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePrint = () => {
    const originalContents = document.body.innerHTML;
    const printableElement = document.getElementById('printable-area');
    
    if (printableElement) {
      const printContents = printableElement.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  const cards = [
    {
      title: "Total Applicants",
      description: "Passed application process",
      icon: UsersRound,
      count: metrics.applicants
    },
    {
      title: "Watched Videos", 
      description: "Training videos completed",
      icon: Video,
      count: metrics.videos
    },
    {
      title: "Interviewed",
      description: "Candidates interviewed",
      icon: FileText, 
      count: metrics.interviewed
    },
    {
      title: "Training Evaluated",
      description: "Onsite training assessed",
      icon: BrainCog,
      count: metrics.trained
    }
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 relative">
      <style jsx global>{`
        .print-button-container {
          position: fixed;
          top: 24px;
          right: 24px;
          z-index: 9999;
        }
        @media print {
          .print-button-container {
            display: none;
          }
          body * {
            visibility: hidden;
          }
          #printable-area, #printable-area * {
            visibility: visible;
          }
          #printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
          }
        }
      `}</style>

      {/* Print Button */}
      <div className="print-button-container">
        <Button 
          variant="default"
          size="sm"
          onClick={handlePrint}
          className="shadow-lg print:hidden"
        >
          <Printer className="mr-2 h-4 w-4" />
          Print Report
          <kbd className="ml-2 px-2 py-1 text-xs bg-accent rounded-md">Ctrl+P</kbd>
        </Button>
      </div>

      <div className="flex items-center justify-between pt-10">
        <Heading
          title="Report Generations" 
          description="Manage all system reports"
        />
      </div>

      <div id="printable-area" className="bg-background p-6 rounded-lg border">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Application Report</h1>
          <p className="text-muted-foreground">
            Generated on {metrics.date}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {cards.map((card) => (
            <ReportCard key={card.title} {...card} />
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Total Applicants Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium">Analytics Data</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Filter the analytics data by selecting a date.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium">April 1st, 2025</h3>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div>Total Applicants in Database:</div>
                  <div className="font-medium">22</div>
                  <div>Applicants on Selected Date:</div>
                  <div className="font-medium">22</div>
                  <div>New Applicants:</div>
                  <div className="font-medium">5</div>
                  <div>Interviewed Applicants:</div>
                  <div className="font-medium">15</div>
                  <div>Evaluated Applicants:</div>
                  <div className="font-medium">16</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid md:grid-cols-10 gap-6">
          <div className="md:col-span-6">
            <LineChartCard />
          </div>
          <div className="md:col-span-4">
            <SummaryFilterCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerations;