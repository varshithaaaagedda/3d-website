import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CAMERA_WAYPOINTS } from '../lib/constants';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useMousePosition } from '../hooks/useMousePosition';

export const CameraRig: React.FC = React.memo(() => {
  const { camera } = useThree();
  const scrollProgressRef = useScrollProgress();
  const mouseRef = useMousePosition();

  const lookAtRef = useRef(new THREE.Vector3(0, 1, 0));

  // Pre-allocated Vector3 instances to avoid garbage collection stutter
  const vTargetPos = useMemo(() => new THREE.Vector3(), []);
  const vTargetLookAt = useMemo(() => new THREE.Vector3(), []);
  const vFromPos = useMemo(() => new THREE.Vector3(), []);
  const vToPos = useMemo(() => new THREE.Vector3(), []);
  const vFromTarget = useMemo(() => new THREE.Vector3(), []);
  const vToTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const progress = scrollProgressRef.current;
    const totalSegments = CAMERA_WAYPOINTS.length - 1;
    const rawSegment = progress * totalSegments;
    const segmentIndex = Math.min(Math.floor(rawSegment), totalSegments - 1);
    const segmentT = rawSegment - segmentIndex;

    // Hermite smoothstep for silky ease-in / ease-out transitions between gallery exhibits
    const easedT = segmentT * segmentT * (3 - 2 * segmentT);

    const from = CAMERA_WAYPOINTS[segmentIndex];
    const to = CAMERA_WAYPOINTS[Math.min(segmentIndex + 1, CAMERA_WAYPOINTS.length - 1)];

    vFromPos.set(from.position[0], from.position[1], from.position[2]);
    vToPos.set(to.position[0], to.position[1], to.position[2]);
    vTargetPos.lerpVectors(vFromPos, vToPos, easedT);

    vFromTarget.set(from.target[0], from.target[1], from.target[2]);
    vToTarget.set(to.target[0], to.target[1], to.target[2]);
    vTargetLookAt.lerpVectors(vFromTarget, vToTarget, easedT);

    // Subtle natural mouse parallax offset
    const mouse = mouseRef.current;
    vTargetPos.x += mouse.x * 0.35;
    vTargetPos.y += mouse.y * 0.18;

    // Heavy cinematic camera inertia
    camera.position.lerp(vTargetPos, 0.05);
    lookAtRef.current.lerp(vTargetLookAt, 0.05);
    camera.lookAt(lookAtRef.current);
  });

  return null;
});

CameraRig.displayName = 'CameraRig';
