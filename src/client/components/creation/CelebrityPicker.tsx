import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CelebrityPickerProps {
  onSelect: (celebrity: string, domain: string) => void;
}

const celebrities = [
  { name: '泰勒·斯威夫特', domain: '音乐', avatar: '🎤' },
  { name: '勒布朗·詹姆斯', domain: '篮球', avatar: '🏀' },
  { name: '梅西', domain: '足球', avatar: '⚽' },
  { name: '马斯克', domain: '科技', avatar: '🚀' },
  { name: '奥普拉', domain: '娱乐', avatar: '🎬' },
  { name: '库里', domain: '篮球', avatar: '🏀' }
];

const domains = ['音乐', '体育', '科技', '娱乐', '艺术', '游戏'];

const CelebrityPicker: React.FC<CelebrityPickerProps> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">选择名人或角色</h2>
        <p className="text-gray-600 text-sm">选择一个名人或输入自定义角色</p>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="搜索或输入自定义角色..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">选择领域标签</h3>
        <div className="flex flex-wrap gap-2">
          {domains.map((domain) => (
            <motion.button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedDomain === domain
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {domain}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {celebrities
          .filter(c => !selectedDomain || c.domain === selectedDomain)
          .map((celebrity, index) => (
            <motion.button
              key={celebrity.name}
              onClick={() => onSelect(celebrity.name, celebrity.domain)}
              className="bg-white border-2 border-gray-100 rounded-2xl p-4 text-left hover:border-primary-300 hover:bg-primary-50 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-3xl mb-2">{celebrity.avatar}</div>
              <div className="font-medium text-sm">{celebrity.name}</div>
              <div className="text-xs text-gray-500">{celebrity.domain}</div>
            </motion.button>
          ))}
      </div>

      {searchTerm && (
        <motion.button
          onClick={() => onSelect(searchTerm, selectedDomain || '自定义')}
          className="w-full mt-4 btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          使用自定义角色: {searchTerm}
        </motion.button>
      )}
    </div>
  );
};

export default CelebrityPicker;