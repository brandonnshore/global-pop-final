"use client";

import { useState, useEffect, useRef } from "react";

export default function MenuBar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes}${ampm}`;
  };

  const formatDate = (date: Date) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[date.getMonth()]}. ${date.getDate()}, ${date.getFullYear()}`;
  };

  const handleMenuClick = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleMenuItemClick = (action: string) => {
    console.log(`Menu action: ${action}`);
    alert(`You clicked: ${action}`);
    setOpenMenu(null);
  };

  return (
    <div className="h-8 bg-[#f5f1e8] border-b-2 border-black flex items-center justify-between px-2 select-none relative" ref={menuRef}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-black" style={{clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'}}></div>

          {/* File Menu */}
          <div className="relative">
            <span
              className={`font-bold text-sm text-black cursor-pointer px-2 py-1 ${openMenu === 'file' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
              onClick={() => handleMenuClick('file')}
            >
              File
            </span>
            {openMenu === 'file' && (
              <div className="absolute top-full left-0 bg-[#f5f1e8] border-2 border-black mt-1 w-48 z-50 shadow-lg">
                <MenuItem onClick={() => handleMenuItemClick('New Folder')} shortcut="⌘N">New Folder</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Open')} shortcut="⌘O">Open</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => handleMenuItemClick('Close')} shortcut="⌘W">Close</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Save')} shortcut="⌘S">Save</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => handleMenuItemClick('Get Info')} shortcut="⌘I">Get Info</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Duplicate')} shortcut="⌘D">Duplicate</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => handleMenuItemClick('Empty Trash')}>Empty Trash</MenuItem>
              </div>
            )}
          </div>

          {/* Edit Menu */}
          <div className="relative">
            <span
              className={`font-bold text-sm text-black cursor-pointer px-2 py-1 ${openMenu === 'edit' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
              onClick={() => handleMenuClick('edit')}
            >
              Edit
            </span>
            {openMenu === 'edit' && (
              <div className="absolute top-full left-0 bg-[#f5f1e8] border-2 border-black mt-1 w-48 z-50 shadow-lg">
                <MenuItem onClick={() => handleMenuItemClick('Undo')} shortcut="⌘Z">Undo</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => handleMenuItemClick('Cut')} shortcut="⌘X">Cut</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Copy')} shortcut="⌘C">Copy</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Paste')} shortcut="⌘V">Paste</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Clear')}>Clear</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => handleMenuItemClick('Select All')} shortcut="⌘A">Select All</MenuItem>
              </div>
            )}
          </div>

          {/* Special Menu */}
          <div className="relative">
            <span
              className={`font-bold text-sm text-black cursor-pointer px-2 py-1 ${openMenu === 'special' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
              onClick={() => handleMenuClick('special')}
            >
              Special
            </span>
            {openMenu === 'special' && (
              <div className="absolute top-full left-0 bg-[#f5f1e8] border-2 border-black mt-1 w-48 z-50 shadow-lg">
                <MenuItem onClick={() => handleMenuItemClick('Clean Up Desktop')}>Clean Up Desktop</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Empty Trash')}>Empty Trash</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => handleMenuItemClick('Restart')}>Restart</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Shut Down')}>Shut Down</MenuItem>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-bold text-sm text-black">
          {formatTime(currentTime)} - {formatDate(currentTime)}
        </span>
      </div>
    </div>
  );
}

function MenuItem({
  children,
  onClick,
  shortcut
}: {
  children: React.ReactNode;
  onClick: () => void;
  shortcut?: string;
}) {
  return (
    <div
      className="px-4 py-1 hover:bg-black hover:text-white cursor-pointer flex justify-between items-center text-sm"
      onClick={onClick}
    >
      <span>{children}</span>
      {shortcut && <span className="text-xs ml-4">{shortcut}</span>}
    </div>
  );
}

function MenuDivider() {
  return <div className="h-px bg-black my-1 mx-2" />;
}
