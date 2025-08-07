import React from 'react';
import { motion } from 'framer-motion';

const trendingItems = [
  { id: '1', title: 'LABUBU风格', icon: '🎨', count: '2.3k' },
  { id: '2', title: '赛博朋克', icon: '🤖', count: '1.8k' },
  { id: '3', title: '毛绒玩具', icon: '🧸', count: '3.1k' },
  { id: '4', title: '手办模型', icon: '🎭', count: '956' }
];

const TrendingSection: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold">🔥 热门趋势</h2>
        <button className="text-sm text-primary-500 font-medium">查看全部</button>
      </div>
      
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {trendingItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex-shrink-0"
          >
            <motion.button
              className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100 rounded-2xl px-4 py-3 flex flex-col items-center min-w-[90px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium text-gray-700">{item.title}</span>
              <span className="text-xs text-gray-500 mt-1">{item.count}</span>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;