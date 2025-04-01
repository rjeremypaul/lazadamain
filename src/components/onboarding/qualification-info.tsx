/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import useApplicationAppStore from "@/lib/store";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { qualificationSkillsInfoSchema } from "@/lib/validators";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const QualificationInfo = () => {
  const { nextStep, formData, setQualificationSkillsInfo, prevStep } =
    useApplicationAppStore();
  const [errors, setErrors] = useState<any>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev: any) => ({ ...prev, [e.target.name]: "" }));
    setQualificationSkillsInfo({ [e.target.name]: e.target.value });
  };
  const validateAndNext = () => {
    try {
      qualificationSkillsInfoSchema.parse(formData.qualificationSkillsInfo);
      setErrors({});
      nextStep();
    } catch (error: any) {
      const errorMap: any = {};
      error.errors.forEach((err: any) => {
        errorMap[err.path[0]] = err.message;
      });
      setErrors(errorMap);
    }
  };

  const fieldOfExpertiseOptions = [
    "Operations Management",
    "Warehouse Manager",
    "Transportation Analyst",
    "Logistics Engineer",
    "Inventory Manager",
    "Procurement Manager",
    "Customer Service Representative",
    "Dispatcher",
    "Encoder",
    "IT in logistics field",
    "Business Related Field",
    "Engineering Related Field",
    "Accounting Related Field",
    "Human Resource Related Field",
    "Marketing Related Field",
    "Arts and Design Related Field",
    "Health and Medical Related Field",
    "Others",
  ];
  return (
    <div>
      <h2 className="text-xl font-semibold pb-3">
        Qualification and Skill Criteria
      </h2>
      <Separator className="bg-zinc-300" />
      <div className="mt-5">
        <div className="grid md:grid-cols-2 mt-5 gap-6">
          <div className="space-y-1">
            <Label
              className={`text-sm uppercase ${
                errors.totalYearsExperience ? "text-red-500" : "text-gray-900"
              }`}
            >
              Experience (Years) <span className="text-red-500">*</span>
            </Label>
            <Select
              name="totalYearsExperience"
              defaultValue={
                formData.qualificationSkillsInfo.totalYearsExperience
              }
              onValueChange={(value) =>
                handleChange({
                  target: { name: "totalYearsExperience", value },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            >
              <SelectTrigger
                className={`${
                  errors.totalYearsExperience
                    ? "border-red-500 focus:ring-red-500"
                    : ""
                }`}
              >
                <SelectValue placeholder="--Experience (Years)--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2 years and above">
                  2 years and above
                </SelectItem>
                <SelectItem value="1 and 1/2 years">1 and 1/2 years</SelectItem>
                <SelectItem value="6 months">6 months</SelectItem>
                <SelectItem value="3 months and below">
                  3 months and below
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.totalYearsExperience && (
              <p className="text-red-500 text-sm">
                {errors.totalYearsExperience}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label
              className={`text-sm uppercase ${
                errors.highestRoleAchieved ? "text-red-500" : "text-gray-900"
              }`}
            >
              Highest Role/Position Achieved{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Select
              name="highestRoleAchieved"
              defaultValue={
                formData.qualificationSkillsInfo.highestRoleAchieved
              }
              onValueChange={(value) =>
                handleChange({
                  target: { name: "highestRoleAchieved", value },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            >
              <SelectTrigger
                className={`${
                  errors.highestRoleAchieved
                    ? "border-red-500 focus:ring-red-500"
                    : ""
                }`}
              >
                <SelectValue placeholder="--Highest Role/Position Achieved--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mid-Level Management">
                  Mid-Level Management
                </SelectItem>
                <SelectItem value="Junior Position">Junior Position</SelectItem>
                <SelectItem value="Entry-Level Position">
                  Entry-Level Position
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.highestRoleAchieved && (
              <p className="text-red-500 text-sm">
                {errors.highestRoleAchieved}
              </p>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 mt-5 gap-6">
          <div className="space-y-1">
            <Label
              className={`text-sm uppercase ${
                errors.fieldOfExpertise ? "text-red-500" : "text-gray-900"
              }`}
            >
              Field of Expertise <span className="text-red-500">*</span>
            </Label>
            <Select
              name="fieldOfExpertise"
              defaultValue={formData.qualificationSkillsInfo.fieldOfExpertise}
              onValueChange={(value) =>
                handleChange({
                  target: { name: "fieldOfExpertise", value },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            >
              <SelectTrigger
                className={`${
                  errors.fieldOfExpertise
                    ? "border-red-500 focus:ring-red-500"
                    : ""
                }`}
              >
                <SelectValue placeholder="--Field of Expertise--" />
              </SelectTrigger>
              <SelectContent>
                {fieldOfExpertiseOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.fieldOfExpertise && (
              <p className="text-red-500 text-sm">{errors.fieldOfExpertise}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label
              className={`text-sm uppercase ${
                errors.awards ? "text-red-500" : "text-gray-900"
              }`}
            >
              Awards (if any)
            </Label>
            <Select
              name="awards"
              defaultValue={
                formData.qualificationSkillsInfo.awards
              }
              onValueChange={(value) =>
                handleChange({
                  target: { name: "awards", value },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            >
              <SelectTrigger
                className={`${
                  errors.awards
                    ? "border-red-500 focus:ring-red-500"
                    : ""
                }`}
              >
                <SelectValue placeholder="--Awards (if any)--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="International/National Level Award">
                  International/National Level Award
                </SelectItem>
                <SelectItem value="Company/Industry-Recognized Award">Company/Industry-Recognized Award</SelectItem>
                <SelectItem value="No Awards">No Awards</SelectItem>
              </SelectContent>
            </Select>
            {errors.awards && (
              <p className="text-red-500 text-sm">{errors.awards}</p>
            )}
          </div>
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

export default QualificationInfo;
