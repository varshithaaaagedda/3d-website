import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAudio } from '../../audio/AudioContext';

const PARTICLE_COUNT = 500;
const REPEL_RADIUS = 2.0;

interface ParticleVoidProps {
  onSelect?: (id: string) => void;
}

export const ParticleVoid: React.FC<ParticleVoidProps> = React.memo(({ onSelect }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const [hovered, setHovered] = useState(false);
  const { playHoverTick, playClickSweep } = useAudio();

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Compute original spherical particle positions
  const { originalPositions, currentPositions, velocities } = useMemo(() => {
    const orig = new Float32Array(PARTICLE_COUNT * 3);
    const curr = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Uniform distribution in sphere
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 2.5;

      const sinPhi = Math.sin(phi);
      const x = r * sinPhi * Math.cos(theta);
      const y = r * sinPhi * Math.sin(theta);
      const z = r * Math.cos(phi);

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;

      curr[i * 3] = x;
      curr[i * 3 + 1] = y;
      curr[i * 3 + 2] = z;
    }

    return { originalPositions: orig, currentPositions: curr, velocities: vel };
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    // Normalized pointer projected to exhibition center plane
    const mouseX = state.pointer.x * 3.5;
    const mouseY = state.pointer.y * 2.5;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      let cx = currentPositions[idx];
      let cy = currentPositions[idx + 1];
      let cz = currentPositions[idx + 2];

      const ox = originalPositions[idx];
      const oy = originalPositions[idx + 1];
      const oz = originalPositions[idx + 2];

      // Subtle ambient harmonic breathing
      const driftX = Math.sin(time * 0.8 + i * 0.1) * 0.002;
      const driftY = Math.cos(time * 0.6 + i * 0.15) * 0.002;
      const driftZ = Math.sin(time * 0.7 + i * 0.05) * 0.002;

      // Mouse repulsion vector in exhibition local coordinates
      const dx = cx - mouseX;
      const dy = cy - mouseY;
      const dz = cz;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < REPEL_RADIUS && dist > 0.001) {
        const force = (1.0 - dist / REPEL_RADIUS) * 0.04;
        velocities[idx] += (dx / dist) * force;
        velocities[idx + 1] += (dy / dist) * force;
        velocities[idx + 2] += (dz / dist) * force;
      }

      // Spring force returning to original position
      velocities[idx] += (ox - cx) * 0.03;
      velocities[idx + 1] += (oy - cy) * 0.03;
      velocities[idx + 2] += (oz - cz) * 0.03;

      // Damping
      velocities[idx] *= 0.92;
      velocities[idx + 1] *= 0.92;
      velocities[idx + 2] *= 0.92;

      cx += velocities[idx] + driftX;
      cy += velocities[idx + 1] + driftY;
      cz += velocities[idx + 2] + driftZ;

      currentPositions[idx] = cx;
      currentPositions[idx + 1] = cy;
      currentPositions[idx + 2] = cz;

      // Update instanced matrix
      dummy.position.set(cx, cy, cz);
      const scale = 1.0 + Math.sin(time * 2.0 + i) * 0.25;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group
      position={[0, 2, -16]}
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
        onSelect?.('particle-void');
      }}
    >
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, PARTICLE_COUNT]}
        castShadow
      >
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial
          color="#c9a96e"
          emissive="#c9a96e"
          emissiveIntensity={hovered ? 3.0 : 1.8}
          toneMapped={false}
          roughness={0.2}
          metalness={0.8}
        />
      </instancedMesh>

      {/* Central Singularity Core Ring */}
      <mesh position={[0, 0, 0]} rotation={[0.5, 0.3, 0]}>
        <torusGeometry args={[0.4, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#f5e6c8"
          emissive="#f5e6c8"
          emissiveIntensity={hovered ? 4 : 2.5}
          toneMapped={false}
        />
      </mesh>

      {/* Floor Emissive Base Halo */}
      <mesh position={[0, -1.98, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 2.5, 64]} />
        <meshStandardMaterial
          color="#c9a96e"
          emissive="#c9a96e"
          emissiveIntensity={hovered ? 2.5 : 1.2}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
});

ParticleVoid.displayName = 'ParticleVoid';
