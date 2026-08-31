import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { audioEngine } from './AudioEngine';

interface AudioContextValue {
  isEnabled: boolean;
  toggle: () => Promise<void>;
  playHoverTick: () => void;
  playClickSweep: () => void;
  playSubBass: () => void;
}

const AudioContext = createContext<AudioContextValue>({
  isEnabled: false,
  toggle: async () => {},
  playHoverTick: () => {},
  playClickSweep: () => {},
  playSubBass: () => {},
});

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggle = useCallback(async () => {
    const active = await audioEngine.toggle();
    setIsEnabled(active);
    if (active) {
      audioEngine.playSubBass();
    }
  }, []);

  const playHoverTick = useCallback(() => {
    if (isEnabled) {
      audioEngine.playHoverTick();
    }
  }, [isEnabled]);

  const playClickSweep = useCallback(() => {
    if (isEnabled) {
      audioEngine.playClickSweep();
    }
  }, [isEnabled]);

  const playSubBass = useCallback(() => {
    if (isEnabled) {
      audioEngine.playSubBass();
    }
  }, [isEnabled]);

  useEffect(() => {
    return () => {
      audioEngine.dispose();
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isEnabled,
        toggle,
        playHoverTick,
        playClickSweep,
        playSubBass,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
