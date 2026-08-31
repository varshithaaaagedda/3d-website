import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { EXHIBITS } from '../lib/constants';
import { useAudio } from '../audio/AudioContext';

interface HeaderProps {
  scrollProgress: number;
}

export const Header: React.FC<HeaderProps> = ({ scrollProgress }) => {
  const { isEnabled, toggle } = useAudio();

  // Determine active exhibit from scrollProgress (0 to 1)
  const totalExhibits = EXHIBITS.length;
  const rawIdx = Math.floor(scrollProgress * totalExhibits);
  const currentIdx = Math.min(Math.max(rawIdx, 0), totalExhibits - 1);
  const currentExhibit = EXHIBITS[currentIdx];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 py-6 flex items-start justify-between pointer-events-none">
      {/* Brand Identity */}
      <div className="flex flex-col">
        <h1 className="font-display text-lg sm:text-xl text-[#e8e4de] tracking-[0.3em] uppercase font-normal select-none">
          LUMEN
        </h1>
        <p className="font-body text-[#888888] text-[10px] tracking-[0.2em] uppercase mt-1">
          Gallery 01 — Monolith
        </p>
      </div>

      {/* Center Prompt (Desktop) */}
      <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a0a0a]/60 backdrop-blur-md border border-[#1a1a1a]">
        <Sparkles size={12} className="text-[#c9a96e] animate-pulse" />
        <span className="font-body text-[10px] tracking-[0.15em] text-[#e8e4de]/80 uppercase">
          Scroll to explore corridor • Click 3D artwork for specs
        </span>
      </div>

      {/* Right Controls & Tracker */}
      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-3">
          <span className="font-body text-xs text-[#c9a96e] tracking-wider uppercase">
            {currentExhibit?.title || 'Entrance'}
          </span>
          <span className="font-body text-[#888888] text-[10px] tracking-[0.15em]">
            {`${String(currentIdx + 1).padStart(2, '0')} / 04`}
          </span>
        </div>

        <p className="font-body text-[#888888] text-[9px] tracking-[0.15em] uppercase">
          {currentExhibit?.subtitle}
        </p>

        {/* Spatial Audio Toggle */}
        <button
          onClick={toggle}
          aria-label="Toggle Spatial Audio"
          className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a0a0a]/80 backdrop-blur-md border border-[#1a1a1a] hover:border-[#c9a96e]/50 text-[#888888] hover:text-[#c9a96e] transition-all duration-300 pointer-events-auto cursor-pointer shadow-lg"
        >
          {isEnabled ? (
            <>
              <Volume2 size={14} className="text-[#c9a96e]" />
              <span className="text-[10px] tracking-[0.15em] uppercase font-medium text-[#c9a96e]">
                Audio On
              </span>
            </>
          ) : (
            <>
              <VolumeX size={14} />
              <span className="text-[10px] tracking-[0.15em] uppercase font-medium">
                Audio Off
              </span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
