import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is Required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is Required"),
  email: z
    .string()
    .min(1, "Email address is Required")
    .email("Invalid email address"),
  age: z.coerce.number().min(18, "You must be at least 18 years old"),
  sex: z.string().min(1, { message: "Sex is required" }),
  houseNumber: z.string().min(1, { message: "House number is required" }),
  region: z.string().min(1, { message: "Region is required" }),
  province: z.string().min(1, { message: "Province is required" }),
  municipality: z.string().min(1, { message: "Municipality is required" }),
  barangay: z.string().min(1, { message: "Barangay is required" }),
  zipCode: z.string().min(1, { message: "Zip code is required" }),
  contactNumber: z.string().min(1, { message: "Contact number is required" }),
  profileImage: z.string().optional(),
});

export const qualificationSkillsInfoSchema = z.object({
  totalYearsExperience: z.string().min(1, {
    message: "Years of experience is required",
  }),
  highestRoleAchieved: z.string().min(1, {
    message: "Highest role achieved is required",
  }),
  fieldOfExpertise: z.string().min(1, {
    message: "Field of expertise is required",
  }),
  awards: z.string().optional(),
});

export const workExperienceInfoSchema = z.object({
  companyName: z.string().min(1, {
    message: "Company name is required",
  }),
  jobPosition: z.string().min(1, {
    message: "Job position is required",
  }),
  yearsWorkedInCompany: z.string().min(1, {
    message: "Years worked in company is required",
  }),
  certificate: z.string().optional(),
  logisticsCompany: z.string().min(1, {
    message: "Logistics company is required",
  }),
  logisticsYearsWorked: z.string().min(1, {
    message: "Years worked in logistics company is required",
  }),
  positionApplying: z.string().min(1, {
    message: "Position applying is required",
  }),
});

export const educationInfoSchema = z.object({
  degreeStatus: z.string().min(1, {
    message: "Degree status is required",
  }),
  yearGraduated: z.string().min(1, {
    message: "Year graduated is required",
  }),
});

export const formDataSchema = z.object({
  personalInfo: personalInfoSchema,
  qualificationSkillsInfo: qualificationSkillsInfoSchema,
  workExperienceInfo: workExperienceInfoSchema,
  educationInfo: educationInfoSchema,
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type QualificationSkillsInfo = z.infer<
  typeof qualificationSkillsInfoSchema
>;
export type WorkExperienceInfo = z.infer<typeof workExperienceInfoSchema>;
export type EducationInfo = z.infer<typeof educationInfoSchema>;
export type FormData = z.infer<typeof formDataSchema>;
