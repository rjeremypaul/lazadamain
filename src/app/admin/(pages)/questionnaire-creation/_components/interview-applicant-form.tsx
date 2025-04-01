"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { SendIcon } from "lucide-react";
import { Questionnaire } from "@prisma/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  applicantId: z.string().min(1, { message: "Applicant is required" }),
  questionnaireId: z.string().min(1, { message: "Questionnaire is required" }),
});

const InterviewApplicantForm = ({
  applicants,
  questionnaire,
}: {
  applicants: any[];
  questionnaire: Questionnaire[];
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicantId: "",
      questionnaireId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setTimeout(() => {
      router.push(
        `/admin/questionnaire-creation/${values.questionnaireId}/interview-applicant/${values.applicantId}`
      );
    }, 2000);
  }
  return (
    <>
      <Modal
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        title="Interview Applicant"
        description="Select an applicant and a questionnaire to interview an applicant."
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="applicantId"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Applicant</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select applicant" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {applicants.map((applicant) => (
                          <SelectItem key={applicant.id} value={applicant.id}>
                            {applicant.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="questionnaireId"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Questionnaire</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select questionnaire" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {questionnaire.map((question) => (
                          <SelectItem key={question.id} value={question.id}>
                            {question.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} type="submit">
              Save Changes
            </Button>
          </form>
        </Form>
      </Modal>
      <Button onClick={() => setIsOpen(true)} size="sm" variant="success">
        <SendIcon />
        Interview Applicant
      </Button>
    </>
  );
};

export default InterviewApplicantForm;
