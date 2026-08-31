import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Info } from 'lucide-react';
import { ExhibitData } from '../lib/constants';
import { useAudio } from '../audio/AudioContext';

interface ExhibitModalProps {
  exhibit: ExhibitData | null;
  onClose: () => void;
}

export const ExhibitModal: React.FC<ExhibitModalProps> = ({ exhibit, onClose }) => {
  const [visible, setVisible] = useState(false);
  const { playClickSweep } = useAudio();

  useEffect(() => {
    if (exhibit) {
      const timer = setTimeout(() => setVisible(true), 20);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [exhibit]);

  if (!exhibit) return null;

  const handleClose = () => {
    playClickSweep();
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <aside
      aria-label="Exhibit Dossier"
      className={`fixed right-4 sm:right-10 bottom-6 sm:bottom-10 z-50 pointer-events-auto max-w-[440px] w-[calc(100vw-2rem)] sm:w-full transition-all duration-400 ease-out transform ${
        visible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-6 scale-95'
      }`}
    >
      <div
        className="rounded-2xl p-6 sm:p-7 shadow-2xl border border-[#c9a96e]/20"
        style={{
          background: 'rgba(10, 10, 10, 0.78)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(201, 169, 110, 0.2)',
        }}
      >
        {/* Header with Close */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="font-body text-[9px] tracking-[0.25em] text-[#c9a96e] uppercase font-semibold">
              {exhibit.subtitle}
            </span>
            <h2 className="font-display text-xl sm:text-2xl text-[#e8e4de] tracking-wide mt-1">
              {exhibit.title}
            </h2>
          </div>

          <button
            onClick={handleClose}
            aria-label="Close dossier"
            className="p-1.5 rounded-full text-[#888888] hover:text-[#e8e4de] hover:bg-[#1a1a1a] transition-colors duration-200 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Medium & Year Metadata */}
        <div className="flex items-center gap-3 mt-3 text-[10px] font-body tracking-wider text-[#888888] uppercase">
          <span>{exhibit.medium}</span>
          <span>•</span>
          <span>{exhibit.year}</span>
        </div>

        {/* Divider */}
        <div className="w-12 h-[1px] bg-[#c9a96e]/40 my-4" />

        {/* Main Curatorial Description */}
        <p className="font-body text-xs sm:text-sm text-[#888888] leading-relaxed">
          {exhibit.description}
        </p>

        {/* Technical Specifications */}
        <div className="mt-4 pt-3 border-t border-[#1a1a1a] space-y-1.5">
          {exhibit.details.map((detail, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[10px] text-[#e8e4de]/70 font-body">
              <span className="w-1 h-1 rounded-full bg-[#c9a96e]" />
              <span>{detail}</span>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-6 pt-3 border-t border-[#1a1a1a]/80">
          <div className="flex items-center gap-1.5 text-[9px] text-[#888888] tracking-widest uppercase">
            <Info size={11} className="text-[#c9a96e]" />
            <span>Interactive Real-time R3F Mesh</span>
          </div>

          <button
            onClick={handleClose}
            className="px-3.5 py-1.5 rounded-full bg-[#1a1a1a] hover:bg-[#c9a96e] hover:text-[#050505] text-[#e8e4de] text-[10px] font-body tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </aside>
  );
};
