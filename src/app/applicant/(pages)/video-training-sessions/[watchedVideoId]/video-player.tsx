"use client";

import { Pause, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import { videoTrainingEnded } from "@/actions/video-training";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface VideoPlayerProps {
  videoUrl: string;
  videoWatchedId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  videoWatchedId,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [videoDuration, setVideoDuration] = useState(0);
  const confetti = useConfettiStore();
  const router = useRouter();
  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const handleMetadataLoad = () => {
        setVideoDuration(video.duration); // Set duration when metadata is loaded
        console.log(`Video Duration: ${video.duration} seconds`);
      };

      const handleVideoEnd = async () => {
        const res = await videoTrainingEnded(videoWatchedId);
        if (res.success) {
          confetti.onOpen();
          toast.success(res.success);
          setTimeout(() => {
            router.push("/applicant/video-training-sessions");
          }, 3000);
        } else {
          toast.error(res.error);
        }

        setIsPlaying(false); // Reset play state when video ends
        setShowControls(true); // Show controls when video ends
      };

      video.addEventListener("loadedmetadata", handleMetadataLoad);
      video.addEventListener("ended", handleVideoEnd);

      return () => {
        video.removeEventListener("loadedmetadata", handleMetadataLoad);
        video.removeEventListener("ended", handleVideoEnd);
      };
    }
  }, [videoWatchedId]);

  const handlePlayPause = () => {
    const video = videoRef.current;

    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMouseEnter = () => setShowControls(true);
  const handleMouseLeave = () => {
    if (isPlaying) setShowControls(false);
  };

  return (
    <div
      className="relative w-full h-[70vh] rounded-lg flex justify-center items-center bg-black"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        className="w-full h-full rounded-lg"
        controls={false}
        onClick={handlePlayPause}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        className={`absolute inset-0 flex justify-center items-center transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={handlePlayPause}
          className="bg-black/50 hover:bg-red-600 text-white w-20 h-20 flex items-center justify-center rounded-lg shadow focus:outline-none"
        >
          {isPlaying ? <Pause size={40} /> : <Play size={40} />}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
