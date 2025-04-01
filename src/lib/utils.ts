import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateAllTimes = () => {
  const times: string[] = [];
  let currentHour = 8;
  let currentMinute = 0;

  while (currentHour < 23 || (currentHour === 23 && currentMinute === 0)) {
    const period = currentHour >= 12 ? "PM" : "AM";
    const hour = currentHour > 12 ? currentHour - 12 : currentHour;
    const formattedTime = `${hour}:${currentMinute.toString().padStart(2, "0")} ${period}`;
    times.push(formattedTime);

    currentMinute += 60; // 60-minute intervals
    if (currentMinute >= 60) {
      currentMinute = 0;
      currentHour++;
    }
  }

  return times;
};
