"use client";

import DesktopIcon from "./DesktopIcon";
import ASCIIBackground from "./ASCIIBackground";
import type { DesktopItem } from "@/app/page";

interface DesktopProps {
  items: DesktopItem[];
  onOpenItem: (item: DesktopItem) => void;
  onIconPositionChange: (id: string, x: number, y: number) => void;
}

export default function Desktop({ items, onOpenItem, onIconPositionChange }: DesktopProps) {
  return (
    <div className="flex-1 desktop-texture relative overflow-hidden scanlines">
      <ASCIIBackground />
      {items.map((item) => (
        <DesktopIcon
          key={item.id}
          item={item}
          onDoubleClick={() => onOpenItem(item)}
          onPositionChange={onIconPositionChange}
        />
      ))}
    </div>
  );
}
