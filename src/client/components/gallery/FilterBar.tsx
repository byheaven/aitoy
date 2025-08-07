import React from 'react';
import { motion } from 'framer-motion';

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: 'all', label: '全部', icon: '✨' },
  { id: 'trending', label: '热门', icon: '🔥' },
  { id: 'new', label: '最新', icon: '🆕' },
  { id: 'following', label: '关注', icon: '💖' }
];

const FilterBar: React.FC<FilterBarProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            activeFilter === filter.id
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>{filter.icon}</span>
          <span>{filter.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default FilterBar;