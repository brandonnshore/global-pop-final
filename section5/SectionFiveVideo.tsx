'use client';

import React from 'react';

export default function SectionFiveVideo() {
  return (
    <div className="bg-black p-2 overflow-y-auto max-h-[80vh]">
      <video
        controls
        className="w-full"
        style={{ maxHeight: '80vh' }}
      >
        <source src="/section5/video.mov" type="video/quicktime" />
        <source src="/section5/video.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
