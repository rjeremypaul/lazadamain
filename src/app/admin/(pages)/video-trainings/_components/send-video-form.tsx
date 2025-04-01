"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { SendIcon } from "lucide-react";
import { VideoTraining } from "@prisma/client";
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
import { toast } from "sonner";
import { sendVideoToApplicant } from "@/actions/training";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  applicantId: z.string().min(1, { message: "Applicant is required" }),
  videoId: z.string().min(1, { message: "Video is required" }),
});

const SendVideoForm = ({
  applicants,
  videos,
}: {
  applicants: any[];
  videos: VideoTraining[];
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicantId: "",
      videoId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const res = await sendVideoToApplicant(values);
      if (res.success) {
        toast.success(res.success);
        router.refresh();
        setIsOpen(false);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send video to applicant");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Modal
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        title="Send video to applicant"
        description="You can send video trainings to a specific applicant."
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
              name="videoId"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Training</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select video training" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {videos.map((video) => (
                          <SelectItem key={video.id} value={video.id}>
                            {video.title}
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
        Send Video
      </Button>
    </>
  );
};

export default SendVideoForm;
