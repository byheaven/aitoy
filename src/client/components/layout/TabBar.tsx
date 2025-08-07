import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface TabItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

const tabs: TabItem[] = [
  { id: 'community', label: '社区', icon: '🏠', path: '/community' },
  { id: 'creation', label: '创作', icon: '✨', path: '/creation' },
  { id: 'production', label: '生产', icon: '🎯', path: '/production' }
];

const TabBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-bottom z-50">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center justify-center flex-1 h-full relative ${
              isActive(tab.path) ? 'text-primary-500' : 'text-gray-500'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {isActive(tab.path) && (
              <motion.div
                layoutId="activeTab"
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary-500 rounded-b-full"
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="text-2xl mb-1">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TabBar;