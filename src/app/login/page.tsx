"use client";

import { login } from "@/actions/employee";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const Login = () => {
  const [accountNumber, setAccountNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(accountNumber, password);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success("Login successful. Redirecting to dashboard...");
        window.location.assign("/applicant/my-progress");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen flex items-center flex-col w-full justify-center">
      <Card className="w-[700px] mx-auto p-1">
        <CardHeader>
          <CardTitle>Applicant Login</CardTitle>
          <CardDescription>
            Enter your account number and password to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <Label>
                Applicant ID <span className="text-red-500">*</span>
              </Label>
              <Input
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                disabled={loading}
                placeholder="Enter account number"
                required
              />
            </div>
            <div className="space-y-1">
              <Label>
                Password <span className="text-red-500">*</span>
              </Label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                type="password"
                placeholder="Enter password"
                required
              />
            </div>
            <Link
              href="/forgot-password"
              className="text-primary text-sm hover:underline flex items-center justify-end mt-3"
            >
              Forgot Password?
            </Link>
            <Button disabled={loading} type="submit" className="w-full">
              {loading && <Loader2 className="animate-spin mr-2 w-4 h-4" />}
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
