import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useAudio } from '../../audio/AudioContext';

interface ProjectPedestalProps {
  onSelect?: (id: string) => void;
}

export const ProjectPedestal: React.FC<ProjectPedestalProps> = React.memo(({ onSelect }) => {
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { playHoverTick, playClickSweep } = useAudio();

  useFrame((_, delta) => {
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.y += delta * 0.4;
      innerMeshRef.current.rotation.x += delta * 0.15;
    }
  });

  return (
    <group position={[-2, 1.2, -10]}>
      {/* Exhibit Local Spotlight */}
      <pointLight position={[0, 1.8, 1.5]} intensity={3.2} color="#f5e6c8" distance={8} />

      {/* Rotating Inner Polyhedron */}
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.4}>
        <mesh
          ref={innerMeshRef}
          castShadow
          position={[0, 0.2, 0]}
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
            onSelect?.('project-pedestal');
          }}
        >
          <icosahedronGeometry args={[0.6, 1]} />
          <meshPhysicalMaterial
            color="#c9a96e"
            metalness={0.92}
            roughness={0.08}
            emissive="#c9a96e"
            emissiveIntensity={hovered ? 0.8 : 0.3}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </Float>

      {/* Glass Enclosure */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.8, 2.2, 1.8]} />
        <meshPhysicalMaterial
          transmission={0.95}
          thickness={0.05}
          roughness={0}
          ior={1.5}
          color="#ffffff"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Metal Bezel Edge Frame */}
      <lineSegments position={[0, 0.2, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.8, 2.2, 1.8)]} />
        <lineBasicMaterial color={hovered ? '#f5e6c8' : '#c9a96e'} linewidth={1} />
      </lineSegments>

      {/* Heavy Cylindrical Pedestal Base */}
      <mesh position={[0, -1.0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 1.3, 0.4, 32]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Emissive Base Accent Line */}
      <mesh position={[0, -0.79, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.15, 1.22, 32]} />
        <meshStandardMaterial
          color="#c9a96e"
          emissive="#c9a96e"
          emissiveIntensity={hovered ? 3 : 1.8}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
});

ProjectPedestal.displayName = 'ProjectPedestal';
