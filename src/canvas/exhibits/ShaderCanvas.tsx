import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import waveVertex from '../../shaders/waveVertex.glsl';
import waveFragment from '../../shaders/waveFragment.glsl';
import { useAudio } from '../../audio/AudioContext';

interface ShaderCanvasProps {
  onSelect?: (id: string) => void;
}

export const ShaderCanvas: React.FC<ShaderCanvasProps> = React.memo(({ onSelect }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { playHoverTick, playClickSweep } = useAudio();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  );

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;

      // Map normalized pointer (-1..1) to UV space (0..1)
      const targetU = (state.pointer.x + 1) * 0.5;
      const targetV = (state.pointer.y + 1) * 0.5;
      materialRef.current.uniforms.uMouse.value.lerp(
        new THREE.Vector2(targetU, targetV),
        0.1
      );
    }
  });

  useEffect(() => {
    return () => {
      materialRef.current?.dispose();
    };
  }, []);

  return (
    <group position={[3, 1.5, -5]} rotation={[0, -0.35, 0]}>
      {/* Exhibit Local Key Light */}
      <pointLight position={[0, 0.5, 2.0]} intensity={2.8} color="#f5e6c8" distance={9} />

      {/* Decorative Frame */}
      <mesh position={[0, 0, -0.05]} receiveShadow>
        <boxGeometry args={[4.2, 3.2, 0.08]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Frame Accent Border */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[4.08, 3.08]} />
        <meshBasicMaterial color="#c9a96e" wireframe />
      </mesh>

      {/* Interactive GLSL Membrane */}
      <mesh
        ref={meshRef}
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
          onSelect?.('shader-canvas');
        }}
      >
        <planeGeometry args={[4, 3, 128, 96]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={waveVertex}
          fragmentShader={waveFragment}
          uniforms={uniforms}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floor Glow Bar */}
      <mesh position={[0, -1.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 0.1]} />
        <meshStandardMaterial
          color="#c9a96e"
          emissive="#c9a96e"
          emissiveIntensity={hovered ? 3 : 1.5}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
});

ShaderCanvas.displayName = 'ShaderCanvas';
