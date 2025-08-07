import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Model3DViewer from '../components/production/Model3DViewer';
import FaceCustomizer from '../components/production/FaceCustomizer';
import OrderForm from '../components/production/OrderForm';
import PriceCalculator from '../components/production/PriceCalculator';

type ProductionTab = 'view' | 'customize' | 'order';

const Production: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProductionTab>('view');
  const [modelData, setModelData] = useState({
    modelUrl: '',
    customizations: {
      eyeStyle: 'default',
      mouthStyle: 'default',
      accessories: [] as string[]
    }
  });

  const tabs = [
    { id: 'view', label: '3D预览', icon: '👁️' },
    { id: 'customize', label: '定制外观', icon: '🎨' },
    { id: 'order', label: '下单生产', icon: '🏭' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold gradient-text">3D 生产中心</h1>
          <div className="flex gap-2 mt-3">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ProductionTab)}
                className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </header>

      <div className="px-4 py-6">
        {activeTab === 'view' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Model3DViewer modelUrl={modelData.modelUrl} />
            <PriceCalculator customizations={modelData.customizations} />
          </motion.div>
        )}

        {activeTab === 'customize' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <FaceCustomizer
              customizations={modelData.customizations}
              onUpdate={(customizations) => setModelData({ ...modelData, customizations })}
            />
          </motion.div>
        )}

        {activeTab === 'order' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <OrderForm modelData={modelData} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Production;