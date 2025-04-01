"use client";

import { uploadToS3 } from "@/lib/s3";
import { Video, X } from "lucide-react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const VideoUpload = ({
  onVideoUpload,
  className,
  defaultValue = "",
}: {
  onVideoUpload: (url: string) => void;
  defaultValue?: string;
  className?: string;
}) => {
  const [videoUrl, setVideoUrl] = useState<string>(defaultValue);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "video/mp4": [".mp4"],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 1) {
        toast.error("You can only upload 1 video.");
        return;
      }

      const file = acceptedFiles[0];
      if (file.size > 50 * 1024 * 1024) {
        toast.error("Please upload a video smaller than 50MB.");
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setVideoUrl(previewUrl);

      try {
        toast.loading("Uploading video...");
        const { url } = await uploadToS3(file);
        toast.success("Video uploaded successfully!");
        setVideoUrl(url);
        onVideoUpload(url);
        toast.dismiss();
      } catch (error) {
        setVideoUrl(""); // Remove the preview if upload fails
        toast.error("Video upload failed.");
        console.log(error);
      }
    },
  });

  const handleRemoveVideo = () => {
    setVideoUrl("");
    toast.info("Video removed.");
    onVideoUpload("");
  };

  return (
    <div className={cn("rounded-xl", className)}>
      <div
        {...getRootProps({
          className:
            "border-dashed border-[3px] rounded-xl cursor-pointer h-[200px] flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        {videoUrl ? (
          <div className="relative w-full h-[200px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-0 right-0">
              <Button
                variant="destructive"
                type="button"
                size="icon"
                onClick={handleRemoveVideo}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <video
              src={videoUrl}
              controls
              className="object-contain w-full h-full"
            />
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <Video className='w-6 h-6 text-muted-foreground' />
            <p className="mt-2 text-sm text-muted-foreground">
              Drag & drop a video, or click to select (MP4 only, max 50MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
