"use client";

import { TrainingOnsite } from "@prisma/client";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { createOnsiteTraining, updateOnsiteTraining } from "@/actions/training";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

const TrainingForm = ({
  initialData,
}: {
  initialData: TrainingOnsite | null;
}) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const title = initialData
    ? "Update Onsite Training"
    : "Add New Onsite Training";
  const description = initialData
    ? "Update the onsite training details here. Please make sure to fill in all the required fields."
    : "Add a new onsite training here. Please make sure to fill in all the required fields.";
  const action = initialData ? "Save Changes" : "Create Onsite Training";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      if (initialData) {
        const res = await updateOnsiteTraining(values, initialData.id);
        if (res.success) {
          toast.success(res.success);
          router.push("/admin/on-sight-creation");
        } else {
          toast.error(res.error);
        }
      } else {
        const res = await createOnsiteTraining(values);
        if (res.success) {
          toast.success(res.success);
          router.push("/admin/on-sight-creation");
        } else {
          toast.error(res.error);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save onsite training");
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
                    <Input placeholder="e.g. 'Auto Move Scanner'" {...field} />
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
                  <FormLabel>
                    Description{" "}
                    <span className="text-muted-foreground">
                      (separated by '|')
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. Performance in operating auto move. | Understanding of scanning procedures."
                      {...field}
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

export default TrainingForm;
