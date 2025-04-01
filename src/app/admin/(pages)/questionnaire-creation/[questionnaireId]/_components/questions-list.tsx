"use client";

import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Grip, PencilIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Question } from "@prisma/client";

const QuestionsList = ({
  items,
  onReorder,
  onEdit,
}: {
  items: Question[];
  onReorder: (updateData: { questionId: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const [questions, setQuestions] = React.useState<Question[]>(items);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    setQuestions(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedQuestions = Array.from(questions);
    const [reorderedItem] = reorderedQuestions.splice(result.source.index, 1);
    reorderedQuestions.splice(result.destination.index, 0, reorderedItem);

    // Update positions for all questions
    const bulkUpdateData = reorderedQuestions.map((question, index) => ({
      questionId: question.id,
      position: index, // New position based on index
    }));

    setQuestions(reorderedQuestions);
    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="questions">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {questions.map((question, index) => (
              <Draggable
                key={question.id}
                draggableId={question.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      question.isPublished &&
                        "bg-amber-100 border-amber-200 text-amber-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        question.isPublished &&
                          "border-r-amber-200 hover:bg-amber-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    {question.question}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      <Badge
                        className={cn(
                          "bg-slate-500",
                          question.isPublished && "bg-amber-700"
                        )}
                      >
                        {question.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <PencilIcon
                        className="cursor-pointer w-4 h-4 hover:opacity-75 transition"
                        onClick={() => onEdit(question.id)}
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default QuestionsList;
