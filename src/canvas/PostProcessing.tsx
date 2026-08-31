import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Noise,
  Vignette,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export const PostProcessing: React.FC = React.memo(() => {
  const aberrationOffset = useMemo(() => new THREE.Vector2(0.0006, 0.0006), []);

  return (
    <EffectComposer multisampling={0}>
      {/* Selective emissive bloom */}
      <Bloom
        luminanceThreshold={0.9}
        luminanceSmoothing={0.025}
        mipmapBlur
        intensity={0.85}
      />

      {/* Subtle cinematic chromatic lens fringe */}
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={aberrationOffset}
        radialModulation
        modulationOffset={0.5}
      />

      {/* Analog film grain texture */}
      <Noise premultiply blendFunction={BlendFunction.ADD} opacity={0.028} />

      {/* Dark museum edge vignette */}
      <Vignette eskil={false} offset={0.15} darkness={0.88} />
    </EffectComposer>
  );
});

PostProcessing.displayName = 'PostProcessing';
