"use client";

import { useEffect, useState } from "react";

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  const bootMessages = [
    "Loading System 7.5.5...",
    "Initializing Kanye Global Pop OS...",
    "Loading desktop patterns...",
    "Mounting volumes...",
    "Starting Finder...",
    "Welcome to global pop culture.",
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % bootMessages.length);
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#f5f1e8] flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-8">
          <div className="text-black text-6xl font-bold mb-4">
            KANYE GLOBAL POP
          </div>
          <div className="text-black text-xl">OS</div>
        </div>

        <div className="w-96 mx-auto">
          <div className="text-black text-sm mb-4 font-mono h-6">
            {bootMessages[currentMessage]}
          </div>

          {/* Classic Mac progress bar */}
          <div className="w-full h-8 border-4 border-black bg-[#f5f1e8] p-1">
            <div
              className="h-full bg-black transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="text-black text-sm mt-2">{progress}%</div>
        </div>

        {/* Blinking cursor */}
        <div className="mt-8 text-black text-xl font-mono">
          <span className="animate-pulse">█</span>
        </div>
      </div>
    </div>
  );
}
