'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Life {
  id: number;
  label: string;
  title: string;
  description: string;
  position: { x: number; y: number };
}

const lives: Life[] = [
  {
    id: 1,
    label: 'Origin',
    title: 'Origin: Local Lullaby',
    description: 'In 1970, ethnomusicologist Hugo Zemp recorded "Rorogwela," a traditional lullaby sung by Afunakwa, a woman from the Solomon Islands. This intimate recording captured a mother\'s song, deeply rooted in local culture and community.',
    position: { x: 91, y: 57 }, // Solomon Islands (Pacific, east of Papua New Guinea)
  },
  {
    id: 2,
    label: 'Remix Studio',
    title: 'Remix: Sweet Lullaby',
    description: 'In 1992, French musical duo Deep Forest sampled Afunakwa\'s voice without permission, layering it over electronic beats to create "Sweet Lullaby." The track became a global hit, and Afunakwa the original singer received no credit, compensation, or say in how her voice was used.',
    position: { x: 49, y: 30 }, // Paris, France
  },
  {
    id: 3,
    label: 'Global Market',
    title: 'Aftermath: Who Benefits',
    description: 'The song entered global circulation. Once a Lullaby recorded to merely preserve a sound, now stolen from its creator and endlessly circulated',
    position: { x: 22, y: 32 }, // Center of USA - moved up 1 grid square
  },
];

