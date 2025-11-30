'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Record {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  audioSrc: string;
  description: string;
  color: string;
}

const records: Record[] = [
  {
    id: 'narration',
    label: 'Narration',
    title: 'Section 1 Narration',
    subtitle: 'Sampling as Storytelling',
    audioSrc: '/section1/GLOBAL_POP_PART_1.mp3',
    description: 'This is the full narration for Section 1, walking through Burns, Woods, and Lafrance on sampling as storytelling.',
    color: '#E06C79',
  },
  {
    id: 'diamonds',
    label: 'Track',
    title: 'Diamonds from Sierra Leone',
    subtitle: 'Kanye West',
    audioSrc: '/section1/diamonds_full.mp3',
    description: 'This track is used to explore how samples create tension between glamour and critique.',
    color: '#8A5F9E',
  },
  {
    id: 'welcome',
    label: 'Track',
    title: 'Welcome to Heartbreak',
    subtitle: 'Kanye West',
    audioSrc: '/section1/welcome_to_heartbreak_full.mp3',
    description: 'This track shows how production and sampling build an intimate emotional space.',
    color: '#519FB0',
  },
  {
    id: 'blackskinhead',
    label: 'Track',
    title: 'Black Skinhead',
    subtitle: 'Kanye West',
    audioSrc: '/section1/black_skinhead_full.mp3',
    description: 'This track highlights how technology and sound design function as Kanye\'s primary "instrument."',
    color: '#8FBB74',
  },
];

