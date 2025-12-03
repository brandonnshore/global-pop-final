'use client';

import React, { useState, useRef } from 'react';

export default function SectionOneRecordRoom() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) {
      console.error('Audio element not found');
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing audio:', error);
        alert('Unable to play audio. Please check browser permissions.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl">
        {/* Clickable Background Image */}
        <button
          onClick={handlePlayPause}
          className="relative w-full cursor-pointer"
          style={{ background: 'transparent', border: 'none', padding: 0 }}
          aria-label={isPlaying ? 'Pause narration' : 'Play narration'}
        >
          <img
            src="/section1/bedroom.jpeg"
            alt="80s Bedroom with Record Player"
            className="w-full h-auto rounded-lg shadow-2xl"
          />
        </button>

        {/* Spinning Vinyl Overlay (when playing) */}
        {isPlaying && (
          <div
            className="absolute top-[47%] left-[44%] w-[14%] aspect-square pointer-events-none animate-spin-slow"
            style={{
              background: 'radial-gradient(circle, rgba(255,100,100,0.3) 0%, rgba(100,255,100,0.3) 100%)',
              borderRadius: '50%',
              mixBlendMode: 'overlay',
            }}
          />
        )}

        {/* Clean Status Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black border-4 border-white px-8 py-4 pointer-events-none" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.6)' }}>
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-white'}`} />
            <span className="text-white font-bold text-base tracking-wide">
              {isPlaying ? 'PLAYING NARRATION' : 'CLICK TURNTABLE TO PLAY'}
            </span>
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          onEnded={() => setIsPlaying(false)}
        >
          <source src="/section1/GLOBAL_POP_PART_1.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
