import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GalleryGrid from '../components/gallery/GalleryGrid';
import TrendingSection from '../components/gallery/TrendingSection';
import FilterBar from '../components/gallery/FilterBar';

const Community: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold gradient-text">AMIO 创作社区</h1>
          <p className="text-sm text-gray-600 mt-1">发现灵感，分享创意</p>
        </div>
      </header>

      <div className="px-4 py-4">
        <TrendingSection />
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <GalleryGrid filter={activeFilter} />
      </div>
    </div>
  );
};

export default Community;