export default function SectionOneRecordRoom() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentRecord, setCurrentRecord] = useState<Record | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handlePrevRecord = () => {
    setSelectedIndex((prev) => (prev === 0 ? records.length - 1 : prev - 1));
  };

  const handleNextRecord = () => {
    setSelectedIndex((prev) => (prev === records.length - 1 ? 0 : prev + 1));
  };

  const handleLoadRecord = () => {
    const record = records[selectedIndex];
    setCurrentRecord(record);
    if (audioRef.current) {
      audioRef.current.src = record.audioSrc;
    }
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio || !currentRecord) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #4a6fa5 0%, #2d4a7c 50%, #1a2845 100%)' }}>
      {/* Ambient Lighting - Warm overhead glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-30 pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(255,165,80,0.6) 0%, rgba(255,140,60,0.3) 30%, transparent 70%)' }}></div>

      {/* Secondary warm glow from lava lamp area */}
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(255,100,150,0.5) 0%, transparent 70%)' }}></div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-[#E06C79] border-2 border-black mb-6 transform -rotate-1"
               style={{ boxShadow: '4px 4px 0 rgba(0,0,0,0.5)' }}>
            <span className="text-xs font-bold text-black tracking-widest">
              SECTION 1 · SAMPLING AS STORYTELLING
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-[#f5f1e8] mb-4 tracking-tight"
              style={{ textShadow: '4px 4px 0 rgba(0,0,0,0.3), 0 0 40px rgba(255,165,80,0.3)' }}>
            The Record Room
          </h1>
          <p className="text-xl text-[#e8dcc8] max-w-2xl mx-auto mb-8 font-medium">
            Step into an 80s bedroom and explore Kanye's sample-based storytelling through vinyl.
          </p>
        </div>

        {/* Main Bedroom Scene Container */}
        <div className="relative bg-gradient-to-b from-[#3d5a8e] to-[#2d4570] rounded-lg overflow-hidden border-4 border-[#1a2845] mb-12"
             style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>

          {/* Wall Posters - Background Layer */}
          <div className="absolute top-8 left-8 w-32 h-44 bg-black border-3 border-white transform -rotate-3"
               style={{ boxShadow: '6px 6px 12px rgba(0,0,0,0.4)' }}>
            <div className="h-full p-3 flex flex-col items-center justify-center bg-gradient-to-br from-[#d4a574] to-[#8b6f47]">
              <div className="text-xs font-black text-black text-center leading-tight mb-2">NIRVANA</div>
              <div className="text-[8px] text-black opacity-60 text-center">IN UTERO</div>
            </div>
          </div>

          <div className="absolute top-12 right-12 w-28 h-40 bg-black border-3 border-white transform rotate-2"
               style={{ boxShadow: '6px 6px 12px rgba(0,0,0,0.4)' }}>
            <div className="h-full p-3 flex flex-col items-center justify-center bg-gradient-to-br from-[#c94b4b] to-[#8b2e2e]">
              <div className="text-xs font-black text-white text-center leading-tight mb-2">RHCP</div>
              <div className="text-[8px] text-white opacity-60 text-center">BLOOD SUGAR</div>
            </div>
          </div>

          <div className="absolute top-32 left-20 w-36 h-48 bg-black border-3 border-white transform rotate-1"
               style={{ boxShadow: '6px 6px 12px rgba(0,0,0,0.4)' }}>
            <div className="h-full p-3 flex flex-col items-center justify-center bg-gradient-to-br from-[#5a7a9e] to-[#3d5270]">
              <div className="text-xs font-black text-white text-center leading-tight mb-2">PEARL JAM</div>
              <div className="text-[8px] text-white opacity-60 text-center">TEN</div>
            </div>
          </div>

          {/* Cork Board with Photos */}
          <div className="absolute top-10 right-1/4 w-48 h-40 bg-[#c19a6b] border-4 border-[#8b6f47] transform -rotate-2"
               style={{ boxShadow: '8px 8px 16px rgba(0,0,0,0.5)' }}>
            {/* Cork texture */}
            <div className="absolute inset-0 opacity-30"
                 style={{ backgroundImage: 'radial-gradient(circle, #8b6f47 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>

            {/* Pinned photos */}
            <div className="absolute top-4 left-4 w-16 h-20 bg-white border-2 border-gray-300 transform rotate-6"
                 style={{ boxShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              <div className="h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-red-600 border border-gray-700"></div>
            </div>

            <div className="absolute top-6 right-6 w-20 h-16 bg-white border-2 border-gray-300 transform -rotate-12"
                 style={{ boxShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              <div className="h-full bg-gradient-to-br from-blue-200 to-blue-300"></div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-red-600 border border-gray-700"></div>
            </div>

            <div className="absolute bottom-6 left-8 w-12 h-12 bg-white border-2 border-gray-300 transform rotate-3"
                 style={{ boxShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              <div className="h-full bg-gradient-to-br from-yellow-200 to-orange-300"></div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-red-600 border border-gray-700"></div>
            </div>
          </div>

          {/* Wooden Shelf on Wall */}
          <div className="absolute top-44 right-8 w-56 h-6 bg-gradient-to-b from-[#6b4423] to-[#4a2f1a] border-2 border-[#3d2415]"
               style={{ boxShadow: '0 8px 16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(139,111,71,0.3)' }}>
            {/* Wood grain */}
            <div className="absolute inset-0 opacity-20"
                 style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.2) 4px, rgba(0,0,0,0.2) 6px)' }}></div>
          </div>

          {/* Items on Shelf */}
          <div className="absolute top-32 right-12 w-8 h-12 bg-gradient-to-br from-[#d4af37] to-[#b8922c] border-2 border-[#8b7320]"
               style={{ boxShadow: '2px 4px 8px rgba(0,0,0,0.4)' }}>
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#b8922c]"></div>
          </div>

          <div className="absolute top-36 right-24 w-6 h-8 bg-[#8b4513] border-l-2 border-r-2 border-[#654321]"
               style={{ boxShadow: '2px 4px 6px rgba(0,0,0,0.3)' }}>
            <div className="h-full flex flex-col">
              <div className="flex-1 bg-gradient-to-r from-[#d2691e] to-[#8b4513]"></div>
            </div>
          </div>

          <div className="absolute top-36 right-32 w-4 h-8 bg-[#2c5f2d] border-2 border-[#1e4620]"
               style={{ boxShadow: '2px 4px 6px rgba(0,0,0,0.3)' }}></div>

          {/* Main Content Area - Desk and Floor Level */}
          <div className="relative pt-64 pb-12 px-8">

            {/* Wooden Desk Surface */}
            <div className="relative bg-gradient-to-b from-[#8b6f47] to-[#6b4423] border-4 border-[#4a2f1a] rounded-lg p-8 mb-8"
                 style={{ boxShadow: '0 12px 32px rgba(0,0,0,0.7), inset 0 2px 0 rgba(139,111,71,0.4)' }}>

              {/* Wood grain texture */}
              <div className="absolute inset-0 opacity-15 rounded-lg pointer-events-none"
                   style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(0,0,0,0.15) 80px, rgba(0,0,0,0.15) 85px)' }}></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">

                {/* Left Side - Vinyl Crate & Lava Lamp */}
                <div className="lg:col-span-5 space-y-8">

                  {/* Lava Lamp */}
                  <div className="flex justify-center mb-8">
                    <div className="relative w-24 h-64">
                      {/* Lamp base */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-full border-2 border-black"
                           style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.6)' }}></div>

                      {/* Lamp top cap */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-t-full border-2 border-black"
                           style={{ boxShadow: '0 -2px 8px rgba(0,0,0,0.4)' }}></div>

                      {/* Glass cylinder with lava */}
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-20 h-52 rounded-full overflow-hidden border-3 border-[#2a2a2a]"
                           style={{
                             background: 'linear-gradient(180deg, rgba(255,100,150,0.3) 0%, rgba(200,50,100,0.4) 50%, rgba(150,30,70,0.5) 100%)',
                             boxShadow: 'inset 0 0 40px rgba(255,100,150,0.4), 0 0 30px rgba(255,100,150,0.3)'
                           }}>

                        {/* Lava blobs */}
                        <div className="lava-blob absolute w-12 h-16 rounded-full opacity-80"
                             style={{
                               background: 'radial-gradient(circle, rgba(255,120,160,0.9) 0%, rgba(220,80,120,0.7) 100%)',
                               left: '20%',
                               animation: 'lavaFloat1 6s ease-in-out infinite',
                               filter: 'blur(1px)'
                             }}></div>

                        <div className="lava-blob absolute w-10 h-14 rounded-full opacity-80"
                             style={{
                               background: 'radial-gradient(circle, rgba(255,140,170,0.9) 0%, rgba(230,90,130,0.7) 100%)',
                               right: '15%',
                               animation: 'lavaFloat2 8s ease-in-out infinite',
                               filter: 'blur(1px)'
                             }}></div>

                        <div className="lava-blob absolute w-14 h-18 rounded-full opacity-80"
                             style={{
                               background: 'radial-gradient(circle, rgba(255,110,150,0.9) 0%, rgba(210,70,110,0.7) 100%)',
                               left: '30%',
                               animation: 'lavaFloat3 7s ease-in-out infinite 2s',
                               filter: 'blur(1px)'
                             }}></div>

                        {/* Glass reflection */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white to-transparent opacity-20 pointer-events-none"
                             style={{ clipPath: 'polygon(0 0, 30% 0, 20% 100%, 0 100%)' }}></div>
                      </div>

                      {/* Warm glow effect */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-40 pointer-events-none"
                           style={{ background: 'radial-gradient(circle, rgba(255,100,150,0.6) 0%, transparent 70%)', filter: 'blur(20px)' }}></div>
                    </div>
                  </div>

                  {/* Vinyl Crate */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-[#5a4a3a] to-[#3a2a1a] border-4 border-[#2a1a0a] p-6 relative"
                         style={{ boxShadow: '8px 8px 20px rgba(0,0,0,0.7), inset 0 2px 0 rgba(139,111,71,0.3)' }}>

                      <div className="text-center mb-4">
                        <div className="inline-block bg-[#f5f1e8] border-2 border-black px-3 py-1 transform -rotate-1"
                             style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.4)' }}>
                          <span className="text-xs font-bold tracking-wider">VINYL CRATE</span>
                        </div>
                      </div>

                      {/* Vinyl Records in Crate */}
                      <div className="relative h-64 mb-6 flex items-end justify-center gap-2 px-4">
                        {records.map((record, idx) => {
                          const isSelected = idx === selectedIndex;
                          const height = isSelected ? '100%' : '85%';
                          const zIndex = isSelected ? 20 : 10;

                          return (
                            <div
                              key={record.id}
                              onClick={() => setSelectedIndex(idx)}
                              className="relative cursor-pointer transition-all duration-300 hover:scale-105"
                              style={{
                                height,
                                width: '60px',
                                zIndex,
                                transform: isSelected ? 'translateY(-8px)' : 'translateY(0)',
                              }}
                            >
                              {/* Record spine */}
                              <div className="h-full w-full border-2 border-black relative overflow-hidden"
                                   style={{
                                     background: `linear-gradient(180deg, ${record.color} 0%, ${record.color}dd 50%, ${record.color}aa 100%)`,
                                     boxShadow: isSelected
                                       ? `0 8px 16px rgba(0,0,0,0.6), 0 0 0 3px ${record.color}88, inset 2px 0 0 rgba(255,255,255,0.3)`
                                       : '0 4px 8px rgba(0,0,0,0.4), inset 2px 0 0 rgba(255,255,255,0.2)',
                                   }}>

                                {/* Record label text on spine */}
                                <div className="absolute inset-0 flex items-center justify-center p-1">
                                  <div className="transform -rotate-90 origin-center whitespace-nowrap">
                                    <div className="text-[8px] font-bold text-black opacity-80 tracking-tight">{record.title}</div>
                                  </div>
                                </div>

                                {/* Highlight effect */}
                                <div className="absolute top-0 left-0 w-1 h-full bg-white opacity-30"></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Crate Controls */}
                      <div className="flex items-center justify-between gap-2">
                        <button
                          onClick={handlePrevRecord}
                          className="flex-1 px-3 py-2 bg-[#3d2415] hover:bg-[#4a2f1a] border-2 border-black font-bold text-[#f5f1e8] text-sm transition-all"
                          style={{ boxShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}
                          aria-label="Previous record"
                        >
                          ← PREV
                        </button>
                        <button
                          onClick={handleLoadRecord}
                          className="flex-1 px-3 py-2 bg-[#E06C79] hover:bg-[#d05b68] border-2 border-black font-bold text-black text-sm transition-all"
                          style={{ boxShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}
                        >
                          LOAD →
                        </button>
                        <button
                          onClick={handleNextRecord}
                          className="flex-1 px-3 py-2 bg-[#3d2415] hover:bg-[#4a2f1a] border-2 border-black font-bold text-[#f5f1e8] text-sm transition-all"
                          style={{ boxShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}
                          aria-label="Next record"
                        >
                          NEXT →
                        </button>
                      </div>

                      <div className="mt-3 text-center text-sm text-[#d4c4b0] font-mono font-bold">
                        {selectedIndex + 1} / {records.length}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Turntable */}
                <div className="lg:col-span-7">
                  <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border-4 border-black p-8 relative"
                       style={{ boxShadow: '12px 12px 28px rgba(0,0,0,0.8), inset 0 2px 0 rgba(255,255,255,0.1)' }}>

                    {/* Turntable Plinth */}
                    <div className="relative">
                      <div className="relative w-full max-w-sm mx-auto aspect-square">

                        {/* Platter Shadow */}
                        <div className="absolute inset-0 rounded-full bg-black blur-xl opacity-40 transform translate-y-6"></div>

                        {/* Platter */}
                        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#3a3a3a] to-[#1a1a1a] border-4 border-[#555] flex items-center justify-center"
                             style={{ boxShadow: 'inset 0 8px 16px rgba(0,0,0,0.7), 0 4px 24px rgba(0,0,0,0.5)' }}>

                          {/* Slipmat */}
                          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#2d2d2d] to-[#1d1d1d] border-2 border-[#444]"
                               style={{ boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.8)' }}>
                            {/* Slipmat pattern */}
                            {[...Array(32)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-full h-0.5 bg-[#333] top-1/2 left-1/2 origin-left"
                                style={{
                                  transform: `translate(-50%, -50%) rotate(${i * 11.25}deg)`,
                                  width: '50%',
                                }}
                              ></div>
                            ))}
                          </div>

                          {/* Record on Platter */}
                          {currentRecord && (
                            <div
                              className={`absolute inset-8 rounded-full transition-all duration-300 ${
                                isPlaying ? 'animate-spin-vinyl' : ''
                              }`}
                              style={{
                                background: `linear-gradient(135deg, ${currentRecord.color} 0%, ${currentRecord.color}aa 100%)`,
                                boxShadow: '0 0 0 6px #000, 0 8px 32px rgba(0,0,0,0.6)',
                              }}
                            >
                              {/* Vinyl grooves */}
                              {[...Array(12)].map((_, i) => (
                                <div
                                  key={i}
                                  className="absolute rounded-full border border-black opacity-15"
                                  style={{
                                    inset: `${12 + i * 10}px`,
                                  }}
                                ></div>
                              ))}

                              {/* Center label */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-24 h-24 rounded-full bg-black border-4 border-[#f5f1e8] flex items-center justify-center"
                                     style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.6)' }}>
                                  <div className="text-center px-2">
                                    <div className="text-[8px] font-bold text-[#E06C79] mb-1 tracking-widest">
                                      {currentRecord.label.toUpperCase()}
                                    </div>
                                    <div className="text-[10px] text-white font-bold leading-tight">
                                      {currentRecord.title}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Spindle */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-[#888] to-[#444] border border-black z-30"
                               style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.6)' }}></div>
                        </div>

                        {/* Tonearm */}
                        <div
                          className="absolute right-0 top-1/2 transform origin-right transition-all duration-1000 ease-out"
                          style={{
                            transform: `translate(20%, -50%) ${isPlaying ? 'rotate(-25deg)' : 'rotate(0deg)'}`,
                          }}
                        >
                          {/* Tonearm base */}
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-[#666] to-[#333] border-2 border-black"
                               style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.6)' }}></div>

                          {/* Tonearm arm */}
                          <div className="relative w-28 h-2 bg-gradient-to-r from-[#888] to-[#555] border-t border-b border-black transform -translate-y-1"
                               style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.5)' }}>
                            {/* Headshell */}
                            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gradient-to-br from-[#999] to-[#555] border-2 border-black"
                                 style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.6)', clipPath: 'polygon(0 50%, 100% 0, 100% 100%)' }}>
                              {/* Stylus */}
                              <div className="absolute -left-1 top-1/2 w-2 h-0.5 bg-[#333] transform -translate-y-1/2"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Controls Panel */}
                      <div className="mt-8 flex flex-col items-center gap-4">
                        {/* Status LED */}
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 border-black transition-all duration-300 ${
                            isPlaying ? 'bg-red-500 shadow-[0_0_16px_rgba(239,68,68,0.8)]' : 'bg-gray-700'
                          }`}></div>
                          <span className="text-sm font-bold text-[#d4c4b0] tracking-wider">
                            {isPlaying ? 'PLAYING' : 'STOPPED'}
                          </span>
                        </div>

                        {/* Play/Pause Button */}
                        <button
                          onClick={handlePlayPause}
                          disabled={!currentRecord}
                          className="px-10 py-3 bg-[#E06C79] hover:bg-[#d05b68] disabled:bg-gray-600 disabled:opacity-50 border-3 border-black font-black text-lg text-black transition-all disabled:cursor-not-allowed"
                          style={{ boxShadow: '5px 5px 0 rgba(0,0,0,0.6)' }}
                          aria-label={isPlaying ? 'Pause' : 'Play record'}
                        >
                          {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Purple Couch/Bean Bag in Corner */}
            <div className="absolute bottom-8 left-8 w-48 h-32">
              <div className="relative w-full h-full">
                {/* Bean bag shadow */}
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-black opacity-40 blur-md rounded-full"></div>

                {/* Bean bag body */}
                <div className="absolute bottom-2 left-0 w-full h-28 bg-gradient-to-br from-[#9b6b9e] to-[#6b4b6e] rounded-full border-4 border-[#5a3b5e]"
                     style={{ boxShadow: '0 8px 20px rgba(0,0,0,0.6), inset -20px -20px 40px rgba(0,0,0,0.3)' }}>
                  {/* Highlight */}
                  <div className="absolute top-6 left-8 w-24 h-16 rounded-full bg-white opacity-20 blur-xl"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Overhead Lamp */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              {/* Lamp cord */}
              <div className="w-0.5 h-12 bg-black mx-auto opacity-60"></div>

              {/* Lamp shade */}
              <div className="w-32 h-20 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#f5e6d3] to-[#d4c4b0] border-2 border-[#8b7355]"
                     style={{
                       clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                       boxShadow: '0 8px 24px rgba(255,165,80,0.4)'
                     }}>
                  {/* Warm light glow from bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#ffb366] to-transparent opacity-70"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Track Info & Controls */}
        {currentRecord && (
          <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border-4 border-black p-8 mb-8"
               style={{ boxShadow: '8px 8px 0 rgba(0,0,0,0.6)' }}>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="inline-block px-3 py-1 bg-[#E06C79] border-2 border-black mb-4"
                     style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.4)' }}>
                  <span className="text-xs font-bold tracking-wider">NOW PLAYING</span>
                </div>
                <h3 className="text-3xl font-black text-[#f5f1e8] mb-2">{currentRecord.title}</h3>
                <p className="text-lg text-[#E06C79] font-bold mb-4">{currentRecord.subtitle}</p>
                <p className="text-base text-[#d4c4b0] leading-relaxed">{currentRecord.description}</p>
              </div>

              <div className="flex flex-col justify-center">
                {/* Progress Bar */}
                <div className="mb-4">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-3 bg-[#3a3a3a] rounded-full appearance-none cursor-pointer border-2 border-black"
                    style={{
                      background: `linear-gradient(to right, #E06C79 0%, #E06C79 ${(currentTime / duration) * 100}%, #3a3a3a ${(currentTime / duration) * 100}%, #3a3a3a 100%)`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-sm font-mono text-[#d4c4b0] font-bold">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Citation */}
        <div className="bg-gradient-to-br from-[#6b4423] to-[#4a2f1a] border-4 border-black p-6 transform -rotate-1"
             style={{ boxShadow: '6px 6px 0 rgba(0,0,0,0.6)' }}>
          <div className="transform rotate-1">
            <div className="inline-block px-3 py-1 bg-[#f5f1e8] border-2 border-black mb-3"
                 style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.4)' }}>
              <span className="text-xs font-bold tracking-wider">ACADEMIC SOURCE</span>
            </div>
            <h4 className="text-lg font-bold text-[#f5f1e8] mb-2">Based on Burns, Woods, and Lafrance</h4>
            <p className="text-sm text-[#d4c4b0] leading-relaxed">
              This section is informed by Burns, Woods, and Lafrance's analysis of Kanye West as a sample based storyteller, where vocal delivery, production, and borrowed material work together as a single narrative voice.
            </p>
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio ref={audioRef} />
      </div>

      <style jsx>{`
        @keyframes spin-vinyl {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-vinyl {
          animation: spin-vinyl 2s linear infinite;
        }

        @keyframes lavaFloat1 {
          0%, 100% {
            transform: translateY(180px) scale(1);
          }
          50% {
            transform: translateY(20px) scale(1.1);
          }
        }

        @keyframes lavaFloat2 {
          0%, 100% {
            transform: translateY(160px) scale(1);
          }
          50% {
            transform: translateY(40px) scale(1.15);
          }
        }

        @keyframes lavaFloat3 {
          0%, 100% {
            transform: translateY(170px) scale(1);
          }
          50% {
            transform: translateY(30px) scale(1.05);
          }
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: #E06C79;
          cursor: pointer;
          border-radius: 50%;
          border: 3px solid #000;
          box-shadow: 0 2px 4px rgba(0,0,0,0.6);
        }

        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #E06C79;
          cursor: pointer;
          border-radius: 50%;
          border: 3px solid #000;
          box-shadow: 0 2px 4px rgba(0,0,0,0.6);
        }
      `}</style>
    </div>
  );
}