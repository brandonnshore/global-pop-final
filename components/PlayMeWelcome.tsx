'use client';

import React, { useState, useRef } from 'react';

export default function PlayMeWelcome() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="p-12 max-w-3xl mx-auto text-center bg-gradient-to-br from-[#f5f1e8] to-[#e8dcc8] min-h-[500px] flex flex-col items-center justify-center">
      {/* Big Welcome Header */}
      <div className="mb-12">
        <h1
          className="text-8xl font-black text-black mb-4 tracking-tight"
          style={{
            textShadow: '6px 6px 0 rgba(0,0,0,0.2)',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          WELCOME
        </h1>
        <div className="text-2xl font-bold text-black/70 tracking-wide">
          TO KANYE GLOBAL POP
        </div>
      </div>

      {/* Play Button */}
      <button
        onClick={handlePlayPause}
        className="group relative mb-8"
        aria-label={isPlaying ? 'Pause intro' : 'Play intro'}
      >
        <div
          className={`w-32 h-32 rounded-full border-8 border-black flex items-center justify-center transition-all duration-300 ${
            isPlaying
              ? 'bg-red-500 scale-110 shadow-2xl'
              : 'bg-white hover:bg-gray-100 hover:scale-105 shadow-xl'
          }`}
        >
          {isPlaying ? (
            // Pause icon
            <div className="flex gap-2">
              <div className="w-4 h-12 bg-black"></div>
              <div className="w-4 h-12 bg-black"></div>
            </div>
          ) : (
            // Play icon
            <div
              className="w-0 h-0 ml-2"
              style={{
                borderLeft: '24px solid black',
                borderTop: '20px solid transparent',
                borderBottom: '20px solid transparent',
              }}
            ></div>
          )}
        </div>

        {/* Pulsing ring when playing */}
        {isPlaying && (
          <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-ping opacity-40"></div>
        )}
      </button>

      {/* Status Text */}
      <div className="mb-8">
        <p className="text-xl font-bold text-black mb-2">
          {isPlaying ? 'Playing Introduction...' : 'Press Play to Begin'}
        </p>
        <p className="text-sm text-black/60">
          An interactive exploration of Kanye West&apos;s global sampling practices
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-1 bg-black my-6"></div>

      {/* Instructions - Mac OS Style */}
      <div className="bg-[#f5f1e8] border-3 border-black p-6 max-w-xl"
           style={{
             boxShadow: 'inset -2px -2px 0 rgba(0,0,0,0.3), inset 2px 2px 0 rgba(255,255,255,0.7), 4px 4px 0 rgba(0,0,0,0.2)'
           }}>
        <h3 className="text-base font-bold text-black mb-3 tracking-wide">HOW TO NAVIGATE</h3>
        <p className="text-sm text-black leading-relaxed">
          Double-click any folder icon on the desktop to explore different sections. Each section contains interactive elements, audio narration, and academic sources.
        </p>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
      >
        <source src="/intro.m4a" type="audio/mp4" />
        <source src="/intro.m4a" type="audio/x-m4a" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
