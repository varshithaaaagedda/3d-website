import React from 'react';
import { CAMERA_WAYPOINTS } from '../lib/constants';
import { useAudio } from '../audio/AudioContext';

interface ScrollProgressProps {
  scrollProgress: number;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({ scrollProgress }) => {
  const { playClickSweep } = useAudio();

  const handleDotClick = (index: number) => {
    playClickSweep();
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = (index / (CAMERA_WAYPOINTS.length - 1)) * totalHeight;
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  return (
    <nav aria-label="Gallery Navigation Rail" className="fixed right-6 sm:right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4 pointer-events-none">
      {/* Outer rail */}
      <div className="w-[2px] h-44 bg-[#1a1a1a]/60 rounded-full relative overflow-hidden">
        {/* Inner active fill */}
        <div
          className="absolute top-0 w-full bg-[#c9a96e] rounded-full transition-all duration-150 ease-out shadow-[0_0_8px_#c9a96e]"
          style={{ height: `${Math.min(Math.max(scrollProgress * 100, 2), 100)}%` }}
        />
      </div>

      {/* Interactive Waypoint Dots */}
      <div className="absolute inset-y-0 -left-2 flex flex-col justify-between items-center h-44">
        {CAMERA_WAYPOINTS.map((wp, i) => {
          const pointFraction = i / (CAMERA_WAYPOINTS.length - 1);
          const isActive = scrollProgress >= pointFraction - 0.08;

          return (
            <button
              key={wp.label}
              onClick={() => handleDotClick(i)}
              aria-label={`Jump to ${wp.label}`}
              title={wp.label}
              className={`w-3.5 h-3.5 rounded-full flex items-center justify-center pointer-events-auto cursor-pointer transition-all duration-300 group`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-[#c9a96e] scale-125 shadow-[0_0_6px_#c9a96e]'
                    : 'bg-[#2a2a2a] group-hover:bg-[#888888]'
                }`}
              />
              {/* Tooltip on hover */}
              <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none px-2 py-1 bg-[#0a0a0a]/90 backdrop-blur-md border border-[#1a1a1a] rounded text-[9px] font-body tracking-[0.15em] text-[#e8e4de] uppercase whitespace-nowrap">
                {wp.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
