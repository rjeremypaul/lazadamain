// components/PrintReportButton.tsx
"use client";

import { useCallback, useState } from "react";
import { Printer } from "lucide-react";

export const PrintReportButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePrint = useCallback(async () => {
    setIsLoading(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf")
      ]);

      const element = document.getElementById("printable-area");
      if (!element) throw new Error("Printable area not found");

      const canvas = await html2canvas(element, {
        scale: 1.5,
        logging: false,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: -window.scrollY
      });

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
      });

      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-");
      pdf.save(`report-${timestamp}.pdf`);

    } catch (error) {
      console.error("Print failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <button
      onClick={handlePrint}
      disabled={isLoading}
      aria-label="Export to PDF"
    >
      {isLoading ? (
        <>
          <span 
            className="animate-spin"
            style={{
              display: 'inline-block',
              width: '16px',
              height: '16px',
              marginRight: '8px'
            }}
          >
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"/>
              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" opacity="0.75"/>
            </svg>
          </span>
          Generating...
        </>
      ) : (
        <>
          <Printer style={{ width: '16px', height: '16px', marginRight: '8px' }}/>
          Export to PDF
        </>
      )}
    </button>
  );
};