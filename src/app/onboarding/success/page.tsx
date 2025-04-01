"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const OnboardingSuccess = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image src="/success.png" width={300} height={300} alt="Success" />
      <h1 className="text-3xl font-bold mt-3">Application Submitted</h1>
      <p className="text-lg mt-2 text-muted-foreground text-center">
        You have successfully completed the onboarding process. We&apos;re excited to help you find your next job! <br />We will notify you once we evaluate your application.
      </p>
      <Button onClick={() => router.push("/")} className="mt-4">Back to homepage &rarr;</Button>
    </div>
  );
};

export default OnboardingSuccess;
