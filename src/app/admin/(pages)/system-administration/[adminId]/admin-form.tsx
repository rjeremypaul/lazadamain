"use client";

import { Admin, NewsAnnouncements } from "@prisma/client";
import React from "react";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { createAdmin, updateAdmin } from "@/actions/admin";
import ImageUpload from "@/components/image-upload";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const AdminForm = ({ initialData }: { initialData: Admin | null }) => {
  const generatedPassword = Math.random().toString(36).slice(-8);
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const title = initialData ? "Update Admin Account" : "Add New Admin Account";
  const description = initialData
    ? "Update the admin account details here. Please make sure to fill in all the required fields."
    : "Add a new admin account here. Please make sure to fill in all the required fields.";
  const action = initialData ? "Save Changes" : "Create Admin Account";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      username: initialData?.username || "",
      password: initialData?.password || generatedPassword,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      if (initialData) {
        const res = await updateAdmin(values, initialData.id);
        if (res.success) {
          toast.success(res.success);
          router.push("/admin/system-administration");
        } else {
          toast.error(res.error);
        }
      } else {
        const res = await createAdmin(values);
        if (res.success) {
          toast.success(res.success);
          router.push("/admin/system-administration");
        } else {
          toast.error(res.error);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save admin account");
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
              name="name"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type={initialData ? "password" : "text"}
                      {...(initialData ? {} : { readOnly: true })}
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This password is system generated. You can change your
                    password in your account.
                  </FormDescription>
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

export default AdminForm;
