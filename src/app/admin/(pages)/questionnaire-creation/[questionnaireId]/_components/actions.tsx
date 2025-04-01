"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import ConfirmModal from "@/components/modals/confirm-modal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useConfettiStore } from '@/hooks/use-confetti-store';
import { deleteQuestionnaire, publishQuestionnaire, unpublishQuestionnaire } from '@/actions/questionnaire';

const Actions = ({
  disabled,
  questionnaireId,
  isPublished,
}: {
  disabled: boolean;
  questionnaireId: string;
  isPublished: boolean;
}) => {
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const onDelete = async () => {
    setIsLoading(true);
    try {
      const res = await deleteQuestionnaire(questionnaireId);
      if (res.success) {
        toast.success(res.success);
        router.push(`/admin/questionnaire-creation`);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const onSubmit = async () => {
    setIsLoading(true);
    try {
      if (isPublished) {
        const res = await unpublishQuestionnaire(questionnaireId);
        if (res.success) {
          toast.success(res.success);
        } else {
          toast.error(res.error);
        }
      } else {
        const res = await publishQuestionnaire(questionnaireId);
        if (res.success) {
          toast.success(res.success);
          confetti.onOpen();
        } else {
          toast.error(res.error);
        }
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button variant="success" onClick={onSubmit} disabled={disabled || isLoading}>
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button disabled={isLoading} variant="destructive">
          <Trash className="w-4 h-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Actions;
