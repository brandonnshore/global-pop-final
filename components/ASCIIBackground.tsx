"use client";

import { useState, useEffect } from "react";

export default function ASCIIBackground() {
  const [displayLines, setDisplayLines] = useState<string[]>([]);

  // Clearer, more readable ASCII art (Standard/Big style)
  const targetLines = [
    "  _  __    _    _   _ __   __ ___ ",
    " | |/ /   / \\  | \\ | |\\ \\ / /| __|",
    " | ' /   / _ \\ |  \\| | \\ V / | _| ",
    " | . \\  / ___ \\| |\\  |  | |  | |__",
    " |_|\\_\\/_/   \\_\\_| \\_|  |_|  |___|",
    "                                  ",
    "   ____ _     ___  ____    _    _       ____  ___  ____  ",
    "  / ___| |   / _ \\| __ )  / \\  | |     |  _ \\/ _ \\|  _ \\ ",
    " | |  _| |  | | | |  _ \\ / _ \\ | |     | |_) | | | | |_) |",
    " | |_| | |__| |_| | |_) / ___ \\| |___  |  __/| |_| |  __/ ",
    "  \\____|_____\\___/|____/_/   \\_\\_____| |_|    \\___/|_|    ",
    "                                                          "
  ];

  useEffect(() => {
    let frame = 0;
    const totalFrames = 40; // Animation duration ~2s at 20fps

    const interval = setInterval(() => {
      frame++;

      const newLines = targetLines.map((line, lineIndex) => {
        return line.split('').map((char, charIndex) => {
          // If character is a space, keep it a space
          if (char === ' ') return ' ';

          // Random chance to show correct character based on progress
          // Progress goes from 0 to 1
          const progress = frame / totalFrames;

          // Add some randomness based on position to create a "wave" or "scan" feel
          const positionOffset = (charIndex + lineIndex * 5) / 100; // Faster wave for shorter lines
          const adjustedProgress = Math.max(0, progress - positionOffset);

          if (adjustedProgress >= 1) return char;

          // If not resolved, show random glitch char or space
          if (Math.random() < adjustedProgress) {
            // 50% chance to show correct char early if we are close
            if (Math.random() > 0.5) return char;
            // Otherwise show random char
            const chars = "▒░▓█▀▄▐▌!@#$%^&*()_+";
            return chars[Math.floor(Math.random() * chars.length)];
          }

          return ' ';
        }).join('');
      });

      setDisplayLines(newLines);

      if (frame >= totalFrames + 20) { // Allow some extra frames for the wave to finish
        clearInterval(interval);
        setDisplayLines(targetLines); // Ensure final state is clean
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden mix-blend-multiply opacity-20">
      <div className="font-mono text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] leading-[1.1] text-black select-none whitespace-pre text-center font-bold">
        {displayLines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );
}
