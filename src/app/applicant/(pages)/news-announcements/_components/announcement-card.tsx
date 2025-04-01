"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';

const AnnouncementCard = ({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description: string;
  imageUrl: string | null;
}) => {
  return (
    <Card>
      <CardContent className='p-3 overflow-hidden'>
        <div className='relative w-full h-60 scale-95 hover:scale-100 transition-transform duration-300'>
			<Image src={imageUrl as string} alt={title} fill className='w-full h-full object-cover rounded-lg' />
		</div>
		<p className='text-lg font-semibold mt-3'>{title}</p>
		<p className='text-sm text-muted-foreground mt-1 line-clamp-3'>{description}</p>
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;
