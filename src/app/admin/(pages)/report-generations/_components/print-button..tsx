"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { useCallback } from "react";

export const PrintButton = () => {
  const handlePrint = useCallback(async () => {
    // Track loading state
    let isLoading = true;
    const startTime = performance.now();
    
    try {
      // Dynamic imports for code splitting
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf")
      ]);

      // Get printable area
      const element = document.getElementById("printable-area");
      if (!element) {
        console.warn("Printable element not found");
        return;
      }

      // Store button state
      const printButton = document.activeElement as HTMLButtonElement | null;
      const originalButtonState = {
        text: printButton?.textContent || "",
        disabled: printButton?.disabled || false
      };

      // Update UI state
      if (printButton) {
        printButton.textContent = "Generating PDF...";
        printButton.disabled = true;
      }

      // Minimum loading time for better UX (1 second)
      const minLoadingTime = 1000;
      
      // Capture the content
      const canvas = await html2canvas(element, {
        scale: 2, // High quality
        logging: false,
        useCORS: true,
        backgroundColor: "#ffffff",
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
        hotfixes: ["px_scaling"]
      });

      // Calculate dimensions
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add image to PDF
      pdf.addImage({
        imageData: imgData,
        format: "PNG",
        x: 0,
        y: 0,
        width: pdfWidth,
        height: pdfHeight,
        compression: "FAST"
      });

      // Ensure minimum loading time
      const elapsed = performance.now() - startTime;
      if (elapsed < minLoadingTime) {
        await new Promise(resolve => 
          setTimeout(resolve, minLoadingTime - elapsed)
        );
      }

      // Generate filename
      const timestamp = new Date()
        .toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        })
        .replace(/[^\d]/g, "-");

      // Save PDF
      pdf.save(`report-${timestamp}.pdf`);

    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Could not generate PDF. Please try again later.");
    } finally {
      // Restore button state
      const printButton = document.activeElement as HTMLButtonElement | null;
      if (printButton) {
        printButton.textContent = "Export to PDF";
        printButton.disabled = false;
      }
      isLoading = false;
    }
  }, []);

  return (
    <Button 
      onClick={handlePrint}
      variant="outline"
      className="print:hidden" // Hide when actually printing
    >
      <Printer className="mr-2 h-4 w-4" />
      Export to PDF
    </Button>
  );
};