import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useAudio } from '../../audio/AudioContext';

interface GlassSculptureProps {
  onSelect?: (id: string) => void;
}

export const GlassSculpture: React.FC<GlassSculptureProps> = React.memo(({ onSelect }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { playHoverTick, playClickSweep } = useAudio();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group position={[-3, 0, 0]}>
      {/* Exhibit Local Key Light */}
      <pointLight position={[0, 2.2, 1.5]} intensity={3.0} color="#f5e6c8" distance={8} />

      {/* Floating Glass Sculpture */}
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh
          ref={meshRef}
          castShadow
          receiveShadow
          position={[0, 1.8, 0]}
          onPointerEnter={(e) => {
            e.stopPropagation();
            setHovered(true);
            playHoverTick();
            document.body.style.cursor = 'pointer';
          }}
          onPointerLeave={(e) => {
            e.stopPropagation();
            setHovered(false);
            document.body.style.cursor = 'auto';
          }}
          onClick={(e) => {
            e.stopPropagation();
            playClickSweep();
            onSelect?.('glass-sculpture');
          }}
        >
          <torusKnotGeometry args={[1, 0.35, 256, 64]} />
          <MeshTransmissionMaterial
            backside
            backsideThickness={0.3}
            thickness={0.6}
            chromaticAberration={0.08}
            anisotropicBlur={0.1}
            distortion={0.25}
            distortionScale={0.3}
            temporalDistortion={0.1}
            transmission={0.98}
            roughness={hovered ? 0.02 : 0.06}
            ior={1.52}
            color="#c9a96e"
            attenuationColor="#f5e6c8"
            attenuationDistance={0.5}
          />
        </mesh>
      </Float>

      {/* Emissive Pedestal Ring */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[0.8, 1.2, 64]} />
        <meshStandardMaterial
          color="#c9a96e"
          emissive="#c9a96e"
          emissiveIntensity={hovered ? 3.5 : 2}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Sub-pedestal platform */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <cylinderGeometry args={[1.3, 1.4, 0.04, 64]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
});

GlassSculpture.displayName = 'GlassSculpture';
