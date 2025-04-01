/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/lib/db";
import * as jose from "jose";
import { cookies } from "next/headers";
import { TrainingPassedEmailHTML } from "../components/globals/training-passed-email";
import nodemailer from "nodemailer";

export const createEmployee = async (formData: any) => {
  try {
    const fullName =
      formData.personalInfo.firstName +
      " " +
      formData.personalInfo.middleName +
      " " +
      formData.personalInfo.lastName;
    const employee = await db.jobApplicant.create({
      data: {
        name: fullName,
        email: formData.personalInfo.email,
        age: parseInt(formData.personalInfo.age), // Convert to integer
        sex: formData.personalInfo.sex,
        address: `${formData.personalInfo.houseNumber}, ${formData.personalInfo.barangay}, ${formData.personalInfo.municipality}, ${formData.personalInfo.province}, ${formData.personalInfo.region}, ${formData.personalInfo.zipCode}`,
        contactNumber: formData.personalInfo.contactNumber,
        profileImage: formData.personalInfo.profileImage || null,
        totalYearExperience:
          formData.qualificationSkillsInfo.totalYearsExperience,
        highestRoleAchieved:
          formData.qualificationSkillsInfo.highestRoleAchieved,
        fieldOfExpertise: formData.qualificationSkillsInfo.fieldOfExpertise,
        awards: formData.qualificationSkillsInfo.awards || null,
        companyName: formData.workExperienceInfo.companyName,
        jobPosition: formData.workExperienceInfo.jobPosition,
        yearsWorkedInCompany: formData.workExperienceInfo.yearsWorkedInCompany,
        certificate: formData.workExperienceInfo.certificate || null,
        logisticsCompany: formData.workExperienceInfo.logisticsCompany,
        logisticsYearsWorked: formData.workExperienceInfo.logisticsYearsWorked,
        degreeStatus: formData.educationInfo.degreeStatus,
        yearGraduated: formData.educationInfo.yearGraduated,
      },
    });

    await db.jobApplication.create({
      data: {
        jobApplicantId: employee.id,
        positionApplied: formData.workExperienceInfo.positionApplying,
        applicationDate: new Date(),
      },
    });
    return employee;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw new Error("Failed to create employee.");
  }
};

