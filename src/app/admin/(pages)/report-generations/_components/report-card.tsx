import React from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

const ReportCard = ({
  title,
  description,
  count,
  icon: Icon,
}: {
  title: string;
  description: string;
  count: number;
  icon: LucideIcon;
}) => {
  return (
    <Card>
      <CardContent className='p-5'>
        <div className="flex items-center justify-between">
          <p className='font-semibold text-lg'>{title}</p>
          <Icon size={20} className='text-muted-foreground' />
        </div>
		<p className='mt-2 text-4xl font-black'>{count}</p>
		<p className='text-sm text-muted-foreground mt-1'>{description}</p>
      </CardContent>
    </Card>
  );
};

export default ReportCard;
