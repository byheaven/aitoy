import React from 'react';
import { motion } from 'framer-motion';

interface StyleSelectorProps {
  onSelect: (style: string) => void;
}

const styles = [
  { id: 'blindbox', name: '盲盒', icon: '📦', description: '神秘可爱的盲盒风格' },
  { id: 'plush', name: '毛绒玩具', icon: '🧸', description: '柔软温暖的毛绒风格' },
  { id: 'figure', name: '手办', icon: '🎭', description: '精致细节的手办风格' },
  { id: 'keychain', name: '钥匙扣', icon: '🔑', description: '小巧便携的挂件风格' },
  { id: 'chibi', name: 'Q版', icon: '🎨', description: '可爱萌系的Q版风格' },
  { id: 'realistic', name: '写实', icon: '📸', description: '真实还原的写实风格' }
];

const StyleSelector: React.FC<StyleSelectorProps> = ({ onSelect }) => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">选择创作风格</h2>
        <p className="text-gray-600 text-sm">选择你喜欢的玩具风格</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {styles.map((style, index) => (
          <motion.button
            key={style.id}
            onClick={() => onSelect(style.id)}
            className="bg-white border-2 border-gray-100 rounded-2xl p-4 text-left hover:border-primary-300 hover:bg-primary-50 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-3xl mb-3">{style.icon}</div>
            <div className="font-semibold text-sm mb-1">{style.name}</div>
            <div className="text-xs text-gray-500">{style.description}</div>
          </motion.button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl">
        <h3 className="text-sm font-semibold mb-2">💡 风格推荐</h3>
        <p className="text-xs text-gray-600">
          基于当前流行趋势，我们推荐选择&ldquo;盲盒&rdquo;或&ldquo;Q版&rdquo;风格，这些风格在社区中最受欢迎！
        </p>
      </div>
    </div>
  );
};

export default StyleSelector;