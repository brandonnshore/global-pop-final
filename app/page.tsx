"use client";

import { useState, useEffect } from "react";
import MenuBar from "@/components/MenuBar";
import Desktop from "@/components/Desktop";
import Window from "@/components/Window";
import BootScreen from "@/components/BootScreen";
import BeatBuilder from "@/components/BeatBuilder";
import ExchangeOrExploitation from "@/components/ExchangeOrExploitation";
import SectionFourMapJourney from "@/section4/SectionFourMapJourney";
import SectionSixCaseFile from "@/section6/SectionSixCaseFile";
import SectionOneRecordRoom from "@/section1/SectionOneRecordRoom";

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






      // New interactive sections (grey folders)
      {
        id: "section1-record-room",
        name: "Section 1: Record Room",
        type: "folder",
        x: 20,
        y: 50,
        content: <SectionOneRecordRoom />,
      },
      {
        id: "section2-beat-builder",
        name: "Section 2: Beat Builder",
        type: "folder",
        x: 20,
        y: 180,
        content: <BeatBuilder />,
      },
      {
        id: "section3-slider",
        name: "Section 3: Slider",
        type: "folder",
        x: 20,
        y: 310,
        content: <ExchangeOrExploitation />,
      },
      {
        id: "section4-map-journey",
        name: "Section 4: Three Lives",
        type: "folder",
        x: 20,
        y: 570,
        content: <SectionFourMapJourney />,
      },
      {
        id: "section6-kothbiro-case",
        name: "Section 6: Kothbiro",
        type: "folder",
        x: 20,
        y: 700,
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
      {
        id: "readme",
        name: "Read Me",
        type: "file",
        x: 20,
        y: 50,
        content: (
          <div className="p-6 max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">📚 Welcome to Kanye 2049</h2>
            <p className="mb-4">An interactive exploration of Kanye West's global sampling practices.</p>
            <div className="bg-gray-100 p-4 border-2 border-black">
              <p className="font-bold mb-2">Navigation Guide:</p>
              <p className="text-sm">Each folder on the right contains a source from my annotated bibliography. Double-click to explore different perspectives on sampling, cultural appropriation, and Kanye's place in global music culture.</p>
            </div>
            <p className="mt-4 text-xs italic">Note: This is temporary content. The full paper will be integrated soon.</p>
          </div>
        ),
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
