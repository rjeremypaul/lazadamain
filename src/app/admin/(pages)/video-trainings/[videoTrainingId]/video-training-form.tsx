"use client";

import { VideoTraining } from "@prisma/client";
import React from "react";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import VideoUpload from "@/components/video-upload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  createVideoTraining,
  updateVideoTraining,
} from "@/actions/video-training";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  videoUrl: z.string().min(1, { message: "Video URL is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

const VideoTrainingForm = ({
  initialData,
}: {
  initialData: VideoTraining | null;
}) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const title = initialData
    ? "Update Video Training"
    : "Add New Video Training";
  const description = initialData
    ? "Update the video training details here. Please make sure to fill in all the required fields."
    : "Add a new video training here. Please make sure to fill in all the required fields.";
  const action = initialData ? "Save Changes" : "Create Video Training";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      videoUrl: initialData?.videoUrl || "",
      description: initialData?.description || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      if (initialData) {
        const res = await updateVideoTraining(values, initialData.id);
        if (res.success) {
          toast.success(res.success);
          router.push("/admin/video-trainings");
        } else {
          toast.error(res.error);
        }
      } else {
        const res = await createVideoTraining(values);
        if (res.success) {
          toast.success(res.success);
          router.push("/admin/video-trainings");
        } else {
          toast.error(res.error);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save video training");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <Heading title={title} description={description} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 mb-4 mt-8">
            <FormField
              control={form.control}
              name="title"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="videoUrl"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video</FormLabel>
                  <FormControl>
                    <VideoUpload
                      defaultValue={field.value}
                      onVideoUpload={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading}>{action}</Button>
        </form>
      </Form>
    </div>
  );
};

export default VideoTrainingForm;
