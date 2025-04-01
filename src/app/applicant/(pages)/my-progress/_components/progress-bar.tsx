"use client";

import React from "react";

const Circle = ({
  step,
  currentIndex,
  label,
}: {
  step: number;
  currentIndex: number;
  label: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 sm:border-4 select-none transition-colors duration-300 ease-in-out ${
          step === currentIndex
            ? "text-blue-600 border-blue-600"
            : step < currentIndex
              ? "bg-white border-gray-300 text-gray-500"
              : "bg-blue-600 border-blue-600 text-white"
        }`}
      >
        {step >= currentIndex ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : null}
      </div>
      <span className="text-xs sm:text-sm mt-2 text-center font-medium text-gray-700">
        {label}
      </span>
    </div>
  );
};

const ProgressBar = ({ step }: { step: number }) => {
  const steps = [
    "Application Form",
    "Video Training",
    "Scheduled Interview",
    "Onsite Training",
    "Digital Interview",
    "Final Evaluation",
  ];

  return (
    <div className="flex mx-auto mt-6 mb-10 justify-between w-11/12 max-w-4xl">
      {steps.map((label, index) => (
        <div key={index} className="flex items-center w-full">
          <Circle step={step} currentIndex={index + 1} label={label} />
          {index < steps.length - 1 && (
            <div className="flex-grow h-[2px] sm:h-1 mx-2 relative">
              <div className="absolute top-0 left-0 h-full w-full bg-gray-300" />
              <div
                className={`absolute top-0 left-0 h-full bg-blue-600 transition-transform duration-300 ease-in-out origin-left ${
                  step > index + 1 ? "w-full" : "w-0"
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
