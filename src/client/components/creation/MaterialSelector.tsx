import React from 'react';
import { motion } from 'framer-motion';

interface MaterialSelectorProps {
  onSelect: (material: string) => void;
}

const materials = [
  { id: 'plush', name: '毛绒', icon: '🧵', properties: ['柔软', '温暖', '适合拥抱'] },
  { id: 'vinyl', name: '搪胶', icon: '🎨', properties: ['细节丰富', '色彩鲜艳', '收藏价值'] },
  { id: 'resin', name: '树脂', icon: '💎', properties: ['精致', '耐久', '高端'] },
  { id: 'plastic', name: '塑料', icon: '🔷', properties: ['轻便', '经济', '量产'] },
  { id: 'metal', name: '金属', icon: '⚙️', properties: ['质感', '重量', '独特'] },
  { id: 'wood', name: '木质', icon: '🪵', properties: ['自然', '环保', '手工感'] }
];

const MaterialSelector: React.FC<MaterialSelectorProps> = ({ onSelect }) => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">选择材质</h2>
        <p className="text-gray-600 text-sm">不同材质带来不同的触感和视觉体验</p>
      </div>

      <div className="space-y-3">
        {materials.map((material, index) => (
          <motion.button
            key={material.id}
            onClick={() => onSelect(material.id)}
            className="w-full bg-white border-2 border-gray-100 rounded-2xl p-4 text-left hover:border-primary-300 hover:bg-primary-50 transition-all"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{material.icon}</div>
              <div className="flex-1">
                <div className="font-semibold text-base mb-1">{material.name}</div>
                <div className="flex flex-wrap gap-1">
                  {material.properties.map((prop) => (
                    <span
                      key={prop}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                    >
                      {prop}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-accent-50 to-primary-50 rounded-2xl">
        <h3 className="text-sm font-semibold mb-2">🌟 材质对比</h3>
        <div className="text-xs text-gray-600 space-y-1">
          <div>• 毛绒材质最适合制作可爱温暖的玩偶</div>
          <div>• 搪胶材质适合制作精细的收藏级手办</div>
          <div>• 树脂材质适合高端限量版产品</div>
        </div>
      </div>
    </div>
  );
};

export default MaterialSelector;