export default function SectionFourMapJourney() {
  const [currentLife, setCurrentLife] = useState(1);
  const [narrationTime, setNarrationTime] = useState(0);
  const [narrationDuration, setNarrationDuration] = useState(0);
  const [isNarrationPlaying, setIsNarrationPlaying] = useState(false);

  const songRef = useRef<HTMLAudioElement>(null);
  const narrationRef = useRef<HTMLAudioElement>(null);

  const currentLifeData = lives.find(life => life.id === currentLife) || lives[0];

  // Stop all audio when switching between lives
  useEffect(() => {
    // Stop and reset song audio
    if (songRef.current) {
      songRef.current.pause();
      songRef.current.currentTime = 0;
      songRef.current.load(); // Force reload to prevent stickiness
    }

    // Stop and reset narration audio
    if (narrationRef.current) {
      narrationRef.current.pause();
      narrationRef.current.currentTime = 0;
      narrationRef.current.load(); // Force reload to prevent stickiness
    }

    setIsNarrationPlaying(false);
  }, [currentLife]); // Run whenever currentLife changes

  const handleNext = () => {
    if (currentLife < 3) {
      setCurrentLife(currentLife + 1);
    }
  };

  const handlePrevious = () => {
    if (currentLife > 1) {
      setCurrentLife(currentLife - 1);
    }
  };

  const handleNarrationPlayPause = () => {
    if (!narrationRef.current) return;

    if (isNarrationPlaying) {
      narrationRef.current.pause();
    } else {
      narrationRef.current.play();
    }
    setIsNarrationPlaying(!isNarrationPlaying);
  };

  const handleNarrationTimeUpdate = () => {
    if (narrationRef.current) {
      setNarrationTime(narrationRef.current.currentTime);
    }
  };

  const handleNarrationLoadedMetadata = () => {
    if (narrationRef.current) {
      setNarrationDuration(narrationRef.current.duration);
    }
  };

  const handleNarrationSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (narrationRef.current) {
      const newTime = parseFloat(e.target.value);
      narrationRef.current.currentTime = newTime;
      setNarrationTime(newTime);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-[#f5f1e8] p-8 overflow-y-auto max-h-[80vh]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 bg-[#5b9aa9] border-2 border-black mb-4" style={{ boxShadow: 'inset -1px -1px 0 rgba(0,0,0,0.3), inset 1px 1px 0 rgba(255,255,255,0.5)' }}>
            <span className="text-xs font-bold text-black tracking-wider">
              SECTION 4 · FELD
            </span>
          </div>
          <h1 className="text-4xl font-bold text-black mb-3 tracking-tight" style={{ textShadow: '2px 2px 0 rgba(255,255,255,0.5)' }}>
            Three Lives of a Song
          </h1>
          <p className="text-base text-black max-w-2xl mx-auto leading-relaxed font-medium">
            Following a lullaby as it travels from a local village to the global music market
          </p>
        </div>

        {/* Intro Paragraph */}
        <div className="bg-white border-3 border-black p-6 mb-8" style={{ boxShadow: 'inset 2px 2px 0 rgba(0,0,0,0.1), 4px 4px 0 rgba(0,0,0,0.2)' }}>
          <p className="text-black leading-relaxed font-medium">
            In A Sweet Lullaby For World Music, ethnomusicologist Steven Feld traces the journey of "Rorogwela," a traditional lullaby from the Solomon Islands. This journey illustrates what Feld calls "schizmogenesis," the splitting of a song from its cultural source. Through three distinct lives, we witness how an intimate lullaby becomes a global commodity. Thus raising urgent questions about the ideas of cultural appropriation and who profits from indigenous creativity.
          </p>
          <p className="text-xs text-gray-600 mt-4 italic">
            Feld, Steven. "A Sweet Lullaby for World Music." Globalization, 31 Dec. 2020, pp. 189–216, https://doi.org/10.1515/9780822383215-011.
          </p>
        </div>

        {/* Map Panel */}
        <div className="bg-[#e8e0d0] border-3 border-black p-6 mb-8" style={{ boxShadow: '6px 6px 0 rgba(0,0,0,0.3)' }}>
          <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-black">
            <h3 className="text-2xl font-bold text-black">Journey Map</h3>
            <div className="text-sm text-black font-bold bg-white border-2 border-black px-3 py-1" style={{ boxShadow: 'inset -1px -1px 0 rgba(0,0,0,0.3), inset 1px 1px 0 rgba(255,255,255,0.5)' }}>
              Life {currentLife} of 3
            </div>
          </div>

          <div className="relative w-full rounded-xl overflow-hidden mb-6 shadow-inner border-4 border-black" style={{ height: '400px', backgroundColor: '#87CEEB' }}>

            {/* World Map Image */}
            <img
              src="/section4/world-map.png"
              alt="World Map"
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />

            {/* Location Markers - Show all locations */}
            {lives.map((life) => (
              <div
                key={life.id}
                className="absolute transition-all duration-500 ease-in-out"
                style={{
                  left: `${life.position.x}%`,
                  top: `${life.position.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Marker Pin */}
                <div className={`transition-all duration-500 ${
                  currentLife === life.id ? 'opacity-100 scale-110' : 'opacity-60 scale-90'
                }`}>
                  <div className={`w-6 h-6 border-2 border-black ${
                    currentLife === life.id
                      ? 'bg-[#5b9aa9]'
                      : 'bg-[#c0c0c0]'
                  } transition-all duration-500`} style={{ boxShadow: currentLife === life.id ? 'inset -2px -2px 0 rgba(0,0,0,0.4), inset 2px 2px 0 rgba(255,255,255,0.6), 0 4px 8px rgba(0,0,0,0.3)' : '2px 2px 0 rgba(0,0,0,0.2)' }}>
                  </div>
                  <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs font-bold whitespace-nowrap px-2 py-1 border-2 border-black ${
                    currentLife === life.id
                      ? 'bg-[#5b9aa9] text-black'
                      : 'bg-white text-black'
                  } transition-all duration-500`} style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}>
                    {life.label}
                  </div>
                </div>
              </div>
            ))}

            {/* Animated Plane */}
            <div
              className="absolute transition-all duration-1000 ease-in-out text-4xl drop-shadow-2xl"
              style={{
                left: `${currentLifeData.position.x}%`,
                top: `${currentLifeData.position.y}%`,
                transform: 'translate(-50%, -50%)',
                filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))',
              }}
              role="img"
              aria-label="Plane showing current journey stage"
            >
              ✈️
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={handlePrevious}
              disabled={currentLife === 1}
              className="px-6 py-2 text-sm font-bold bg-[#c0c0c0] text-black border-3 border-black disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#d0d0d0] active:shadow-inner transition-all duration-200"
              style={{ boxShadow: 'inset -2px -2px 0 rgba(0,0,0,0.3), inset 2px 2px 0 rgba(255,255,255,0.7), 3px 3px 0 rgba(0,0,0,0.2)' }}
              aria-label="Go to previous life"
            >
              <span className="mr-2">←</span> Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentLife === 3}
              className="px-6 py-2 text-sm font-bold bg-[#5b9aa9] text-black border-3 border-black disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#6baaB9] active:shadow-inner transition-all duration-200"
              style={{ boxShadow: 'inset -2px -2px 0 rgba(0,0,0,0.3), inset 2px 2px 0 rgba(255,255,255,0.7), 3px 3px 0 rgba(0,0,0,0.2)' }}
              aria-label="Go to next life"
            >
              Next <span className="ml-2">→</span>
            </button>
          </div>

          {/* Life Summary */}
          <div className="bg-white border-3 border-black p-5" style={{ boxShadow: 'inset 2px 2px 0 rgba(0,0,0,0.1)', borderLeft: '6px solid #5b9aa9' }}>
            <h3 className="text-xl font-bold text-black mb-3">
              {currentLifeData.title}
            </h3>
            <p className="text-black leading-relaxed font-medium">
              {currentLifeData.description}
            </p>
          </div>
        </div>

        {/* Audio Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-6 text-center bg-[#5b9aa9] border-3 border-black py-3" style={{ boxShadow: '4px 4px 0 rgba(0,0,0,0.3)' }}>
            Listen to Life {currentLife}
          </h2>

          {/* Life 1 & 2: Two columns (Song + Narration) */}
          {(currentLife === 1 || currentLife === 2) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Song Recording Card */}
              <div className="bg-white border-3 border-black p-5" style={{ boxShadow: '6px 6px 0 rgba(0,0,0,0.2)' }}>
                <div className="inline-block px-3 py-1 bg-[#5b9aa9] border-2 border-black mb-3">
                  <span className="text-xs font-bold text-black tracking-wider">
                    SONG RECORDING
                  </span>
                </div>
                <div className="border-2 border-black p-2 bg-[#e8e0d0] mt-3" style={{ boxShadow: 'inset 1px 1px 0 rgba(0,0,0,0.2)' }}>
                  <audio
                    key={`song-${currentLife}`}
                    ref={songRef}
                    controls
                    className="w-full h-10"
                    aria-label={`Play Life ${currentLife} song`}
                  >
                    <source src={`/section4/life${currentLife}_song.mp3`} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>

              {/* Narration Card */}
              <div className="bg-[#f5f1e8] border-3 border-black p-5" style={{ boxShadow: '6px 6px 0 rgba(0,0,0,0.4)' }}>
                <div className="inline-block px-3 py-1 bg-[#5b9aa9] border-2 border-black mb-3">
                  <span className="text-xs font-bold text-black tracking-wider">
                    NARRATION
                  </span>
                </div>
                <div className="border-2 border-black p-3 bg-white mt-3" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.2)' }}>
                  <audio
                    key={`narration-${currentLife}`}
                    ref={narrationRef}
                    controls
                    className="w-full h-10"
                    aria-label={`Play Life ${currentLife} narration`}
                  >
                    <source src={`/section4/life${currentLife}_narration.${currentLife === 1 ? 'm4a' : 'mp3'}`} type={currentLife === 1 ? 'audio/mp4' : 'audio/mpeg'} />
                    {currentLife === 1 && <source src="/section4/life1_narration.m4a" type="audio/x-m4a" />}
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            </div>
          )}

          {/* Life 3: Full Width (Narration Only) */}
          {currentLife === 3 && (
            <div className="bg-[#f5f1e8] border-3 border-black p-6" style={{ boxShadow: '6px 6px 0 rgba(0,0,0,0.4)' }}>
              <div className="inline-block px-3 py-1 bg-[#5b9aa9] border-2 border-black mb-4">
                <span className="text-xs font-bold text-black tracking-wider">
                  NARRATION
                </span>
              </div>
              <div className="border-2 border-black p-4 bg-white mt-3" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.2)' }}>
                <audio
                  key="narration-3"
                  ref={narrationRef}
                  controls
                  className="w-full h-12"
                  aria-label="Play Life 3 narration"
                >
                  <source src="/section4/life3_narration.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}