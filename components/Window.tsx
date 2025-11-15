"use client";

import { useState, useRef, useEffect } from "react";

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  initialX?: number;
  initialY?: number;
  width?: number;
  height?: number;
}

export default function Window({
  title,
  children,
  onClose,
  initialX = 100,
  initialY = 100,
  width = 500,
  height = 400,
}: WindowProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ width, height });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".title-bar")) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        setSize({
          width: Math.max(300, resizeStart.width + deltaX),
          height: Math.max(200, resizeStart.height + deltaY),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, resizeStart]);

  return (
    <div
      ref={windowRef}
      className="mac-window absolute z-10"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Title Bar */}
      <div className="title-bar h-8 bg-[#f5f1e8] border-b-2 border-black flex items-center justify-between px-2 cursor-move select-none">
        <div className="flex items-center gap-2">
          <button
            className="w-5 h-5 border-2 border-black bg-[#f5f1e8] hover:bg-[#e8e0d0] transition-colors"
            onClick={onClose}
          >
            <div className="w-full h-full flex items-center justify-center text-xs font-bold">
              ×
            </div>
          </button>
        </div>

        <div className="flex-1 text-center font-bold text-sm truncate px-4 text-black">
          {title}
        </div>

        <div className="w-5"></div>
      </div>

      {/* Window Content */}
      <div className="bg-[#f5f1e8] h-[calc(100%-2rem)] overflow-auto">
        {children}
      </div>

      {/* Resize Handle */}
      <div
        className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize hover:bg-gray-300 flex items-end justify-end p-1"
        onMouseDown={handleResizeMouseDown}
      >
        <svg width="12" height="12" viewBox="0 0 12 12">
          <line x1="12" y1="0" x2="0" y2="12" stroke="black" strokeWidth="1"/>
          <line x1="12" y1="4" x2="4" y2="12" stroke="black" strokeWidth="1"/>
          <line x1="12" y1="8" x2="8" y2="12" stroke="black" strokeWidth="1"/>
        </svg>
      </div>
    </div>
  );
}
