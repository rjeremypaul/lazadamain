"use client";

import { NewsAnnouncements } from "@prisma/client";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  createNewsAnnouncement,
  updateNewsAnnouncement,
} from "@/actions/news-announcement";
import ImageUpload from "@/components/image-upload";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  imageUrl: z.string().min(1, { message: "Image URL is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

const NewsAnnouncementForm = ({
  initialData,
}: {
  initialData: NewsAnnouncements | null;
}) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const title = initialData
    ? "Update News and Announcement"
    : "Add New News and Announcement";
  const description = initialData
    ? "Update the news and announcement details here. Please make sure to fill in all the required fields."
    : "Add a new news and announcement here. Please make sure to fill in all the required fields.";
  const action = initialData ? "Save Changes" : "Create News and Announcement";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      imageUrl: initialData?.imageUrl || "",
      description: initialData?.description || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      if (initialData) {
        const res = await updateNewsAnnouncement(values, initialData.id);
        if (res.success) {
          toast.success(res.success);
          router.push("/admin/news-announcements");
        } else {
          toast.error(res.error);
        }
      } else {
        const res = await createNewsAnnouncement(values);
        if (res.success) {
          toast.success(res.success);
          router.push("/admin/news-announcements");
        } else {
          toast.error(res.error);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save news and announcement");
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
              name="imageUrl"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      defaultValue={field.value}
                      onImageUpload={field.onChange}
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

export default NewsAnnouncementForm;
