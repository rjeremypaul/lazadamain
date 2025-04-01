"use client";
import { Question, Questionnaire } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import QuestionsList from "./questions-list";
import { createQuestion, reorderQuestions } from "@/actions/questionnaire";

const formSchema = z.object({
  question: z.string().min(1, { message: "Question is required" }),
});

const QuestionForm = ({
  initialData,
  questionnaireId,
}: {
  initialData: Questionnaire & { question: Question[] };
  questionnaireId: string;
}) => {
  const router = useRouter();
  const [isCreating, setIsCreating] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const toggleCreating = () => setIsCreating((prev) => !prev);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { question: "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await createQuestion(values.question, questionnaireId);
      if (res.success) {
        toast.success(res.success);
        setIsCreating(false);
        router.refresh();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const onReorder = async (
    updateData: { questionId: string; position: number }[]
  ) => {
    try {
      setIsUpdating(true);
      const res = await reorderQuestions(updateData, questionnaireId);
      if (res.success) {
        toast.success(res.success);
        router.refresh();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    window.location.href = `/admin/questionnaire-creation/${questionnaireId}/question/${id}`;
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 relative">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-amber-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Questionnaire Items
        <Button onClick={toggleCreating} variant="outline">
          {isCreating && <>Cancel</>}
          {!isCreating && (
            <>
              <PlusCircle className="w-4 h-4" />
              Add a question
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            className="space-y-4 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      {...field}
                      disabled={isSubmitting}
                      className="bg-white"
                      placeholder="e.g. 'What is the proccess of scanning automatically?'"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.question.length && "text-slate-500 italic"
          )}
        >
          {!initialData.question.length && "No question added yet"}
          <QuestionsList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.question || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the questions
        </p>
      )}
    </div>
  );
};

export default QuestionForm;
