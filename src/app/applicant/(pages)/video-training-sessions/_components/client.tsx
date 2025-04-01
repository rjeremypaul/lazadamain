"use client";

import React from "react";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

interface VideoSessionClientProps {
  data: {
    id: string;
    videoName: string;
    description: string;
    status: string
    createdAt: string;
  }[];
}

const VideoSessionClient: React.FC<VideoSessionClientProps> = ({ data }) => {
  const router = useRouter();
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-white relative rounded-lg shadow-lg border p-4 flex flex-col space-y-2"
        >
          <Badge className='absolute -top-3 left-5' variant={item.status === "Watched" ? "success" : "destructive"}>{item.status}</Badge>
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">{item.videoName}</h1>
            <span className="text-sm text-gray-500">{item.createdAt}</span>
          </div>
          <p className="text-sm text-gray-500">{item.description}</p>
          <Button onClick={() => router.push(`/applicant/video-training-sessions/${item.id}`)} className='mt-3'>Watch Video</Button>
        </div>
      ))}
    </div>
  );
};

export default VideoSessionClient;
