import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SketchPreviewProps {
  creationData: {
    celebrity: string;
    domain: string;
    style: string;
    material: string;
    keywords: string[];
  };
}

const SketchPreview: React.FC<SketchPreviewProps> = ({ creationData }) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [sketchUrl, setSketchUrl] = useState('');

  React.useEffect(() => {
    setTimeout(() => {
      setSketchUrl('https://via.placeholder.com/400x400');
      setIsGenerating(false);
    }, 3000);
  }, []);

  return (
    <div className="min-h-[500px]">
      {isGenerating ? (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <motion.div
            className="relative w-32 h-32 mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 border-4 border-primary-200 rounded-full" />
            <div className="absolute inset-0 border-4 border-primary-500 rounded-full border-t-transparent" />
          </motion.div>
          <h3 className="text-lg font-semibold mb-2">AI 正在创作</h3>
          <p className="text-sm text-gray-600 text-center">
            根据你的选择生成独特的设计草图...
          </p>
          <div className="mt-4 space-y-2">
            <motion.div
              className="h-2 w-48 bg-gray-200 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 3 }}
              />
            </motion.div>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 p-4">
              <img
                src={sketchUrl}
                alt="Generated sketch"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">创作完成！</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">角色</span>
                  <span className="font-medium">{creationData.celebrity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">风格</span>
                  <span className="font-medium">{creationData.style}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">材质</span>
                  <span className="font-medium">{creationData.material}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm text-gray-600 mb-2">关键词</div>
                <div className="flex flex-wrap gap-1">
                  {creationData.keywords.slice(0, 5).map((keyword) => (
                    <span
                      key={keyword}
                      className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <motion.button
              className="btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              重新生成
            </motion.button>
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              保存创作
            </motion.button>
          </div>

          <motion.button
            className="w-full mt-3 bg-gradient-to-r from-secondary-500 to-accent-500 text-white px-6 py-3 rounded-xl font-semibold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            生成3D模型 →
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default SketchPreview;