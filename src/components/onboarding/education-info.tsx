/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import useApplicationAppStore from "@/lib/store";
import { educationInfoSchema } from "@/lib/validators";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const EducationInfo = () => {
  const { nextStep, prevStep, formData, setEducationInfo } =
    useApplicationAppStore();
  const [errors, setErrors] = useState<any>({});
  const handleSelectChange = (name: string, value: string) => {
    setErrors((prev: any) => ({ ...prev, [name]: "" }));
    setEducationInfo({ [name]: value });
  };

  const validateAndNext = () => {
    try {
      educationInfoSchema.parse(formData.educationInfo);
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
  return (
    <div>
      <h2 className="text-xl font-semibold pb-3">Educational Attainments</h2>
      <Separator className="bg-zinc-300" />
      <div className="mt-5">
        <div className="grid md:grid-cols-2 mt-5 gap-6">
          <div className="space-y-1">
            <Label
              className={`text-sm uppercase ${
                errors.degreeStatus ? "text-red-500" : "text-gray-900"
              }`}
            >
              Degree/Undergraduate Status
              <span className="text-red-500">*</span>
            </Label>
            <Select
              defaultValue={formData.educationInfo.degreeStatus}
              onValueChange={(value) => {
                handleSelectChange("degreeStatus", value);
              }}
            >
              <SelectTrigger
                className={`${
                  errors.degreeStatus ? "border-red-500 focus:ring-red-500" : ""
                }`}
              >
                <SelectValue placeholder="--Degree/Undegraduate Status--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bachelor's Degree">
                  Bachelor&apos;s Degree
                </SelectItem>
                <SelectItem value="College Undergraduate (3rd or 4th year)">
                  College Undergraduate (3rd or 4th year)
                </SelectItem>
                <SelectItem value="College Undergraduate (1st or 2nd year)">
                  College Undergraduate (1st or 2nd year)
                </SelectItem>
                <SelectItem value="No Degree or Dropped Out">
                  No Degree or Dropped Out
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.degreeStatus && (
              <p className="text-red-500 text-sm">{errors.degreeStatus}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label
              className={`text-sm uppercase ${
                errors.yearGraduated ? "text-red-500" : "text-gray-900"
              }`}
            >
              Year Graduated
              <span className="text-red-500">*</span>
            </Label>
            <Select
              defaultValue={formData.educationInfo.yearGraduated}
              onValueChange={(value) => {
                handleSelectChange("yearGraduated", value);
              }}
            >
              <SelectTrigger
                className={`${
                  errors.yearGraduated
                    ? "border-red-500 focus:ring-red-500"
                    : ""
                }`}
              >
                <SelectValue placeholder="--Year Graduated--" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Graduated within the last 5 years">
                  Graduated within the last 5 years
                </SelectItem>
                <SelectItem value="Graduated 6-10 years ago">
                  Graduated 6-10 years ago
                </SelectItem>
                <SelectItem value="Graduated 11+ years ago">
                  Graduated 11+ years ago
                </SelectItem>
                <SelectItem value="No Degree or Dropped Out">
                  No Degree or Dropped Out
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.yearGraduated && (
              <p className="text-red-500 text-sm">{errors.yearGraduated}</p>
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

export default EducationInfo;
