"use client";

import { useState, useEffect } from "react";
import MenuBar from "@/components/MenuBar";
import Desktop from "@/components/Desktop";
import Window from "@/components/Window";
import BootScreen from "@/components/BootScreen";
import BeatBuilder from "@/components/BeatBuilder";
import ExchangeOrExploitation from "@/components/ExchangeOrExploitation";
import SectionFourMapJourney from "@/section4/SectionFourMapJourney";
import SectionFiveVideo from "@/section5/SectionFiveVideo";
import SectionSixCaseFile from "@/section6/SectionSixCaseFile";
import SectionOneRecordRoom from "@/section1/SectionOneRecordRoom";
import PlayMeWelcome from "@/components/PlayMeWelcome";

export type DesktopItem = {
  id: string;
  name: string;
  type: "folder" | "file";
  x: number;
  y: number;
  content?: React.ReactNode;
};

export default function Home() {
  const [openWindows, setOpenWindows] = useState<DesktopItem[]>([]);
  const [desktopItems, setDesktopItems] = useState<DesktopItem[]>([]);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    // Set positions based on window size after mount
    setDesktopItems([






      // PLAY ME FIRST - centered top
      {
        id: "playme",
        name: "▶ PLAY ME FIRST",
        type: "file",
        x: window.innerWidth / 2 - 60,
        y: 60,
        content: <PlayMeWelcome />,
      },
      // Section folders - top right grid
      {
        id: "section1-record-room",
        name: "Section 1: Record Room",
        type: "folder",
        x: window.innerWidth - 280,
        y: 40,
        content: <SectionOneRecordRoom />,
      },
      {
        id: "section2-beat-builder",
        name: "Section 2: Beat Builder",
        type: "folder",
        x: window.innerWidth - 130,
        y: 40,
        content: <BeatBuilder />,
      },
      {
        id: "section3-slider",
        name: "Section 3: Slider",
        type: "folder",
        x: window.innerWidth - 280,
        y: 190,
        content: <ExchangeOrExploitation />,
      },
      {
        id: "section4-map-journey",
        name: "Section 4: Three Lives",
        type: "folder",
        x: window.innerWidth - 130,
        y: 190,
        content: <SectionFourMapJourney />,
      },
      {
        id: "section5-video",
        name: "Section 5: Video",
        type: "folder",
        x: window.innerWidth - 280,
        y: 340,
        content: <SectionFiveVideo />,
      },
      {
        id: "section6-kothbiro-case",
        name: "Section 6: Kothbiro",
        type: "folder",
        x: window.innerWidth - 130,
        y: 340,
        content: <SectionSixCaseFile />,
      },
      // System items
      {
        id: "trash",
        name: "Trash",
        type: "folder",
        x: 20,
        y: window.innerHeight - 150,
        content: <div className="p-4">Trash is empty.</div>,
      },
    ]);
  }, []);

  const handleOpenItem = (item: DesktopItem) => {
    if (!openWindows.find((w) => w.id === item.id)) {
      setOpenWindows([...openWindows, item]);
    }
  };

  const handleCloseWindow = (id: string) => {
    setOpenWindows(openWindows.filter((w) => w.id !== id));
  };

  const handleIconPositionChange = (id: string, x: number, y: number) => {
    setDesktopItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, x, y } : item
      )
    );
    // Log positions so we can see where you dragged them
    console.log(`${id}: x=${x}, y=${y}`);
  };

  if (isBooting) {
    return <BootScreen onComplete={() => setIsBooting(false)} />;
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <MenuBar />
      <Desktop
        items={desktopItems}
        onOpenItem={handleOpenItem}
        onIconPositionChange={handleIconPositionChange}
      />

      {openWindows.map((window, index) => (
        <Window
          key={window.id}
          title={window.name}
          onClose={() => handleCloseWindow(window.id)}
          initialX={100 + index * 30}
          initialY={100 + index * 30}
        >
          {window.content}
        </Window>
      ))}
    </div>
  );
}
