import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface WordCloud3DProps {
  celebrity: string;
  domain: string;
  onComplete: (keywords: string[]) => void;
}

const WordCloud3D: React.FC<WordCloud3DProps> = ({ celebrity, domain, onComplete }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [keywords, setKeywords] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      const mockKeywords = [
        '创新', '领袖', '才华', '成功', '激情',
        '专注', '卓越', '影响力', '突破', '传奇',
        '坚持', '梦想', '勇气', '智慧', '独特'
      ];
      setKeywords(mockKeywords);
      setIsAnalyzing(false);
    }, 2000);
  }, []);

  const handleComplete = () => {
    onComplete(keywords);
  };

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center">
      {isAnalyzing ? (
        <div className="text-center">
          <motion.div
            className="w-24 h-24 mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full rounded-full border-4 border-primary-200 border-t-primary-500" />
          </motion.div>
          <h3 className="text-lg font-semibold mb-2">AI 正在分析</h3>
          <p className="text-sm text-gray-600">正在分析 {celebrity} 的特征...</p>
        </div>
      ) : (
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-4 text-center">关键词云</h3>
          <div className="relative h-64 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 overflow-hidden">
            {keywords.map((keyword, index) => {
              const size = Math.random() * 20 + 14;
              const x = Math.random() * 70 + 10;
              const y = Math.random() * 70 + 10;
              const colors = ['text-primary-500', 'text-secondary-500', 'text-accent-500', 'text-purple-500', 'text-pink-500'];
              const color = colors[index % colors.length];
              
              return (
                <motion.span
                  key={keyword}
                  className={`absolute font-medium ${color}`}
                  style={{
                    fontSize: `${size}px`,
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.2 }}
                >
                  {keyword}
                </motion.span>
              );
            })}
          </div>
          
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">选中的关键词</h4>
            <div className="flex flex-wrap gap-2">
              {keywords.slice(0, 5).map((keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <motion.button
            onClick={handleComplete}
            className="w-full mt-6 btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            继续下一步
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default WordCloud3D;