'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Group } from 'three';
import FloatingToy from './FloatingToy';

const AnimatedGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

const HeroScene: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.4} />
        <pointLight position={[10, 10, 10]} color="#06b6d4" intensity={0.4} />

        <Suspense fallback={null}>
          <AnimatedGroup>
            {/* Main central toy */}
            <FloatingToy position={[0, 0, 0]} color="#3b82f6" size={1.5} wobbleSpeed={1.2} />

            {/* Orbiting toys */}
            <FloatingToy position={[-3, 1, -1]} color="#8b5cf6" size={0.8} floatSpeed={1.5} wobbleSpeed={1.8} />
            <FloatingToy position={[3, -0.5, -0.8]} color="#06b6d4" size={0.9} floatSpeed={0.8} wobbleSpeed={1.3} />
            <FloatingToy position={[1.5, 2, -2]} color="#f59e0b" size={0.6} floatSpeed={2.2} wobbleSpeed={2} />
            <FloatingToy position={[-2, -1.5, -1.5]} color="#ef4444" size={0.7} floatSpeed={1.8} wobbleSpeed={1.6} />
            <FloatingToy position={[0, -2.5, -2]} color="#10b981" size={0.5} floatSpeed={1.2} wobbleSpeed={2.5} />
            <FloatingToy position={[2.5, 0.5, -2.5]} color="#ec4899" size={0.4} floatSpeed={2.8} wobbleSpeed={1.9} />
          </AnimatedGroup>

          <ContactShadows
            position={[0, -4, 0]}
            opacity={0.2}
            scale={12}
            blur={2.5}
            far={4}
          />

          <Environment preset="sunset" />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
          autoRotate={true}
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
};

export default HeroScene;