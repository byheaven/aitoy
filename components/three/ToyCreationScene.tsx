'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import FloatingToy from './FloatingToy';

interface ToyCreationSceneProps {
  sceneType: 'creation' | 'community' | 'production';
}

const ToyCreationScene: React.FC<ToyCreationSceneProps> = ({ sceneType }) => {
  const getSceneContent = () => {
    switch (sceneType) {
      case 'creation':
        return (
          <>
            <FloatingToy position={[0, 0, 0]} color="#3b82f6" size={1.2} wobbleSpeed={2} />
            <FloatingToy position={[-2, -1, -1]} color="#8b5cf6" size={0.8} floatSpeed={1.5} />
            <FloatingToy position={[2, 1, -0.5]} color="#06b6d4" size={0.6} wobbleSpeed={1.5} />
          </>
        );
      case 'community':
        return (
          <>
            <FloatingToy position={[0, 0, 0]} color="#f59e0b" size={1} wobbleSpeed={1} />
            <FloatingToy position={[-1.5, 0.5, -1]} color="#ef4444" size={0.7} floatSpeed={0.8} />
            <FloatingToy position={[1.5, -0.5, -0.8]} color="#10b981" size={0.9} wobbleSpeed={1.2} />
            <FloatingToy position={[0, 1.5, -1.5]} color="#ec4899" size={0.5} floatSpeed={2} />
          </>
        );
      case 'production':
        return (
          <>
            <FloatingToy position={[0, 0, 0]} color="#6366f1" size={1.3} wobbleSpeed={0.5} />
            <FloatingToy position={[-1, -1, 0]} color="#8b5cf6" size={0.8} floatSpeed={0.7} />
            <FloatingToy position={[1, 1, -1]} color="#06b6d4" size={0.6} wobbleSpeed={0.8} />
          </>
        );
      default:
        return <FloatingToy position={[0, 0, 0]} color="#3b82f6" />;
    }
  };

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.3} />
        <pointLight position={[10, 10, 10]} color="#06b6d4" intensity={0.3} />

        <Suspense fallback={null}>
          {getSceneContent()}
          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.3}
            scale={8}
            blur={2}
            far={2}
          />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default ToyCreationScene;