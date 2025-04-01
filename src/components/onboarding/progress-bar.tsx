"use client";

import useApplicationAppStore from "@/lib/store";
import React from "react";

const Circle = ({
  step,
  currentIndex,
}: {
  step: number;
  currentIndex: number;
}) => {
  return (
    <div
      className={`w-7 h-7 rounded-full sm:w-10 sm:h-10 flex items-center justify-center border-2 sm:border-4 select-none transition-colors duration-300 ease-in-out delay-300 ${
        step === currentIndex
          ? "text-blue-600 border-blue-600"
          : `${
              step < currentIndex
                ? "bg-white border-gray-300 text-gray-500"
                : "bg-blue-600 border-blue-600 text-white"
            }`
      }`}
    >
      {currentIndex}
    </div>
  );
};

const ProgressBar = () => {
  const { step, getTotalSteps } = useApplicationAppStore();
  const totalSteps: number = getTotalSteps();
  return (
    <div className="flex mx-auto mt-6 mb-10 justify-between w-3/4 max-w-2xl">
      {[...Array(totalSteps - 1)].map((_, index) => (
        <div key={index} className="flex items-center w-full">
          <Circle step={step} currentIndex={index + 1} />
          <div className="flex-grow h-[2px] sm:h-1 relative">
            <div className="absolute top-0 left-0 h-full w-full bg-gray-300" />

            <div
              className={`absolute top-0 left-0 h-full w-full bg-blue-600
              transition-transform duration-300 ease-in-out origin-left
              transform ${step > index + 1 ? "scale-x-100" : "scale-x-0"}
              `}
            />
          </div>
        </div>
      ))}
      <div className="flex items-center w-fit">
        <Circle step={step} currentIndex={totalSteps} />
      </div>
    </div>
  );
};

export default ProgressBar;
