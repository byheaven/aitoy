'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

interface TabItem {
  id: string;
  path: string;
  icon: string;
  labelKey: string;
}

const tabs: TabItem[] = [
  {
    id: 'community',
    path: '/community',
    icon: '🏛️',
    labelKey: 'nav.community',
  },
  {
    id: 'creation',
    path: '/creation',
    icon: '🎨',
    labelKey: 'nav.creation',
  },
  {
    id: 'production',
    path: '/production',
    icon: '🏭',
    labelKey: 'nav.production',
  },
];

export function TabBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();

  const handleTabClick = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-bottom z-40">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.path)}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-200 min-w-0 flex-1 ${
                isActive
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl mb-1">{tab.icon}</span>
              <span className="text-xs font-medium truncate max-w-full">
                {t(tab.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}