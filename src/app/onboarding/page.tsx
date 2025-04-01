"use client";

import EducationInfo from "@/components/onboarding/education-info";
import PersonalInfo from "@/components/onboarding/personal-info";
import ProgressBar from "@/components/onboarding/progress-bar";
import QualificationInfo from "@/components/onboarding/qualification-info";
import ReviewSubmit from "@/components/onboarding/review-submit";
import WorkInfo from "@/components/onboarding/work-info";
import useApplicationAppStore from "@/lib/store";
import React from "react";

const Onboarding = () => {
  const { step } = useApplicationAppStore();

  // Function to render the current step based on the state
  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalInfo />;
      case 2:
        return <QualificationInfo />;
      case 3:
        return <WorkInfo />;
      case 4:
        return <EducationInfo />;
      case 5:
        return <ReviewSubmit />;
      default:
        return null;
    }
  };

  return (
    <div className="relative pb-20">
      {/* Blue Background Box */}
      <div className="bg-blue-600 -z-10 absolute w-full h-60 top-0 inset-x-0"></div>

      {/* Title inside the Blue Box */}
      <p className="text-center text-white font-bold text-3xl pt-20">
        Lazada Logistics Application Form
      </p>
      <p className="text-center text-white font-normal text-lg pt-2">
        Please complete all the steps below to provide your personal, work, and
        educational information. This will help us evaluate your qualifications
        for the role.
      </p>

      {/* STEPS */}
      <div className="relative z-10 mt-10 p-6 bg-white shadow-lg border rounded-lg max-w-4xl mx-auto">
        {/* PROGRESS BAR */}
        <ProgressBar />
        {renderStep()}
      </div>
    </div>
  );
};

export default Onboarding;
