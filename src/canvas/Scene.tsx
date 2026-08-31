import React from 'react';
import { CameraRig } from './CameraRig';
import { GalleryEnvironment } from './GalleryEnvironment';
import { GlassSculpture } from './exhibits/GlassSculpture';
import { ShaderCanvas } from './exhibits/ShaderCanvas';
import { ProjectPedestal } from './exhibits/ProjectPedestal';
import { ParticleVoid } from './exhibits/ParticleVoid';
import { PostProcessing } from './PostProcessing';

interface SceneProps {
  onSelectExhibit?: (id: string) => void;
}

export const Scene: React.FC<SceneProps> = React.memo(({ onSelectExhibit }) => {
  return (
    <>
      {/* Scroll & Parallax Camera Controller */}
      <CameraRig />

      {/* Atmospheric Gallery Lighting & Reflections */}
      <GalleryEnvironment />

      {/* 4 Distinct Masterpiece Exhibits */}
      <GlassSculpture onSelect={onSelectExhibit} />
      <ShaderCanvas onSelect={onSelectExhibit} />
      <ProjectPedestal onSelect={onSelectExhibit} />
      <ParticleVoid onSelect={onSelectExhibit} />

      {/* Cinematic Post-Processing Pipeline */}
      <PostProcessing />
    </>
  );
});

Scene.displayName = 'Scene';
