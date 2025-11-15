"use client";

import { useState, useEffect } from "react";
import type { DesktopItem } from "@/app/page";

interface DesktopIconProps {
  item: DesktopItem;
  onDoubleClick: () => void;
  onPositionChange: (id: string, x: number, y: number) => void;
}

export default function DesktopIcon({ item, onDoubleClick, onPositionChange }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(!isSelected);
  };

  const handleDoubleClickWrapper = () => {
    setIsSelected(false);
    onDoubleClick();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - item.x,
      y: e.clientY - item.y,
    });
    e.stopPropagation();
  };

  // Deselect when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsSelected(false);
    };

    if (isSelected) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSelected]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        onPositionChange(item.id, newX, newY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, item.id, onPositionChange]);

  // Retro color palette for each folder
  const getFolderColor = () => {
    const colorMap: { [key: string]: string } = {
      "sampling-storytelling": "#E06C79",   // Pink/Coral
      "hip-hop-pedagogy": "#8A5F9E",        // Purple
      "cultural-appropriation": "#FCC76A",   // Yellow
      "legal-blues": "#8FBB74",             // Green
      "kothbiro-sample": "#519FB0",         // Blue/Teal
      "sweet-lullaby": "#F4A755",           // Orange
      "trash": "#F4A755",                   // Orange
    };
    return colorMap[item.id] || "#f5f1e8";
  };

  return (
    <div
      className={`absolute select-none ${isDragging ? 'cursor-grabbing z-50' : 'cursor-grab transition-transform hover:scale-110'}`}
      style={{ left: item.x, top: item.y }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClickWrapper}
      onMouseDown={handleMouseDown}
    >
      <div className="flex flex-col items-center gap-1 p-2">
        {/* Icon */}
        <div
          className={`w-16 h-16 flex items-center justify-center ${
            isSelected ? "bg-white bg-opacity-30 rounded" : ""
          }`}
        >
          {item.id === "trash" ? (
            // Trash bin icon
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              className="drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)]"
            >
              {/* Trash bin body */}
              <path d="M18 20 L20 52 L44 52 L46 20 Z" fill={getFolderColor()} stroke="black" strokeWidth="3"/>
              {/* Trash bin lid */}
              <rect x="14" y="16" width="36" height="6" fill={getFolderColor()} stroke="black" strokeWidth="3"/>
              {/* Handle on lid */}
              <rect x="26" y="10" width="12" height="8" fill={getFolderColor()} stroke="black" strokeWidth="3"/>
              {/* Trash lines */}
              <line x1="26" y1="26" x2="26" y2="46" stroke="black" strokeWidth="2"/>
              <line x1="32" y1="26" x2="32" y2="46" stroke="black" strokeWidth="2"/>
              <line x1="38" y1="26" x2="38" y2="46" stroke="black" strokeWidth="2"/>
              {/* Pixelated details */}
              <rect x="22" y="28" width="4" height="4" fill="rgba(255,255,255,0.4)"/>
              <rect x="40" y="32" width="4" height="4" fill="rgba(0,0,0,0.2)"/>
            </svg>
          ) : item.type === "folder" ? (
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              className="drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)]"
            >
              {/* Folder back */}
              <rect x="8" y="16" width="48" height="36" fill={getFolderColor()} stroke="black" strokeWidth="3"/>
              {/* Folder tab */}
              <path d="M8 16 L28 16 L32 12 L8 12 Z" fill={getFolderColor()} stroke="black" strokeWidth="3"/>
              {/* Pixelated details */}
              <rect x="12" y="24" width="4" height="4" fill="rgba(255,255,255,0.4)"/>
              <rect x="12" y="32" width="4" height="4" fill="rgba(255,255,255,0.4)"/>
              <rect x="48" y="24" width="4" height="4" fill="rgba(0,0,0,0.2)"/>
              <rect x="48" y="32" width="4" height="4" fill="rgba(0,0,0,0.2)"/>
            </svg>
          ) : (
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              className="drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)]"
            >
              <rect x="16" y="8" width="32" height="48" fill="white" stroke="black" strokeWidth="3"/>
              <rect x="20" y="12" width="24" height="4" fill="#333"/>
              <rect x="20" y="20" width="24" height="4" fill="#666"/>
              <rect x="20" y="28" width="24" height="4" fill="#666"/>
              <rect x="20" y="36" width="16" height="4" fill="#666"/>
            </svg>
          )}
        </div>

        {/* Label */}
        <div
          className={`px-2 py-1 text-xs font-bold text-center max-w-[120px] ${
            isSelected ? "bg-black text-white" : "text-black"
          }`}
        >
          {item.name}
        </div>
      </div>
    </div>
  );
}
