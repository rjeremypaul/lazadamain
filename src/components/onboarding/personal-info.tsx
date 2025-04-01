/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import useApplicationAppStore from "@/lib/store";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import ImageUpload from "../image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddressData } from "@/lib/address-selection";
import { personalInfoSchema } from "@/lib/validators";

const PersonalInfo = () => {
  const { nextStep, formData, setPersonalInfo } = useApplicationAppStore();
  const [errors, setErrors] = useState<any>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev: any) => ({ ...prev, [e.target.name]: "" }));
    setPersonalInfo({ [e.target.name]: e.target.value });
  };
  const handleImageUpload = (url: string) => {
    setPersonalInfo({ profileImage: url });
  };

  const handleSelectChange = (name: string, value: string) => {
    setErrors((prev: any) => ({ ...prev, [name]: "" }));
    setPersonalInfo({ [name]: value });
  };

  const [selectedRegionName, setSelectedRegionName] = useState<string>("");
  const [selectedProvinceName, setSelectedProvinceName] = useState<string>("");
  const [selectedMunicipalityName, setSelectedMunicipalityName] =
    useState<string>("");

  const {
    regionOptions,
    provinceOptions,
    municipalityOptions,
    barangayOptions,
  } = useAddressData(
    selectedRegionName,
    selectedProvinceName,
    selectedMunicipalityName
  );

  const validateAndNext = () => {
    try {
      personalInfoSchema.parse(formData.personalInfo);
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
      <h2 className="text-xl font-semibold pb-3">Personal Information</h2>
      <Separator className="bg-zinc-300" />
      <div className="mt-5">
        <div className="grid grid-cols-5 mb-5 gap-6">
          <div className="col-span-1">
            <ImageUpload
              defaultValue={formData.personalInfo.profileImage}
              onImageUpload={handleImageUpload}
            />
          </div>
          <div className="col-span-4 space-y-4">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
              <div className="space-y-1">
                <Label
                  className={`text-sm uppercase ${
                    errors.firstName ? "text-red-500" : "text-gray-900"
                  }`}
                >
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  required
                  placeholder="Enter first name"
                  name="firstName"
                  value={formData.personalInfo.firstName}
                  className={`${
                    errors.firstName ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label
                  className={`text-sm uppercase ${
                    errors.middleName ? "text-red-500" : "text-gray-900"
                  }`}
                >
                  Middle Name (optional)
                </Label>
                <Input
                  type="text"
                  placeholder="Enter middle name"
                  name="middleName"
                  value={formData.personalInfo.middleName}
                  className={`${
                    errors.middleName ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  onChange={handleChange}
                />
                {errors.middleName && (
                  <p className="text-red-500 text-sm">{errors.middleName}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label
                  className={`text-sm uppercase ${
                    errors.lastName ? "text-red-500" : "text-gray-900"
                  }`}
                >
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  required
                  placeholder="Enter last name"
                  name="lastName"
                  value={formData.personalInfo.lastName}
                  className={`${
                    errors.lastName ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <Label
                className={`text-sm uppercase ${
                  errors.email ? "text-red-500" : "text-gray-900"
                }`}
              >
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                required
                placeholder="Enter email address"
                name="email"
                className={`${
                  errors.email ? "border-red-500 focus:ring-red-500" : ""
                }`}
                value={formData.personalInfo.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 mt-5 gap-6">
          <div className="space-y-1">
            <Label
              className={`text-sm uppercase ${
                errors.age ? "text-red-500" : "text-gray-900"
              }`}
            >
              Age <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              required
              placeholder="Enter age"
              name="age"
              value={formData.personalInfo.age}
              className={`${
                errors.age ? "border-red-500 focus:ring-red-500" : ""
              }`}
              onChange={handleChange}
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>
          <div className="space-y-1">
            <Label
              className={`text-sm uppercase ${
                errors.sex ? "text-red-500" : "text-gray-900"
              }`}
            >
              Sex <span className="text-red-500">*</span>
            </Label>
            <Select
              defaultValue={formData.personalInfo.sex}
              onValueChange={(value) => handleSelectChange("sex", value)}
            >
              <SelectTrigger
                className={`${
                  errors.sex ? "border-red-500 focus:ring-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Select sex" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
            {errors.sex && <p className="text-red-500 text-sm">{errors.sex}</p>}
          </div>
        </div>
        <div className="grid md:grid-cols-2 mt-5 gap-6">
          <div className="space-y-1">
            <Label
              className={`text-sm uppercase ${
                errors.contactNumber ? "text-red-500" : "text-gray-900"
              }`}
            >
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              required
              placeholder="Enter phone number"
              name="contactNumber"
              className={`${
                errors.contactNumber ? "border-red-500 focus:ring-red-500" : ""
              }`}
              value={formData.personalInfo.contactNumber}
              onChange={handleChange}
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm">{errors.contactNumber}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label
              className={`text-sm uppercase ${
                errors.houseNumber ? "text-red-500" : "text-gray-900"
              }`}
            >
              House/Unit/Block No., Street, Subdivision/Village{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              required
              placeholder="Enter house number"
              name="houseNumber"
              value={formData.personalInfo.houseNumber}
              className={`${
                errors.houseNumber ? "border-red-500 focus:ring-red-500" : ""
              }`}
              onChange={handleChange}
            />
            {errors.houseNumber && (
              <p className="text-red-500 text-sm">{errors.houseNumber}</p>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 mt-5 gap-6">
          <div className="space-y-1">
            <Label
              className={`text-sm uppercase ${
                errors.region ? "text-red-500" : "text-gray-900"
              }`}
            >
              Region <span className="text-red-500">*</span>
            </Label>
            <Select
              defaultValue={selectedRegionName}
              onValueChange={(value) => {
                setSelectedRegionName(value);
                handleSelectChange("region", value);
              }}
            >
              <SelectTrigger
                className={`${
                  errors.region ? "border-red-500 focus:ring-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {regionOptions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.region && (
              <p className="text-red-500 text-sm">{errors.region}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label
              className={`text-sm uppercase ${
                errors.province ? "text-red-500" : "text-gray-900"
              }`}
            >
              Province <span className="text-red-500">*</span>
            </Label>
            <Select
              defaultValue={selectedProvinceName}
              onValueChange={(value) => {
                setSelectedProvinceName(value);
                handleSelectChange("province", value);
              }}
            >
              <SelectTrigger
                className={`${
                  errors.province ? "border-red-500 focus:ring-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Select province" />
              </SelectTrigger>
              <SelectContent>
                {provinceOptions.map((province) => (
                  <SelectItem key={province} value={province}>
                    {province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.province && (
              <p className="text-red-500 text-sm">{errors.province}</p>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-3 mt-5 gap-6">
          <div className="space-y-1">
            <Label
              className={`text-sm uppercase ${
                errors.municipality ? "text-red-500" : "text-gray-900"
              }`}
            >
              Municipality <span className="text-red-500">*</span>
            </Label>
            <Select
              defaultValue={selectedMunicipalityName}
              onValueChange={(value) => {
                setSelectedMunicipalityName(value);
                handleSelectChange("municipality", value);
              }}
            >
              <SelectTrigger
                className={`${
                  errors.municipality ? "border-red-500 focus:ring-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Select municipality" />
              </SelectTrigger>
              <SelectContent>
                {municipalityOptions.map((municipality) => (
                  <SelectItem key={municipality} value={municipality}>
                    {municipality}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.municipality && (
              <p className="text-red-500 text-sm">{errors.municipality}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label
              className={`text-sm uppercase ${
                errors.barangay ? "text-red-500" : "text-gray-900"
              }`}
            >
              Barangay <span className="text-red-500">*</span>
            </Label>
            <Select
              defaultValue={formData.personalInfo.barangay}
              onValueChange={(value) => handleSelectChange("barangay", value)}
            >
              <SelectTrigger
                className={`${
                  errors.barangay ? "border-red-500 focus:ring-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Select barangay" />
              </SelectTrigger>
              <SelectContent>
                {barangayOptions.map((barangay) => (
                  <SelectItem key={barangay} value={barangay}>
                    {barangay}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.barangay && (
              <p className="text-red-500 text-sm">{errors.barangay}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label
              className={`text-sm uppercase ${
                errors.zipCode ? "text-red-500" : "text-gray-900"
              }`}
            >
              Zip Code <span className="text-red-500">*</span>
            </Label>
            <Input
              required
              placeholder="Enter zip code"
              name="zipCode"
              value={formData.personalInfo.zipCode}
              className={`${
                errors.zipCode ? "border-red-500 focus:ring-red-500" : ""
              }`}
              onChange={handleChange}
            />
            {errors.zipCode && (
              <p className="text-red-500 text-sm">{errors.zipCode}</p>
            )}
          </div>
        </div>
      </div>
      {/* BUTTONS */}
      <div className="flex justify-end mt-5">
        <Button onClick={validateAndNext}>Next &rarr;</Button>
      </div>
    </div>
  );
};

export default PersonalInfo;
