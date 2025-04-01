"use client";

import useApplicationAppStore from "@/lib/store";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { createEmployee } from "@/actions/employee";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";

const ReviewSubmit = () => {
  const { submitForm, prevStep, formData } = useApplicationAppStore();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef, documentTitle: `${formData.personalInfo.firstName + " " + formData.personalInfo.lastName}_Application_Form` });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await createEmployee(formData);
      console.log("Employee created:", response);
      toast.success("Application submitted successfully!");
      router.push("/onboarding/success");
      submitForm();
    } catch (error) {
      console.error("Failed to create employee:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div
        ref={contentRef}
        className="border-l-[15px] print:h-screen border-blue-600 border-2 px-5 py-3"
      >
        <div className="flex items-start gap-3">
          {formData.personalInfo.profileImage && (
            <Image
              src={formData.personalInfo.profileImage}
              alt="Profile Image"
              width={100}
              height={100}
              className="rounded-full"
            />
          )}
          <h2 className="text-2xl font-semibold mt-5">Curriculum Vitae</h2>
        </div>
        <h2 className="text-xl font-semibold mt-5">Personal Information:</h2>
        <div className="mt-2">
          <div className="grid print:grid-cols-3 md:grid-cols-3 gap-3">
            <div>
              <h3 className="font-semibold uppercase">Full Name:</h3>
              <p>{formData.personalInfo.firstName} {formData.personalInfo.middleName} {formData.personalInfo.lastName}</p>
            </div>
            <div>
              <h3 className="font-semibold uppercase">Email Address:</h3>
              <p>{formData.personalInfo.email}</p>
            </div>
            <div>
              <h3 className="font-semibold uppercase">Age:</h3>
              <p>{formData.personalInfo.age}</p>
            </div>
            <div>
              <h3 className="font-semibold uppercase">Sex:</h3>
              <p>{formData.personalInfo.sex}</p>
            </div>
            <div>
              <h3 className="font-semibold uppercase">Contact Number:</h3>
              <p>{formData.personalInfo.contactNumber}</p>
            </div>
          </div>
          <div className="grid gap-5 mt-3">
            <div>
              <h3 className="font-semibold uppercase">Address:</h3>
              <p>{`${formData.personalInfo.houseNumber}, ${formData.personalInfo.barangay}, ${formData.personalInfo.municipality}, ${formData.personalInfo.province}, ${formData.personalInfo.region}, ${formData.personalInfo.zipCode}`}</p>
            </div>
          </div>
        </div>
        <Separator className="bg-zinc-300 mt-5" />
        <h2 className="text-xl font-semibold mt-3">
          Qualification and Skill Criteria:
        </h2>
        <div className="mt-2">
          <div className="grid print:grid-cols-2 md:grid-cols-2 gap-3">
            <div>
              <h3 className="font-semibold uppercase">Experience (Years):</h3>
              <p>{formData.qualificationSkillsInfo.totalYearsExperience}</p>
            </div>
            <div>
              <h3 className="font-semibold uppercase">Highest Role/Position Achieved:</h3>
              <p>{formData.qualificationSkillsInfo.highestRoleAchieved}</p>
            </div>
            <div>
              <h3 className="font-semibold uppercase">Field of Expertise:</h3>
              <p>{formData.qualificationSkillsInfo.fieldOfExpertise}</p>
            </div>
            <div>
              <h3 className="font-semibold uppercase">Awards:</h3>
              <p>{formData.qualificationSkillsInfo.awards ?? "N/A"}</p>
            </div>
          </div>
        </div>
        <Separator className="bg-zinc-300 mt-5" />
        <h2 className="text-xl font-semibold mt-3">Work Experience:</h2>
        <div className="mt-2">
          <div className="grid md:grid-cols-2 print:grid-cols-2 gap-3">
            <div>
              <h3 className="font-semibold uppercase">Company Name:</h3>
              <p>{formData.workExperienceInfo.companyName}</p>
            </div>
            <div>
              <h3 className="font-semibold uppercase">Job/Role Position:</h3>
              <p>{formData.workExperienceInfo.jobPosition}</p>
            </div>
            <div>
              <h3 className="font-semibold uppercase">How many years of experience:</h3>
              <p>{formData.workExperienceInfo.yearsWorkedInCompany}</p>
            </div>
            <div>
              <h3 className="font-semibold uppercase">Certification Received:</h3>
              <p>{formData.workExperienceInfo.certificate ?? "N/A"}</p>
            </div>
          </div>
        </div>
        <Separator className="bg-zinc-300 mt-5" />
        <h2 className="text-xl font-semibold mt-3">
          Logistics-Related Experience:
        </h2>
        <div className="mt-2">
          <div className="grid print:grid-cols-2 md:grid-cols-2 gap-3">
            <div>
              <h3 className="font-semibold uppercase">Company Name:</h3>
              <p>{formData.workExperienceInfo.logisticsCompany}</p>
            </div>
            <div>
              <h3 className="font-semibold uppercase">How many years of experience:</h3>
              <p>{formData.workExperienceInfo.logisticsYearsWorked}</p>
            </div>
          </div>
        </div>
        <Separator className="bg-zinc-300 mt-5" />
        <h2 className="text-xl font-semibold mt-3">Educational Attainments:</h2>
        <div className="mt-2">
          <div className="grid print:grid-cols-2 md:grid-cols-2 gap-3">
            <div>
              <h3 className="font-semibold uppercase">Degree/Undergraduate Status:</h3>
              <p>{formData.educationInfo.degreeStatus}</p>
            </div>
            <div>
              <h3 className="font-semibold uppercase">Year Graduated:</h3>
              <p>{formData.educationInfo.yearGraduated}</p>
            </div>
          </div>
        </div>
      </div>
      {/* BUTTONS */}
      <div className="flex items-center mt-3 justify-between">
        <Button disabled={loading} onClick={() => reactToPrintFn()} variant="success">
          Print Application
        </Button>
        <div className="flex justify-end mt-5 gap-3">
          <Button disabled={loading} variant="outline" onClick={prevStep}>
            Previous &larr;
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Submit Application
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmit;
