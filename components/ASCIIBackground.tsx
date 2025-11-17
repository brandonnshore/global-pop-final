"use client";

import { useState, useEffect } from "react";

export default function ASCIIBackground() {
  const [visibleChars, setVisibleChars] = useState(0);

  // ASCII art for "KANYE" - K A N Y E clearly spelled
  const kanyeArt = [
    "####    ####            ####                ####        ####        ####        ####        ################",
    "####   ####            ######               ####        ####        ####        ####        ################",
    "####  ####            #### ####             ####        ####        ####        ####        ####            ",
    "#### ####            ####  ####             ######      ####        ####        ####        ####            ",
    "########            ####    ####            #### ####   ####         ####      ####         ################",
    "#### ####          ##############           ####  ####  ####          ####    ####          ################",
    "####  ####        ####        ####          ####   #### ####           ####  ####           ####            ",
    "####   ####      ####          ####         ####    ########            ########            ####            ",
    "####    ####    ####            ####        ####     #######            ####                ####            ",
    "####     ####  ####              ####       ####      ######            ####                ####            ",
    "####      ####                              ####                        ####                ################",
    "####       ####                             ####                        ####                ################",
  ];

  // ASCII art for "GLOBAL POP" (centered under KANYE)
  const globalPopArt = [
    "                                                                                                            ",
    "             ########      ####            #######       ########      ####      ####          ########      #######       ########   ",
    "            ##########     ####           #########      ##########    ####      ####          #########    #########      ######### ",
    "            ####           ####          ####   ####     ####   ####  ######     ####          ####  ####  ####   ####     ####  ####",
    "            ####           ####          ####   ####     ####   #### ########    ####          ####  ####  ####   ####     ####  ####",
    "            ####  ####     ####          ####   ####     ##########  #### ####   ####          ########    ####   ####     ######## ",
    "            ####  ####     ####          ####   ####     ##########  ####  ####  ####          ########    ####   ####     ######## ",
    "            ####  ####     ####          ####   ####     ####   #### ##########  ####          ####        ####   ####     ####     ",
    "            ##########     ##########     #########      ####   #### ####  ####  ##########    ####         #########      ####     ",
    "             ########      ##########      #######       ####   #### ####  ####  ##########    ####          #######       ####     ",
  ];

  const fullArt = [...kanyeArt, ...globalPopArt];
  const totalChars = fullArt.join("").length;
  const duration = 20000; // 20 seconds
  const intervalTime = duration / totalChars;

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleChars((prev) => {
        if (prev >= totalChars) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [totalChars, intervalTime]);

  const renderArt = () => {
    let charCount = 0;
    return fullArt.map((line, lineIndex) => {
      const lineChars = line.split("").map((char, charIndex) => {
        charCount++;
        const isVisible = charCount <= visibleChars;
        return (
          <span key={`${lineIndex}-${charIndex}`} className={isVisible ? "opacity-100" : "opacity-0"}>
            {char}
          </span>
        );
      });
      return (
        <div key={lineIndex} className="whitespace-pre">
          {lineChars}
        </div>
      );
    });
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <div className="font-mono text-[12px] leading-tight text-black opacity-25 select-none">
        {renderArt()}
      </div>
    </div>
  );
}