export const login = async (accountNumber: string, password: string) => {
  try {
    const employee = await db.applicantAccount.findUnique({
      where: {
        accountNumber,
      },
    });

    if (!employee) {
      return { error: "No applicant account found." };
    }

    if (employee.password !== password) {
      return { error: "Invalid password" };
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";

    const jwt = await new jose.SignJWT({})
      .setProtectedHeader({ alg })
      .setExpirationTime("72h")
      .setSubject(employee.id.toString())
      .sign(secret);

    (
      await // Set the cookie with the JWT
      cookies()
    ).set("Authorization", jwt, {
      httpOnly: true, // Set to true for security
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 60 * 60 * 24 * 3, // Cookie expiration (3 days in seconds)
      sameSite: "strict", // Adjust according to your needs
      path: "/", // Adjust path as needed
    });

    return { token: jwt };
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Failed to login.");
  }
};

export const logout = async () => {
  (await cookies()).set("Authorization", "", { maxAge: 0, path: "/" });
};

export const submitAnswers = async (payload: any) => {
  try {
    const existingAnswers = await db.applicantAnswer.findMany({
      where: {
        jobApplicantId: payload[0].jobApplicantId,
        questionId: payload[0].questionId,
      },
    });

    if (existingAnswers.length > 0) {
      return { error: "Answers already submitted." };
    }

    await db.applicantAnswer.createMany({
      data: payload,
    });
    return { success: "Answers submitted successfully." };
  } catch (error) {
    console.error("Error submitting answers:", error);
    return { error: "Failed to submit answers." };
  }
};

export const submitEvaluations = async (payload: any[]) => {
  try {
    for (const entry of payload) {
      await db.applicantAnswer.update({
        data: {
          status: entry.status,
          reason: entry.feedback,
        },
        where: {
          jobApplicantId: entry.jobApplicantId,
          questionId: entry.questionId,
          id: entry.applicantAnswerId,
        },
      });
    }
    return { success: "Evaluation submitted successfully." };
  } catch (error) {
    console.error("Error submitting evaluations:", error);
    return { error: "Failed to submit evaluations." };
  }
};

export const submitTrainingEvaluation = async (payload: any[]) => {
  try {
    let totalScore = 0;
    let totalCount = 0;
    let passedCount = 0;
    let failedCount = 0;

    for (const entry of payload) {
      for (const stat of entry.statistics) {
        // Insert each criteria and score into applicantTraining
        await db.applicantTraining.create({
          data: {
            trainingOnsiteId: entry.trainingId,
            status: entry.status,
            jobApplicantId: entry.applicantId,
            score: stat.score,
            item: stat.criteria,
          },
        });
        totalScore += stat.score;
        totalCount += 1;
      }

      // Count passed and failed occurrences
      if (entry.status === "Passed") passedCount++;
      if (entry.status === "Failed") failedCount++;
    }

    // Determine overall status
    const overallStatus =
      passedCount > failedCount
        ? "Passed"
        : failedCount > passedCount
          ? "Failed"
          : "Pending";

    // Calculate average score
    const averageScore = totalCount > 0 ? totalScore / totalCount : 0;

    // Insert the overall result into applicantTrainingScore
    await db.applicantTrainingScore.create({
      data: {
        jobApplicantId: payload[0].applicantId,
        status: overallStatus,
        totalScore: averageScore,
      },
    });

    return { success: "Training evaluation submitted successfully." };
  } catch (error) {
    console.error("Error submitting training evaluation:", error);
    return { error: "Failed to submit training evaluation." };
  }
};

export const sendEmailStatus = async (
  name: string,
  accountNumber: string,
  email: string,
  interviewScore: string,
  interviewStatus: string,
  overallStatus: string,
  trainingScore: string,
  trainingStatus: string
) => {
  try {
    const overallScore =
      (parseFloat(interviewScore) + parseFloat(trainingScore)) / 2;
    await sendEmailStatusNotify(
      name,
      accountNumber,
      email,
      interviewScore,
      interviewStatus,
      overallScore.toString(),
      overallStatus,
      trainingScore,
      trainingStatus
    );
    return { success: "Email sent successfully." };
  } catch (error) {
    console.error("Error sending email:", error);
    return { error: "Failed to send email." };
  }
};

export const sendEmailStatusNotify = async (
  name: string,
  accountNumber: string,
  email: string,
  interviewScore: string,
  interviewStatus: string,
  overallScore: string,
  overallStatus: string,
  trainingScore: string,
  trainingStatus: string
) => {
  const htmlContent = await TrainingPassedEmailHTML({
    name,
    interviewScore,
    interviewStatus,
    overallScore,
    overallStatus,
    trainingScore,
    trainingStatus,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "christian12345montero@gmail.com",
      pass: "xyfmpnnnrmewfnys",
    },
  });

  const message = {
    from: "christian12345montero@gmail.com",
    to: email,
    subject: "Practical Training and Digital Interview Evaluation",
    text: `Dear ${name},\n\nCongratulations! You have passed the practical training and digital interview evaluation. Your overall status is ${overallStatus}.`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(message);

    await db.notification.create({
      data: {
        title: "Practical Training and Digital Interview Evaluation",
        description: `Congratulations! You have passed the practical training and digital interview evaluation. Your overall status is ${overallStatus}.`,
        accountNumber: accountNumber,
      },
    });
    return { success: "Evaluation has been sent." };
  } catch (error) {
    console.error("Error sending notification", error);
    return { message: "An error occurred. Please try again." };
  }
};
