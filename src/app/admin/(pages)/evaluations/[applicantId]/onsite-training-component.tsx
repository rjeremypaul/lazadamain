"use client";

import { TrainingOnsite } from "@prisma/client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { submitTrainingEvaluation } from "../../../../../actions/employee";
import { useRouter } from "next/navigation";

const OnsiteTrainingComponent = ({
  applicant,
  onsiteTraining,
}: {
  applicant: any;
  onsiteTraining: TrainingOnsite[];
}) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [statusMap, setStatusMap] = React.useState<Record<string, string>>({});
  const [trainingData, setTrainingData] = React.useState<
    Record<string, { criteria: string; score: number; disabled: boolean }[]>
  >(
    onsiteTraining.reduce(
      (acc, item) => {
        acc[item.id] = []; // Initialize each training item with an empty array
        return acc;
      },
      {} as Record<
        string,
        { criteria: string; score: number; disabled: boolean }[]
      >
    )
  );

  const handleStatusChange = (questionId: string, value: string) => {
    setStatusMap((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleAddRow = (itemId: string) => {
    setTrainingData((prev) => ({
      ...prev,
      [itemId]: [...prev[itemId], { criteria: "", score: 0, disabled: false }],
    }));
  };

  const handleDeleteRow = (itemId: string, index: number) => {
    setTrainingData((prev) => ({
      ...prev,
      [itemId]: prev[itemId].filter((_, i) => i !== index),
    }));
  };

  const handleInputChange = (
    itemId: string,
    index: number,
    field: "criteria" | "score",
    value: string | number
  ) => {
    setTrainingData((prev) => {
      const updatedRows = [...prev[itemId]];
      updatedRows[index] = {
        ...updatedRows[index],
        [field]: value,
      };
      return { ...prev, [itemId]: updatedRows };
    });
  };

  const handleSubmitRow = (itemId: string, index: number) => {
    setTrainingData((prev) => {
      const updatedRows = [...prev[itemId]];
      updatedRows[index] = { ...updatedRows[index], disabled: true };
      return { ...prev, [itemId]: updatedRows };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = onsiteTraining.map((item) => {
      return {
        trainingId: item.id,
        status: statusMap[item.id] || "",
        statistics: trainingData[item.id].map((row) => ({
          criteria: row.criteria,
          score: row.score,
        })),
        applicantId: applicant.id,
      };
    });

    try {
      const res = await submitTrainingEvaluation(payload);
      if (res.success) {
        toast.success(res.success);
        router.push("/admin/evaluations");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error("Error submitting evaluation:", error);
      toast.error("Error submitting evaluation");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-3">
      <div className="border shadow-lg rounded-lg p-5">
        <h3>
          <b>Applicant's Name:</b> {applicant.name}
        </h3>
        <h3>
          <b>Email Address:</b> {applicant.email}
        </h3>
        <h3>
          <b>Account Number:</b> {applicant.applicantAccount[0]?.accountNumber}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mt-5 space-y-4">
            {onsiteTraining.map((item) => (
              <div key={item.id} className="flex flex-col">
                <h1 className="text-xl font-bold">{item.title}</h1>
                <Separator className="my-3" />
                <div className="flex flex-col space-y-1">
                  {item.description.split("|").map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
                <div className="bg-gray-100 border shadow-md mt-3 p-3">
                  <h3 className="font-bold">Evaluation:</h3>
                  <Select
                    disabled={loading}
                    onValueChange={(value) =>
                      handleStatusChange(item.id, value)
                    }
                  >
                    <SelectTrigger
                      className={`text-black mt-1 ${
                        statusMap[item.id] === "Failed"
                          ? "bg-red-200/80 text-black border-red-700"
                          : statusMap[item.id] === "Passed"
                            ? "bg-green-200/80 text-black border-green-700"
                            : "bg-gray-300"
                      }`}
                    >
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Passed">Passed</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="bg-gray-100 border shadow-md mt-3 p-3">
                  <h3 className="font-bold">Statistics:</h3>
                  <Table className="border border-gray-400 mt-2 rounded-lg">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Criteria</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trainingData[item.id].map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input
                              className="border border-zinc-400"
                              placeholder="e.g. Accuracy"
                              value={row.criteria}
                              disabled={row.disabled || loading}
                              onChange={(e) =>
                                handleInputChange(
                                  item.id,
                                  index,
                                  "criteria",
                                  e.target.value
                                )
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              className="border border-zinc-400"
                              type="number"
                              placeholder="e.g. 90"
                              value={row.score}
                              disabled={row.disabled || loading}
                              onChange={(e) =>
                                handleInputChange(
                                  item.id,
                                  index,
                                  "score",
                                  Number(e.target.value)
                                )
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              className="mr-2"
                              variant="success"
                              size="sm"
                              onClick={() => handleSubmitRow(item.id, index)}
                              disabled={row.disabled || loading}
                            >
                              Submit
                            </Button>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteRow(item.id, index)}
                              disabled={row.disabled || loading}
                            >
                              Delete Row
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={3}>
                          <Button
                            type="button"
                            disabled={loading}
                            className="w-full bg-sky-500 hover:bg-sky-500/90 text-white"
                            variant="secondary"
                            size="sm"
                            onClick={() => handleAddRow(item.id)}
                          >
                            Add Another Row
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              </div>
            ))}
          </div>
          <div>
            <Button
              disabled={loading}
              type="button"
              variant="outline"
              className="mt-5 mr-2"
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              type="submit"
              className="mt-5"
              variant="success"
            >
              Submit Evaluation
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnsiteTrainingComponent;
