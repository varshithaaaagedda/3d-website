import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import {
  MeshReflectorMaterial,
  ContactShadows,
  Sparkles,
  Environment,
} from '@react-three/drei';
import { useThree } from '@react-three/fiber';

export const GalleryEnvironment: React.FC = React.memo(() => {
  const spot1Ref = useRef<THREE.SpotLight>(null);
  const spot2Ref = useRef<THREE.SpotLight>(null);
  const spot3Ref = useRef<THREE.SpotLight>(null);
  const spot4Ref = useRef<THREE.SpotLight>(null);

  const { scene } = useThree();

  const isMobile = useMemo(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  }, []);

  const targets = useMemo(() => {
    const t1 = new THREE.Object3D();
    t1.position.set(-3, 0, 0); // Glass sculpture

    const t2 = new THREE.Object3D();
    t2.position.set(3, 0, -5); // Shader canvas

    const t3 = new THREE.Object3D();
    t3.position.set(-2, 0, -10); // Project pedestal

    const t4 = new THREE.Object3D();
    t4.position.set(0, 0, -16); // Particle void

    return { t1, t2, t3, t4 };
  }, []);

  useEffect(() => {
    scene.add(targets.t1);
    scene.add(targets.t2);
    scene.add(targets.t3);
    scene.add(targets.t4);

    if (spot1Ref.current) spot1Ref.current.target = targets.t1;
    if (spot2Ref.current) spot2Ref.current.target = targets.t2;
    if (spot3Ref.current) spot3Ref.current.target = targets.t3;
    if (spot4Ref.current) spot4Ref.current.target = targets.t4;

    return () => {
      scene.remove(targets.t1);
      scene.remove(targets.t2);
      scene.remove(targets.t3);
      scene.remove(targets.t4);
    };
  }, [scene, targets]);

  return (
    <>
      {/* Ambient Base Light */}
      <ambientLight intensity={0.08} color="#b8c4d0" />

      {/* 5-Point Studio Spotlights */}
      {/* Spot 01: Key light for Glass Sculpture */}
      <spotLight
        ref={spot1Ref}
        position={[-5, 8, 5]}
        intensity={2.5}
        color="#f5e6c8"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
        penumbra={0.8}
        angle={Math.PI / 5}
        decay={2}
        distance={30}
      />

      {/* Spot 02: Fill light for Shader Canvas */}
      <spotLight
        ref={spot2Ref}
        position={[5, 8, -3]}
        intensity={2.0}
        color="#e8dcc8"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
        penumbra={0.6}
        angle={Math.PI / 6}
        decay={2}
        distance={25}
      />

      {/* Spot 03: Focused spotlight for Pedestal */}
      <spotLight
        ref={spot3Ref}
        position={[-4, 7, -8]}
        intensity={2.2}
        color="#f5e6c8"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
        penumbra={0.7}
        angle={Math.PI / 6}
        decay={2}
        distance={25}
      />

      {/* Spot 04: Overhead spotlight for Particle Void */}
      <spotLight
        ref={spot4Ref}
        position={[0, 9, -14]}
        intensity={2.8}
        color="#e0d4be"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
        penumbra={0.85}
        angle={Math.PI / 4.5}
        decay={2}
        distance={30}
      />

      {/* Rim Back Light */}
      <pointLight position={[0, 6, -12]} intensity={1.5} color="#8899aa" distance={25} />

      {/* Rim Side Warm Light */}
      <pointLight position={[8, 4, 0]} intensity={0.8} color="#c9a96e" distance={20} />

      {/* Luxury Reflective Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -4]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={isMobile ? 512 : 1024}
          mixBlur={1}
          mixStrength={60}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
          mirror={0.75}
        />
      </mesh>

      {/* Contact Ground Shadows */}
      <ContactShadows
        opacity={0.45}
        scale={30}
        blur={2.5}
        far={6}
        resolution={256}
        color="#000000"
        position={[0, 0, -4]}
      />

      {/* Atmospheric Golden Dust Sparkles */}
      <Sparkles
        count={240}
        scale={[25, 12, 35]}
        size={1.6}
        speed={0.3}
        opacity={0.18}
        color="#c9a96e"
        position={[0, 2, -6]}
      />

      {/* Night Sky Environment Reflections */}
      <Environment preset="night" background={false} environmentIntensity={0.3} />
    </>
  );
});

GalleryEnvironment.displayName = 'GalleryEnvironment';
