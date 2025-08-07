import React from 'react';
import { motion } from 'framer-motion';

interface Creation {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  likes: number;
  coins: number;
  price: number;
  tags: string[];
}

interface CreationCardProps {
  creation: Creation;
}

const CreationCard: React.FC<CreationCardProps> = ({ creation }) => {
  return (
    <motion.div
      className="card overflow-hidden cursor-pointer"
      whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={creation.imageUrl}
          alt={creation.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
          ¥{creation.price}
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-semibold text-sm truncate">{creation.title}</h3>
        <p className="text-xs text-gray-500 mt-1">@{creation.author}</p>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-red-500 transition-colors">
              <span>❤️</span>
              <span>{creation.likes}</span>
            </button>
            <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-yellow-500 transition-colors">
              <span>🪙</span>
              <span>{creation.coins}</span>
            </button>
          </div>
          <motion.button
            className="text-xs bg-primary-500 text-white px-3 py-1 rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            支持
          </motion.button>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {creation.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CreationCard;