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

export default function BeatBuilder() {
  const [placedBlocks, setPlacedBlocks] = useState<PlacedBlock[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
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
    <div className="p-8 max-w-5xl bg-black text-white min-h-screen">
      {/* Intro */}
      <div className="mb-8 p-6 bg-white text-black">
        <p className="text-sm leading-relaxed">
          Producers do not just borrow sounds. They break them apart, study their shape, and rebuild them into something new. Mike Exarchos describes this as reverse engineering. This game lets you experiment with that process and see how a beat takes shape when you mix and match layers.
        </p>
      </div>

      {/* Available Blocks */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">SAMPLE BLOCKS</h2>
        <div className="grid grid-cols-5 gap-4">
          {AVAILABLE_BLOCKS.map((block) => (
            <div
              key={block.id}
              className="bg-white text-black p-4 text-center font-bold text-sm border-4 border-white hover:bg-gray-200 cursor-move"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("blockType", block.type);
                e.dataTransfer.setData("blockId", block.id);
                e.dataTransfer.setData("blockLabel", block.label);
              }}
            >
              {block.label}
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">TIMELINE</h2>
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((position) => {
            const placedBlock = placedBlocks.find((b) => b.position === position);
            return (
              <div
                key={position}
                className="flex-1 h-32 border-4 border-white bg-black flex items-center justify-center relative"
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
                  <div className="bg-white text-black p-4 w-full h-full flex flex-col items-center justify-center">
                    <p className="font-bold text-xs mb-2">{placedBlock.label}</p>
                    <button
                      onClick={() => removeBlock(position)}
                      className="bg-black text-white px-2 py-1 text-xs"
                    >
                      REMOVE
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Drop here</p>
                )}
                <div className="absolute bottom-1 left-1 text-xs text-gray-500">
                  {position + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mb-8 flex gap-4">
        <button
          onClick={togglePlayback}
          disabled={placedBlocks.length === 0}
          className="bg-white text-black px-8 py-4 font-bold text-lg disabled:bg-gray-600 disabled:text-gray-400"
        >
          {isPlaying ? "STOP" : "PLAY"}
        </button>
        <button
          onClick={() => setPlacedBlocks([])}
          className="bg-gray-700 text-white px-8 py-4 font-bold text-lg"
        >
          CLEAR
        </button>
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="bg-gray-700 text-white px-8 py-4 font-bold text-lg"
        >
          {showExplanation ? "HIDE" : "SHOW"} EXPLANATION
        </button>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="bg-white text-black p-6">
          <h3 className="text-xl font-bold mb-4">REVERSE ENGINEERING IN HIP-HOP PRODUCTION</h3>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              This interactive experience simulates what Mike Exarchos calls reverse engineering in hip-hop production. When producers sample, they are not simply copying existing music—they are breaking it apart to understand its construction, then rebuilding those fragments into entirely new cultural statements.
            </p>
            <p>
              Exarchos describes sampling as a rich matrix of creative methods that includes not just the act of borrowing sound, but synthesis, programming, mixing, and mastering. This process trains producers to listen critically and understand how earlier music was constructed, turning sampling into both a technical skill and a form of musical education.
            </p>
            <p>
              What you just experienced—arranging blocks to create a beat—mirrors how producers like Kanye West manipulate fragments from global sources. Each sample becomes a layer of personal meaning. When Kanye chops a Kenyan folk song or layers a soul sample with industrial drums, he is reverse engineering those sounds, studying their emotional weight, and rebuilding them into his own narrative about fame, race, and power.
            </p>
            <p className="font-bold">
              The process you engaged with here demonstrates that sampling is not theft. It is a sophisticated form of authorship that requires years of practice, deep listening, and creative vision.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
