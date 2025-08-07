import React from 'react';
import { motion } from 'framer-motion';

interface Customizations {
  eyeStyle: string;
  mouthStyle: string;
  accessories: string[];
}

interface FaceCustomizerProps {
  customizations: Customizations;
  onUpdate: (customizations: Customizations) => void;
}

const eyeStyles = [
  { id: 'default', name: '默认', icon: '👀' },
  { id: 'cute', name: '可爱', icon: '🥺' },
  { id: 'cool', name: '酷炫', icon: '😎' },
  { id: 'sleepy', name: '困倦', icon: '😴' },
  { id: 'star', name: '星星眼', icon: '🤩' },
  { id: 'heart', name: '爱心眼', icon: '😍' }
];

const mouthStyles = [
  { id: 'default', name: '默认', icon: '😊' },
  { id: 'smile', name: '微笑', icon: '🙂' },
  { id: 'laugh', name: '大笑', icon: '😄' },
  { id: 'cute', name: '可爱', icon: '😚' },
  { id: 'tongue', name: '吐舌', icon: '😛' },
  { id: 'cat', name: '猫嘴', icon: '😸' }
];

const accessories = [
  { id: 'hat', name: '帽子', icon: '🧢' },
  { id: 'glasses', name: '眼镜', icon: '👓' },
  { id: 'bow', name: '蝴蝶结', icon: '🎀' },
  { id: 'crown', name: '皇冠', icon: '👑' },
  { id: 'headphones', name: '耳机', icon: '🎧' },
  { id: 'necklace', name: '项链', icon: '📿' }
];

const FaceCustomizer: React.FC<FaceCustomizerProps> = ({ customizations, onUpdate }) => {
  const handleEyeChange = (eyeStyle: string) => {
    onUpdate({ ...customizations, eyeStyle });
  };

  const handleMouthChange = (mouthStyle: string) => {
    onUpdate({ ...customizations, mouthStyle });
  };

  const handleAccessoryToggle = (accessoryId: string) => {
    const newAccessories = customizations.accessories.includes(accessoryId)
      ? customizations.accessories.filter(a => a !== accessoryId)
      : [...customizations.accessories, accessoryId];
    onUpdate({ ...customizations, accessories: newAccessories });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-6">
          <div className="text-center">
            <div className="text-8xl mb-2">🎨</div>
            <p className="text-sm text-gray-600">实时预览区域</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-sm mb-3">眼睛样式</h3>
            <div className="grid grid-cols-3 gap-2">
              {eyeStyles.map((style) => (
                <motion.button
                  key={style.id}
                  onClick={() => handleEyeChange(style.id)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    customizations.eyeStyle === style.id
                      ? 'bg-primary-100 border-2 border-primary-500'
                      : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-2xl mb-1">{style.icon}</div>
                  <div className="text-xs">{style.name}</div>
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">嘴巴样式</h3>
            <div className="grid grid-cols-3 gap-2">
              {mouthStyles.map((style) => (
                <motion.button
                  key={style.id}
                  onClick={() => handleMouthChange(style.id)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    customizations.mouthStyle === style.id
                      ? 'bg-primary-100 border-2 border-primary-500'
                      : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-2xl mb-1">{style.icon}</div>
                  <div className="text-xs">{style.name}</div>
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">配饰</h3>
            <div className="grid grid-cols-3 gap-2">
              {accessories.map((accessory) => (
                <motion.button
                  key={accessory.id}
                  onClick={() => handleAccessoryToggle(accessory.id)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    customizations.accessories.includes(accessory.id)
                      ? 'bg-accent-100 border-2 border-accent-500'
                      : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-2xl mb-1">{accessory.icon}</div>
                  <div className="text-xs">{accessory.name}</div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <motion.button
          className="w-full mt-6 btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          应用定制
        </motion.button>
      </div>
    </div>
  );
};

export default FaceCustomizer;