'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define language types
export type Language = 'en' | 'zh';

// Language context interface
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  en: {
    'hero.title': 'Create Your Dream Toys with AI',
    'hero.subtitle': 'Transform ideas into unique 3D collectibles using cutting-edge AI technology',
    'hero.cta': 'Start Creating',
    'nav.community': 'Community',
    'nav.creation': 'Creation',
    'nav.production': 'Production',
    'auth.signIn': 'Sign In',
    'auth.signUp': 'Sign Up',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
  },
  zh: {
    'hero.title': '用 AI 创造您梦想的玩具',
    'hero.subtitle': '使用尖端 AI 技术将想法转化为独特的 3D 收藏品',
    'hero.cta': '开始创作',
    'nav.community': '社区',
    'nav.creation': '创作',
    'nav.production': '生产',
    'auth.signIn': '登录',
    'auth.signUp': '注册',
    'common.loading': '加载中...',
    'common.error': '发生错误',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('en');

  // Load language from localStorage on client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('amio-language') as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh')) {
        setLanguageState(savedLanguage);
      }
    }
  }, []);

  // Update localStorage when language changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amio-language', lang);
    }
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}