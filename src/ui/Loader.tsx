import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

export const Loader: React.FC = () => {
  const { progress } = useProgress();
  const [mounted, setMounted] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setFading(true);
        const unmountTimer = setTimeout(() => {
          setMounted(false);
        }, 800);
        return () => clearTimeout(unmountTimer);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center transition-opacity duration-700 pointer-events-auto ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center text-center px-6">
        <h1 className="font-display text-4xl sm:text-5xl tracking-[0.4em] text-[#e8e4de] uppercase font-normal">
          LUMEN
        </h1>
        <p className="font-body text-xs sm:text-sm tracking-[0.25em] text-[#888888] uppercase mt-4">
          Digital 3D Interactive Art Gallery
        </p>

        {/* Progress Bar */}
        <div className="w-56 h-[2px] bg-[#1a1a1a] mt-10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-[#c9a96e] transition-all duration-300 ease-out rounded-full shadow-[0_0_12px_#c9a96e]"
            style={{ width: `${Math.min(Math.max(progress, 5), 100)}%` }}
          />
        </div>

        <span className="font-body text-[10px] tracking-[0.2em] text-[#c9a96e] mt-4 tabular-nums">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};
