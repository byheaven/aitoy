import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CreationCard from './CreationCard';

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

const mockCreations: Creation[] = [
  {
    id: '1',
    title: 'Cyber Bunny',
    author: '创作者A',
    imageUrl: 'https://via.placeholder.com/300x400',
    likes: 234,
    coins: 45,
    price: 299,
    tags: ['赛博朋克', '兔子', '潮玩']
  },
  {
    id: '2',
    title: 'Dream Cat',
    author: '设计师B',
    imageUrl: 'https://via.placeholder.com/300x350',
    likes: 567,
    coins: 89,
    price: 399,
    tags: ['梦幻', '猫咪', '毛绒']
  },
  {
    id: '3',
    title: 'Space Explorer',
    author: '艺术家C',
    imageUrl: 'https://via.placeholder.com/300x450',
    likes: 123,
    coins: 23,
    price: 199,
    tags: ['太空', '探险家', '手办']
  },
  {
    id: '4',
    title: 'Retro Robot',
    author: '创作者D',
    imageUrl: 'https://via.placeholder.com/300x380',
    likes: 890,
    coins: 156,
    price: 599,
    tags: ['复古', '机器人', '限量']
  },
  {
    id: '5',
    title: 'Fantasy Dragon',
    author: '设计师E',
    imageUrl: 'https://via.placeholder.com/300x420',
    likes: 456,
    coins: 78,
    price: 499,
    tags: ['奇幻', '龙', '收藏']
  },
  {
    id: '6',
    title: 'Kawaii Bear',
    author: '艺术家F',
    imageUrl: 'https://via.placeholder.com/300x360',
    likes: 678,
    coins: 112,
    price: 349,
    tags: ['可爱', '熊', '盲盒']
  }
];

interface GalleryGridProps {
  filter: string;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ filter }) => {
  const [creations, setCreations] = useState<Creation[]>(mockCreations);

  useEffect(() => {
    if (filter === 'trending') {
      setCreations([...mockCreations].sort((a, b) => b.likes - a.likes));
    } else if (filter === 'new') {
      setCreations([...mockCreations].reverse());
    } else {
      setCreations(mockCreations);
    }
  }, [filter]);

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {creations.map((creation, index) => (
        <motion.div
          key={creation.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <CreationCard creation={creation} />
        </motion.div>
      ))}
    </div>
  );
};

export default GalleryGrid;