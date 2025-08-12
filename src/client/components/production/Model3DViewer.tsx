import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Box, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface Model3DViewerProps {
  modelUrl?: string;
}

const Model3D: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <Box ref={meshRef} args={[2, 3, 2]} position={[0, 0, 0]}>
      <meshStandardMaterial color="#ff6b6b" />
    </Box>
  );
};

const Model3DViewer: React.FC<Model3DViewerProps> = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.6}>
              <Model3D />
            </Stage>
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              autoRotate
              autoRotateSpeed={2}
            />
            <Environment preset="sunset" />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">3D 模型预览</h3>
        <p className="text-sm text-gray-600 mb-4">
          拖动旋转，滚轮缩放，查看模型细节
        </p>
        
        <div className="grid grid-cols-3 gap-2">
          <motion.button
            className="text-xs bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            正视图
          </motion.button>
          <motion.button
            className="text-xs bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            侧视图
          </motion.button>
          <motion.button
            className="text-xs bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            俯视图
          </motion.button>
        </div>

        <div className="mt-4 flex gap-3">
          <motion.button
            className="flex-1 btn-secondary text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            导出 GLB
          </motion.button>
          <motion.button
            className="flex-1 btn-primary text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            导出 STL
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Model3DViewer;