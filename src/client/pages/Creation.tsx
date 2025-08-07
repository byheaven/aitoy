import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CelebrityPicker from '../components/creation/CelebrityPicker';
import StyleSelector from '../components/creation/StyleSelector';
import MaterialSelector from '../components/creation/MaterialSelector';
import SketchPreview from '../components/creation/SketchPreview';
import WordCloud3D from '../components/creation/WordCloud3D';

type CreationStep = 'celebrity' | 'wordcloud' | 'style' | 'material' | 'preview';

const Creation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<CreationStep>('celebrity');
  const [creationData, setCreationData] = useState({
    celebrity: '',
    domain: '',
    style: '',
    material: '',
    keywords: [] as string[]
  });

  const steps = [
    { id: 'celebrity', label: '选择角色', icon: '👤' },
    { id: 'wordcloud', label: '词云分析', icon: '☁️' },
    { id: 'style', label: '选择风格', icon: '🎨' },
    { id: 'material', label: '选择材质', icon: '🧵' },
    { id: 'preview', label: '生成预览', icon: '✨' }
  ];

  const handleNext = () => {
    const stepOrder: CreationStep[] = ['celebrity', 'wordcloud', 'style', 'material', 'preview'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const stepOrder: CreationStep[] = ['celebrity', 'wordcloud', 'style', 'material', 'preview'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold gradient-text">AI 创作工坊</h1>
          <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  step.id === currentStep
                    ? 'bg-primary-500 text-white'
                    : steps.indexOf(steps.find(s => s.id === currentStep)!) > index
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                <span>{step.icon}</span>
                <span>{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="px-4 py-6">
        <AnimatePresence mode="wait">
          {currentStep === 'celebrity' && (
            <motion.div
              key="celebrity"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <CelebrityPicker
                onSelect={(celebrity, domain) => {
                  setCreationData({ ...creationData, celebrity, domain });
                  handleNext();
                }}
              />
            </motion.div>
          )}

          {currentStep === 'wordcloud' && (
            <motion.div
              key="wordcloud"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <WordCloud3D
                celebrity={creationData.celebrity}
                domain={creationData.domain}
                onComplete={(keywords) => {
                  setCreationData({ ...creationData, keywords });
                  handleNext();
                }}
              />
            </motion.div>
          )}

          {currentStep === 'style' && (
            <motion.div
              key="style"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <StyleSelector
                onSelect={(style) => {
                  setCreationData({ ...creationData, style });
                  handleNext();
                }}
              />
            </motion.div>
          )}

          {currentStep === 'material' && (
            <motion.div
              key="material"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <MaterialSelector
                onSelect={(material) => {
                  setCreationData({ ...creationData, material });
                  handleNext();
                }}
              />
            </motion.div>
          )}

          {currentStep === 'preview' && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <SketchPreview creationData={creationData} />
            </motion.div>
          )}
        </AnimatePresence>

        {currentStep !== 'celebrity' && currentStep !== 'preview' && (
          <div className="fixed bottom-24 left-4 right-4 flex gap-3">
            <motion.button
              onClick={handleBack}
              className="flex-1 btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              返回
            </motion.button>
            <motion.button
              onClick={handleNext}
              className="flex-1 btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              下一步
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Creation;