"use client";

import { cn } from '@/lib/utils';

const Silhouettes = () => {
  return (
    <div className="absolute inset-x-0 top-0 h-48 w-full overflow-hidden pointer-events-none z-10">
      {/* Far layer - static blur */}
      <div
        className="absolute inset-0"
        style={{ filter: 'blur(3px)' }}
      >
        <svg
          className="absolute top-0 left-0 w-full h-auto text-teal-800/20"
          viewBox="0 0 800 200"
          preserveAspectRatio="xMidYMax meet"
        >
          <path d="M-100,150 Q100,50 300,120 T500,80 T700,140 T900,100 V200 H-100 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Mid layer */}
      <div
        className="absolute inset-0"
      >
        <svg
          className="absolute top-0 right-0 w-1/2 h-auto text-teal-700/40"
          viewBox="0 0 400 200"
          preserveAspectRatio="xMidYMax meet"
        >
          <path d="M500,100 Q400,80 300,130 T100,100 T-50,150 V200 H500 Z" fill="currentColor" />
        </svg>
        <svg
          className="absolute top-0 left-0 w-1/2 h-auto text-teal-700/40"
          viewBox="0 0 400 200"
          preserveAspectRatio="xMidYMax meet"
        >
          <path d="M-100,120 Q0,100 100,140 T300,90 T450,160 V200 H-100 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Nearest layer */}
      <div className={cn("absolute inset-0")}>
        <svg
          className="absolute -top-4 right-[-5%] w-2/5 h-auto text-sea-green-600/80"
          viewBox="0 0 200 150"
        >
          <path d="M150,0 C130,50 180,80 140,150" stroke="currentColor" fill="none" strokeWidth="2" />
          <circle cx="138" cy="110" r="4" fill="currentColor" />
          <circle cx="160" cy="60" r="5" fill="currentColor" />
        </svg>
        <svg
          className="absolute -top-2 left-[-5%] w-1/3 h-auto text-sea-green-600/80"
          viewBox="0 0 150 150"
        >
          <path d="M50,0 C70,40 20,70 60,140" stroke="currentColor" fill="none" strokeWidth="2" />
          <circle cx="65" cy="100" r="4" fill="currentColor" />
          <circle cx="40" cy="50" r="5" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
};

export default Silhouettes;
