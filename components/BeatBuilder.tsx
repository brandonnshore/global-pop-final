"use client";

import { useState, useEffect, useRef } from "react";

type BlockType = "drum" | "sample" | "bass" | "vocal" | "texture";

interface Block {
  id: string;
  type: BlockType;
  label: string;
}

interface PlacedBlock extends Block {
  position: number;
}

const AVAILABLE_BLOCKS: Block[] = [
  { id: "drum", type: "drum", label: "Drum Loop" },
  { id: "sample", type: "sample", label: "Sample Slice" },
  { id: "bass", type: "bass", label: "Bass Line" },
  { id: "vocal", type: "vocal", label: "Vocal Chop" },
  { id: "texture", type: "texture", label: "Texture Layer" },
];

// Color mapping for block types - RETRO MAC PURPLE PALETTE
const BLOCK_COLORS: Record<BlockType, string> = {
  drum: "#8B7BA8",      // Desaturated purple
  sample: "#9F8BB3",    // Lighter retro purple
  bass: "#6B5B7D",      // Deeper retro purple
  vocal: "#7D6D93",     // Muted purple
  texture: "#AE9DC4",   // Soft retro purple
};

export default function BeatBuilder() {
  const [placedBlocks, setPlacedBlocks] = useState<PlacedBlock[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const schedulerRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize Web Audio API
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playSound = (type: BlockType, time: number) => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    switch (type) {
      case "drum":
        // Kick drum
        const kick = ctx.createOscillator();
        const kickGain = ctx.createGain();
        kick.connect(kickGain);
        kickGain.connect(ctx.destination);
        kick.frequency.setValueAtTime(150, time);
        kick.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
        kickGain.gain.setValueAtTime(1, time);
        kickGain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);
        kick.start(time);
        kick.stop(time + 0.5);

        // Hi-hat
        const hihat = ctx.createOscillator();
        const hihatGain = ctx.createGain();
        const hihatFilter = ctx.createBiquadFilter();
        hihat.type = "square";
        hihat.frequency.setValueAtTime(300, time);
        hihatFilter.type = "highpass";
        hihatFilter.frequency.setValueAtTime(7000, time);
        hihat.connect(hihatFilter);
        hihatFilter.connect(hihatGain);
        hihatGain.connect(ctx.destination);
        hihatGain.gain.setValueAtTime(0.3, time);
        hihatGain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
        hihat.start(time);
        hihat.stop(time + 0.1);
        break;

      case "bass":
        const bass = ctx.createOscillator();
        const bassGain = ctx.createGain();
        bass.type = "sawtooth";
        bass.frequency.setValueAtTime(55, time);
        bass.connect(bassGain);
        bassGain.connect(ctx.destination);
        bassGain.gain.setValueAtTime(0.3, time);
        bassGain.gain.exponentialRampToValueAtTime(0.01, time + 0.4);
        bass.start(time);
        bass.stop(time + 0.4);
        break;

      case "sample":
        // Melodic sample (minor chord stab)
        [220, 261.63, 329.63].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, time);
          osc.connect(gain);
          gain.connect(ctx.destination);
          gain.gain.setValueAtTime(0.1, time);
          gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
          osc.start(time);
          osc.stop(time + 0.3);
        });
        break;

      case "vocal":
        // Vocal chop (formant-like sound)
        const vocal = ctx.createOscillator();
        const vocalGain = ctx.createGain();
        const vocalFilter = ctx.createBiquadFilter();
        vocal.type = "sawtooth";
        vocal.frequency.setValueAtTime(130.81, time);
        vocalFilter.type = "bandpass";
        vocalFilter.frequency.setValueAtTime(800, time);
        vocalFilter.Q.setValueAtTime(10, time);
        vocal.connect(vocalFilter);
        vocalFilter.connect(vocalGain);
        vocalGain.connect(ctx.destination);
        vocalGain.gain.setValueAtTime(0.2, time);
        vocalGain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);
        vocal.start(time);
        vocal.stop(time + 0.15);
        break;

      case "texture":
        // Ambient pad
        [329.63, 392, 493.88].forEach((freq) => {
          const pad = ctx.createOscillator();
          const padGain = ctx.createGain();
          pad.type = "sine";
          pad.frequency.setValueAtTime(freq, time);
          pad.connect(padGain);
          padGain.connect(ctx.destination);
          padGain.gain.setValueAtTime(0.05, time);
          padGain.gain.setValueAtTime(0.05, time + 0.8);
          pad.start(time);
          pad.stop(time + 0.8);
        });
        break;
    }
  };

  const startPlayback = () => {
    if (!audioContextRef.current || placedBlocks.length === 0) return;

    const ctx = audioContextRef.current;
    const startTime = ctx.currentTime;
    const loopLength = 2; // 2 seconds per loop

    const scheduleLoop = () => {
      const currentTime = ctx.currentTime - startTime;
      const nextLoopTime = Math.ceil(currentTime / loopLength) * loopLength + startTime;

      placedBlocks.forEach((block) => {
        const blockTime = nextLoopTime + (block.position * loopLength) / 4;
        playSound(block.type, blockTime);
      });

      schedulerRef.current = window.setTimeout(scheduleLoop, (loopLength * 1000) / 2);
    };

    scheduleLoop();
    setIsPlaying(true);
  };

  const stopPlayback = () => {
    if (schedulerRef.current) {
      clearTimeout(schedulerRef.current);
      schedulerRef.current = null;
    }
    setIsPlaying(false);
  };

  const handleDrop = (position: number) => {
    // This will be called from the timeline slots
  };

  const addBlock = (block: Block, position: number) => {
    // Check if position is already occupied
    if (placedBlocks.find((b) => b.position === position)) {
      return;
    }

    setPlacedBlocks([...placedBlocks, { ...block, position }]);
  };

  const removeBlock = (position: number) => {
    setPlacedBlocks(placedBlocks.filter((b) => b.position !== position));
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  };

  return (
    <div className="min-h-screen bg-[#e8e0d0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Intro Card - VINTAGE MAC WINDOW */}
        <div className="mb-12 bg-[#f5f1e8] border-3 border-black overflow-hidden" style={{ boxShadow: '4px 4px 0 rgba(0,0,0,0.3)' }}>
          {/* Window Title Bar */}
          <div className="bg-[#d4d0c8] border-b-3 border-black p-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 border-2 border-black bg-white"></div>
              <div className="w-3 h-3 border-2 border-black bg-white"></div>
            </div>
            <div className="flex-1 text-center">
              <span className="text-sm font-bold text-black">Beat Builder</span>
            </div>
          </div>
          <div className="p-8 sm:p-10 border-2 border-black border-t-0" style={{ boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.1)' }}>
            <div className="flex items-center mb-4">
              <div className="w-1.5 h-8 bg-[#8B7BA8] border border-black mr-4"></div>
              <h1 className="text-2xl sm:text-3xl font-bold text-black">Beat Builder</h1>
            </div>
            <p className="text-base sm:text-lg leading-relaxed text-black font-normal mb-4">
              Producers do not just borrow sounds. They break them apart, study their shape, and rebuild them into something new. Mike Exarchos describes this as reverse engineering. This game lets you experiment with that process and see how a beat takes shape when you mix and match layers. (Hint: You have to press stop and play again when you add a new sample block)
            </p>
            <p className="text-xs text-gray-600 italic">
              Citation: Exarchos (A.K.A. Stereo Mike), Michail. &ldquo;Hip-hop Pedagogy as Production Practice: Reverse Engineering the Sample Based Aesthetic.&rdquo; Journal of Popular Music Education, vol. 2, no. 1, 1 Aug. 2018, pp. 45–63, https://doi.org/10.1386/jpme.2.1-2.45_1.
            </p>
          </div>
        </div>

        {/* Available Blocks - VINTAGE MAC STYLE */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-black mb-6 px-1">Sample Blocks</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {AVAILABLE_BLOCKS.map((block) => (
              <div
                key={block.id}
                className="
                  border-3 border-black text-white p-6 text-center font-bold text-sm
                  cursor-move select-none
                  transition-all duration-100
                "
                style={{
                  backgroundColor: BLOCK_COLORS[block.type],
                  boxShadow: '3px 3px 0 rgba(0,0,0,0.4), inset -1px -1px 0 rgba(0,0,0,0.2), inset 1px 1px 0 rgba(255,255,255,0.3)',
                }}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("blockType", block.type);
                  e.dataTransfer.setData("blockId", block.id);
                  e.dataTransfer.setData("blockLabel", block.label);
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.boxShadow = 'inset 2px 2px 4px rgba(0,0,0,0.4)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.boxShadow = '3px 3px 0 rgba(0,0,0,0.4), inset -1px -1px 0 rgba(0,0,0,0.2), inset 1px 1px 0 rgba(255,255,255,0.3)';
                }}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="text-base drop-shadow-sm">{block.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline - VINTAGE MAC STYLE */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-black mb-6 px-1">Timeline</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((position) => {
              const placedBlock = placedBlocks.find((b) => b.position === position);
              return (
                <div
                  key={position}
                  className={`
                    relative h-40 border-3 border-black transition-all duration-200
                    ${placedBlock
                      ? 'bg-[#f5f1e8]'
                      : 'bg-white'
                    }
                  `}
                  style={{
                    boxShadow: placedBlock
                      ? 'inset 3px 3px 6px rgba(0,0,0,0.2)'
                      : 'inset 2px 2px 4px rgba(0,0,0,0.15), 2px 2px 0 rgba(0,0,0,0.2)',
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const type = e.dataTransfer.getData("blockType") as BlockType;
                    const id = e.dataTransfer.getData("blockId");
                    const label = e.dataTransfer.getData("blockLabel");
                    addBlock({ id, type, label }, position);
                  }}
                >
                  {placedBlock ? (
                    <div className="p-4 h-full flex flex-col items-center justify-center">
                      <div
                        className="w-full border-2 border-black p-4 mb-3 text-center"
                        style={{
                          backgroundColor: BLOCK_COLORS[placedBlock.type],
                          boxShadow: '2px 2px 0 rgba(0,0,0,0.3), inset -1px -1px 0 rgba(0,0,0,0.2), inset 1px 1px 0 rgba(255,255,255,0.3)',
                        }}
                      >
                        <p className="font-bold text-sm text-white drop-shadow-sm">{placedBlock.label}</p>
                      </div>
                      <button
                        onClick={() => removeBlock(position)}
                        className="
                          px-4 py-2 text-xs font-bold text-black
                          bg-[#d4d0c8] border-2 border-black
                          transition-all duration-100
                        "
                        style={{
                          boxShadow: '2px 2px 0 rgba(0,0,0,0.3), inset -1px -1px 0 rgba(0,0,0,0.1), inset 1px 1px 0 rgba(255,255,255,0.5)',
                        }}
                        onMouseDown={(e) => {
                          e.currentTarget.style.boxShadow = 'inset 2px 2px 3px rgba(0,0,0,0.3)';
                        }}
                        onMouseUp={(e) => {
                          e.currentTarget.style.boxShadow = '2px 2px 0 rgba(0,0,0,0.3), inset -1px -1px 0 rgba(0,0,0,0.1), inset 1px 1px 0 rgba(255,255,255,0.5)';
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-black text-sm font-bold opacity-40">Drop here</p>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2">
                    <span className="
                      inline-flex items-center justify-center
                      w-6 h-6 border-2 border-black bg-white
                      text-xs font-bold text-black
                    "
                      style={{
                        boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.1)',
                      }}
                    >
                      {position + 1}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls - VINTAGE MAC BUTTONS */}
        <div className="mb-12 flex flex-wrap gap-4">
          <button
            onClick={togglePlayback}
            disabled={placedBlocks.length === 0}
            className={`
              px-8 py-4 font-bold text-base border-3 border-black
              transition-all duration-100
              ${placedBlocks.length === 0
                ? 'bg-[#c0c0c0] text-gray-500 cursor-not-allowed opacity-50'
                : ''
              }
            `}
            style={placedBlocks.length > 0 ? {
              backgroundColor: isPlaying ? '#c85a54' : '#8B7BA8',
              color: 'white',
              boxShadow: '3px 3px 0 rgba(0,0,0,0.4), inset -1px -1px 0 rgba(0,0,0,0.2), inset 1px 1px 0 rgba(255,255,255,0.3)',
            } : {
              boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.2)',
            }}
            onMouseDown={(e) => {
              if (placedBlocks.length > 0) {
                e.currentTarget.style.boxShadow = 'inset 2px 2px 4px rgba(0,0,0,0.4)';
              }
            }}
            onMouseUp={(e) => {
              if (placedBlocks.length > 0) {
                e.currentTarget.style.boxShadow = '3px 3px 0 rgba(0,0,0,0.4), inset -1px -1px 0 rgba(0,0,0,0.2), inset 1px 1px 0 rgba(255,255,255,0.3)';
              }
            }}
          >
            {isPlaying ? (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <rect x="5" y="4" width="3" height="12" />
                  <rect x="12" y="4" width="3" height="12" />
                </svg>
                Stop
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6 4.5l8.5 5.2c.3.2.3.6 0 .8L6 15.7c-.5.3-1-.1-1-.6V5.1c0-.5.5-.9 1-.6z" />
                </svg>
                Play
              </span>
            )}
          </button>
          <button
            onClick={() => setPlacedBlocks([])}
            className="
              px-8 py-4 font-bold text-base
              bg-[#d4d0c8] text-black border-3 border-black
              transition-all duration-100
            "
            style={{
              boxShadow: '3px 3px 0 rgba(0,0,0,0.4), inset -1px -1px 0 rgba(0,0,0,0.1), inset 1px 1px 0 rgba(255,255,255,0.5)',
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.boxShadow = 'inset 2px 2px 4px rgba(0,0,0,0.3)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.boxShadow = '3px 3px 0 rgba(0,0,0,0.4), inset -1px -1px 0 rgba(0,0,0,0.1), inset 1px 1px 0 rgba(255,255,255,0.5)';
            }}
          >
            Clear
          </button>
        </div>

        {/* Narration Section */}
        <div className="bg-[#3d3d3d] border-3 border-black p-6 text-white" style={{ boxShadow: '6px 6px 0 rgba(0,0,0,0.4)' }}>
          <div className="inline-block px-3 py-1 bg-[#8B7BA8] border-2 border-black mb-4">
            <span className="text-xs font-bold text-black tracking-wider">
              NARRATION
            </span>
          </div>
          <div className="border-2 border-black p-2 bg-[#2d2d2d]" style={{ boxShadow: 'inset 1px 1px 0 rgba(0,0,0,0.3)' }}>
            <audio
              controls
              className="w-full h-10"
              aria-label="Play section 2 narration"
            >
              <source src="/section2_narration.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>
    </div>
  );
}
