'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial, Sphere } from '@react-three/drei';
import { Mesh, Color } from 'three';

interface FloatingToyProps {
  position: [number, number, number];
  color?: string;
  size?: number;
  wobbleSpeed?: number;
  floatSpeed?: number;
}

const FloatingToy: React.FC<FloatingToyProps> = ({
  position,
  color = '#4f46e5',
  size = 1,
  wobbleSpeed = 1,
  floatSpeed = 1
}) => {
  const meshRef = useRef<Mesh>(null);
  const startPosition = useMemo(() => position[1], [position]);

  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = startPosition + Math.sin(state.clock.elapsedTime * floatSpeed) * 0.5;
      // Gentle rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} position={position} args={[size, 32, 32]}>
      <MeshWobbleMaterial
        color={new Color(color)}
        speed={wobbleSpeed}
        factor={0.3}
        roughness={0.1}
        metalness={0.8}
      />
    </Sphere>
  );
};

export default FloatingToy;