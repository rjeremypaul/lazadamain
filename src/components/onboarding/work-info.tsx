/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import useApplicationAppStore from "@/lib/store";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { workExperienceInfoSchema } from "@/lib/validators";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const WorkInfo = () => {
  const { nextStep, prevStep, formData, setWorkExperienceInfo } =
    useApplicationAppStore();
  const [errors, setErrors] = useState<any>({});
  const [selectedCompany, setSelectedCompany] = useState<string>(
    formData.workExperienceInfo.companyName || ""
  );
  const [otherCompanyName, setOtherCompanyName] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev: any) => ({ ...prev, [e.target.name]: "" }));
    setWorkExperienceInfo({ [e.target.name]: e.target.value });
  };
  const validateAndNext = () => {
    try {
      const updatedFormData = {
        ...formData.workExperienceInfo,
        companyName:
          selectedCompany === "Others" ? otherCompanyName : selectedCompany,
      };

      workExperienceInfoSchema.parse(updatedFormData);
      setErrors({});
      setWorkExperienceInfo({ companyName: updatedFormData.companyName });
      nextStep();
    } catch (error: any) {
      const errorMap: any = {};
      error.errors.forEach((err: any) => {
        errorMap[err.path[0]] = err.message;
      });
      setErrors(errorMap);
    }
  };

  const companyOptions = [
    "DHL",
    "Lazada",
    "FedEx",
    "Shopee",
    "Amazon",
    "Alibaba",
    "J&T Express",
    "Ninja Van",
    "LBC",
    "Others",
  ];
  return (
    <div>
      <h2 className="text-xl font-semibold pb-3">Work Experience</h2>
      <Separator className="bg-zinc-300" />
      <div className="mt-5">
        <div className="grid md:grid-cols-2 mt-5 gap-6">
          <div className="space-y-1">
            <Label
              className={`text-sm uppercase ${
                errors.companyName ? "text-red-500" : "text-gray-900"
              }`}
            >
              Company Name <span className="text-red-500">*</span>
            </Label>
            <Select
              name="companyName"
              defaultValue={formData.workExperienceInfo.companyName}
              onValueChange={(value) => {
                setSelectedCompany(value);
                if (value !== "Others") {
                  setWorkExperienceInfo({ companyName: value });
                }
              }}
            >
              <SelectTrigger
                className={`${
                  errors.companyName ? "border-red-500 focus:ring-red-500" : ""
                }`}
              >
                <SelectValue placeholder="--Company Name--" />
              </SelectTrigger>
              <SelectContent>
                {companyOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedCompany === "Others" && (
              <Input
                type="text"
                required
                placeholder="Enter company name"
                name="otherCompanyName"
                value={otherCompanyName}
                className={`${
                  errors.companyName ? "border-red-500 focus:ring-red-500" : ""
                }`}
                onChange={(e) => setOtherCompanyName(e.target.value)}
              />
            )}
            {errors.companyName && (
              <p className="text-red-500 text-sm">{errors.companyName}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label
              className={`text-sm uppercase ${
                errors.jobPosition ? "text-red-500" : "text-gray-900"
              }`}
            >
              Job Role/Position <span className="text-red-500">*</span>
            </Label>
            <Select
              name="jobPosition"
              defaultValue={formData.workExperienceInfo.jobPosition}
              onValueChange={(value) =>
                handleChange({
                  target: { name: "jobPosition", value },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            >
              <SelectTrigger
                className={`${
                  errors.jobPosition ? "border-red-500 focus:ring-red-500" : ""
                }`}
              >
                <SelectValue placeholder="--Job Role/Position--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Senior Role">Senior Role</SelectItem>
                <SelectItem value="Mid-Level Role">Mid-Level Role</SelectItem>
                <SelectItem value="Entry Role">Entry Role</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
              </SelectContent>
            </Select>
            {errors.jobPosition && (
              <p className="text-red-500 text-sm">{errors.jobPosition}</p>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 mt-5 gap-6">
          <div className="space-y-1">
            <Label
              className={`text-sm uppercase ${
                errors.yearsWorkedInCompany ? "text-red-500" : "text-gray-900"
              }`}
            >
              Years of Experience in Company{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Select
              name="yearsWorkedInCompany"
              defaultValue={formData.workExperienceInfo.yearsWorkedInCompany}
              onValueChange={(value) =>
                handleChange({
                  target: { name: "yearsWorkedInCompany", value },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            >
              <SelectTrigger
                className={`${
                  errors.yearsWorkedInCompany
                    ? "border-red-500 focus:ring-red-500"
                    : ""
                }`}
              >
                <SelectValue placeholder="--Years of Experience in Company--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5 years and above">
                  5 years and above
                </SelectItem>
                <SelectItem value="3-4 years">3-4 years</SelectItem>
                <SelectItem value="1-2 years">1-2 years 1-2 years</SelectItem>
                <SelectItem value="1 year and below">
                  1 year and below
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.yearsWorkedInCompany && (
              <p className="text-red-500 text-sm">
                {errors.yearsWorkedInCompany}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label
              className={`text-sm uppercase ${
                errors.certificate ? "text-red-500" : "text-gray-900"
              }`}
            >
              Certification Received (if any)
            </Label>
            <Select
              name="certificate"
              defaultValue={formData.workExperienceInfo.certificate}
              onValueChange={(value) =>
                handleChange({
                  target: { name: "certificate", value },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            >
              <SelectTrigger
                className={`${
                  errors.certificate ? "border-red-500 focus:ring-red-500" : ""
                }`}
              >
                <SelectValue placeholder="--Certification Received (if any)--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Best Employee of the Year">
                  Best Employee of the Year
                </SelectItem>
                <SelectItem value="PMP">PMP</SelectItem>
                <SelectItem value="ITIL">ITIL</SelectItem>
                <SelectItem value="Six Sigma">Six Sigma</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
                <SelectItem value="No Certificate">No Certificate</SelectItem>
              </SelectContent>
            </Select>
            {errors.certificate && (
              <p className="text-red-500 text-sm">{errors.certificate}</p>
            )}
          </div>
        </div>
      </div>
      <h2 className="text-xl font-semibold pb-3 mt-5">
        Logistics-Related Experience
      </h2>
      <Separator className="bg-zinc-300" />
      <div className="mt-5">
        <div className="space-y-1">
          <Label
            className={`text-sm uppercase ${
              errors.logisticsCompany ? "text-red-500" : "text-gray-900"
            }`}
          >
            Company Name <span className="text-red-500">*</span>
          </Label>
          <Select
            name="logisticsCompany"
            defaultValue={formData.workExperienceInfo.logisticsCompany}
            onValueChange={(value) =>
              handleChange({
                target: { name: "logisticsCompany", value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          >
            <SelectTrigger
              className={`${
                errors.logisticsCompany
                  ? "border-red-500 focus:ring-red-500"
                  : ""
              }`}
            >
              <SelectValue placeholder="--Company Name--" />
            </SelectTrigger>
            <SelectContent>
              {companyOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.logisticsCompany && (
            <p className="text-red-500 text-sm">{errors.logisticsCompany}</p>
          )}
        </div>
        <div className="space-y-1 mt-5">
          <Label
            className={`text-sm uppercase ${
              errors.logisticsYearsWorked ? "text-red-500" : "text-gray-900"
            }`}
          >
            Years of Experience in Logistics Company{" "}
            <span className="text-red-500">*</span>
          </Label>
          <Select
            name="logisticsYearsWorked"
            defaultValue={formData.workExperienceInfo.logisticsYearsWorked}
            onValueChange={(value) =>
              handleChange({
                target: { name: "logisticsYearsWorked", value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          >
            <SelectTrigger
              className={`${
                errors.logisticsYearsWorked
                  ? "border-red-500 focus:ring-red-500"
                  : ""
              }`}
            >
              <SelectValue placeholder="--Years of Experience in Logistics Company--" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5 years and above">
                5 years and above
              </SelectItem>
              <SelectItem value="3-4 years">3-4 years</SelectItem>
              <SelectItem value="1-2 years">1-2 years 1-2 years</SelectItem>
              <SelectItem value="1 year and below">1 year and below</SelectItem>
            </SelectContent>
          </Select>
          {errors.logisticsYearsWorked && (
            <p className="text-red-500 text-sm">
              {errors.logisticsYearsWorked}
            </p>
          )}
        </div>
      </div>
      <h2 className="text-xl font-semibold pb-3 mt-5">Position Applying</h2>
      <Separator className="bg-zinc-300" />
      <div className="mt-5">
        <div className="space-y-1 uppercase mt-5">
          <Label
            className={`text-sm ${
              errors.positionApplying ? "text-red-500" : "text-gray-900"
            }`}
          >
            Position Applying
            <span className="text-red-500">*</span>
          </Label>
          <Select
            name="positionApplying"
            defaultValue={formData.workExperienceInfo.positionApplying}
            onValueChange={(value) =>
              handleChange({
                target: { name: "positionApplying", value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          >
            <SelectTrigger
              className={`${
                errors.positionApplying
                  ? "border-red-500 focus:ring-red-500"
                  : ""
              }`}
            >
              <SelectValue placeholder="--Position Applying--" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Auto Mu Scanner">
                Auto Mu Scanner
              </SelectItem>
              <SelectItem value="Fine Sort Scanner">Fine Sort Scanner</SelectItem>
              <SelectItem value="Pre-sort Scanner">Pre-sort Scanner</SelectItem>
              <SelectItem value="Reject Scanner">Reject Scanner</SelectItem>
              <SelectItem value="Mover">Mover</SelectItem>
              <SelectItem value="Dumper">Dumper</SelectItem>
            </SelectContent>
          </Select>
          {errors.positionApplying && (
            <p className="text-red-500 text-sm">{errors.positionApplying}</p>
          )}
        </div>
      </div>
      {/* BUTTONS */}
      <div className="flex justify-end mt-5 gap-3">
        <Button variant="outline" onClick={prevStep}>
          Previous &larr;
        </Button>
        <Button onClick={validateAndNext}>Next &rarr;</Button>
      </div>
    </div>
  );
};

export default WorkInfo;
