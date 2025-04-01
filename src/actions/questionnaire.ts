"use server";

import db from "@/lib/db";

export const createQuestionnaire = async (
  title: string,
  description: string
) => {
  if (!title || !description) {
    return { error: "Title and description are required" };
  }

  try {
    const response = await db.questionnaire.create({
      data: {
        title,
        description,
      },
    });
    return { success: "Questionnaire created successfully", id: response.id };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again." };
  }
};

export const updateQuestionnaireTitle = async (title: string, id: string) => {
  if (!title) {
    return { error: "Title is required" };
  }

  try {
    await db.questionnaire.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });
    return { success: "Questionnaire updated successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again." };
  }
};

export const updateQuestionnaireDescription = async (
  description: string,
  id: string
) => {
  if (!description) {
    return { error: "Description is required" };
  }

  try {
    await db.questionnaire.update({
      where: {
        id,
      },
      data: {
        description,
      },
    });
    return { success: "Questionnaire updated successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again." };
  }
};

export const createQuestion = async (
  question: string,
  questionnaireId: string
) => {
  if (!question) {
    return { error: "Question is required" };
  }

  try {
    const lastQuestion = await db.question.findFirst({
      where: {
        questionnaireId: questionnaireId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastQuestion ? lastQuestion.position + 1 : 1;

    const questions = await db.question.create({
      data: {
        question,
        questionnaireId,
        position: newPosition,
        isPublished: true,
      },
    });
    return { success: "Question added successfully", id: questions.id };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again." };
  }
};

export const reorderQuestions = async (
  updateData: { questionId: string; position: number }[],
  questionnaireId: string
) => {
  try {
    const questionnaireOwner = await db.questionnaire.findUnique({
      where: { id: questionnaireId },
    });

    if (!questionnaireOwner) {
      return { error: "No questionnaire found" };
    }

    // Update positions in a single transaction
    await db.$transaction(
      updateData.map((item) =>
        db.question.update({
          where: { id: item.questionId },
          data: { position: item.position },
        })
      )
    );

    return { success: "Questions reordered successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again." };
  }
};

export const updateQuestionTitle = async (
  question: string,
  questionnaireId: string,
  questionId: string
) => {
  if (!questionnaireId) {
    return { error: "Questionnaire ID is required" };
  }

  if (!questionId) {
    return { error: "Question ID is required" };
  }

  if (!question) {
    return { error: "Question is required" };
  }

  try {
    const questionnaire = await db.questionnaire.findUnique({
      where: {
        id: questionnaireId,
      },
    });

    if (!questionnaire) {
      return { error: "No questionnaire found" };
    }

    const questions = await db.question.update({
      data: {
        question,
      },
      where: { id: questionId, questionnaireId },
    });

    return { id: questions.id, success: "Question updated successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again." };
  }
};

export const updateQuestionAccess = async (
  isPublished: boolean,
  questionnaireId: string,
  questionId: string
) => {
  if (!questionnaireId) {
    return { error: "Questionnaire ID is required" };
  }

  if (!questionId) {
    return { error: "Question ID is required" };
  }

  try {
    const questionnaire = await db.questionnaire.findUnique({
      where: {
        id: questionnaireId,
      },
    });

    if (!questionnaire) {
      return { error: "No questionnaire found" };
    }

    const questions = await db.question.update({
      data: {
        isPublished,
      },
      where: { id: questionId, questionnaireId },
    });

    return { id: questions.id, success: "Question updated successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again." };
  }
};

export const deleteQuestionnaire = async (questionnaireId: string) => {
  if (!questionnaireId) {
    return { error: "Questionnaire ID is required" };
  }

  try {
    const questionnaire = await db.questionnaire.findUnique({
      where: {
        id: questionnaireId,
      },
    });

    if (!questionnaire) {
      return { error: "No questionnaire found" };
    }

    await db.questionnaire.delete({
      where: {
        id: questionnaireId,
      },
    });

    return { success: "Questionnaire deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again." };
  }
};

export const publishQuestionnaire = async (questionnaireId: string) => {
  if (!questionnaireId) {
    return { error: "Questionnaire ID is required" };
  }

  try {
    const questionnaire = await db.questionnaire.findUnique({
      where: { id: questionnaireId },
      include: {
        question: true,
      },
    });

    if (!questionnaire) {
      return { error: "Questionnaire not found" };
    }

    const hasPublishedQuestion = questionnaire.question.some(
      (item) => item.isPublished
    );

    if (
      !questionnaire.title ||
      !questionnaire.description ||
      !hasPublishedQuestion
    ) {
      return {
        error:
          "Please complete all the required fields before publishing the questionnaire",
      };
    }

    await db.questionnaire.update({
      data: {
        isPublished: true,
      },
      where: { id: questionnaireId },
    });

    return { success: "Questionnaire published successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again." };
  }
};

export const unpublishQuestionnaire = async (questionnaireId: string) => {
  if (!questionnaireId) {
    return { error: "Questionnaire ID is required" };
  }

  try {
    const questionnaire = await db.questionnaire.findUnique({
      where: { id: questionnaireId },
      include: {
        question: true,
      },
    });

    if (!questionnaire) {
      return { error: "Questionnaire not found" };
    }

    await db.questionnaire.update({
      data: {
        isPublished: false,
      },
      where: { id: questionnaireId },
    });

    return { success: "Questionnaire unpublished successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again." };
  }
};
