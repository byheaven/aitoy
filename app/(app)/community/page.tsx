'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CommunityPage() {
  const { t, language } = useLanguage();
  const isChinese = language === 'zh';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {t('nav.community')}
          </h1>
          <p className="text-gray-600 mt-2">
            {isChinese
              ? '探索来自全球创作者的精彩作品'
              : 'Discover amazing creations from creators worldwide'
            }
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium">
              {isChinese ? '全部' : 'All'}
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              {isChinese ? '趋势' : 'Trending'}
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              {isChinese ? '最新' : 'Latest'}
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              {isChinese ? '最受欢迎' : 'Most Popular'}
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample Creation Cards */}
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <span className="text-4xl">🎨</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {isChinese ? '创作标题' : 'Creation Title'} {i + 1}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {isChinese ? '创作者名称' : 'Creator Name'}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>❤️</span>
                    <span>{Math.floor(Math.random() * 100) + 10}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary-600 font-medium">
                    <span>💎</span>
                    <span>{Math.floor(Math.random() * 50) + 5}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors">
            {isChinese ? '加载更多' : 'Load More'}
          </button>
        </div>
      </main>
    </div>
  );
}