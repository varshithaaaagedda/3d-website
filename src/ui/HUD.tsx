import React from 'react';
import { Header } from './Header';
import { ScrollProgress } from './ScrollProgress';
import { ExhibitModal } from './ExhibitModal';
import { ExhibitData } from '../lib/constants';

interface HUDProps {
  scrollProgress: number;
  selectedExhibit: ExhibitData | null;
  onCloseModal: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  scrollProgress,
  selectedExhibit,
  onCloseModal,
}) => {
  return (
    <div className="fixed inset-0 z-40 pointer-events-none select-none">
      <Header scrollProgress={scrollProgress} />
      <ScrollProgress scrollProgress={scrollProgress} />
      <ExhibitModal exhibit={selectedExhibit} onClose={onCloseModal} />
    </div>
  );
};
