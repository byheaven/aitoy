import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Import translation files
import enTranslations from '../locales/en.json';
import zhTranslations from '../locales/zh.json';

export type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  formatCurrency: (amount: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation objects
const translations = {
  en: enTranslations,
  zh: zhTranslations
};

interface LanguageProviderProps {
  children: ReactNode;
}

/**
 * Language Provider Component
 * 
 * Provides language context throughout the application with:
 * - Language state management
 * - Translation function (t)
 * - Currency formatting based on language
 * - Browser language detection
 * - LocalStorage persistence
 * - URL-based language routing support
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  // Initialize language on component mount
  useEffect(() => {
    const initializeLanguage = () => {
      // Priority order:
      // 1. URL parameter (?lang=zh or /zh/)
      // 2. LocalStorage preference
      // 3. Browser language detection
      // 4. Default to English

      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang') as Language;
      const pathLang = window.location.pathname.startsWith('/zh') ? 'zh' : 
                     window.location.pathname.startsWith('/en') ? 'en' : null;
      const storedLang = localStorage.getItem('amio-language') as Language;
      const browserLang = navigator.language.startsWith('zh') ? 'zh' : 'en';

      const detectedLanguage = urlLang || pathLang || storedLang || browserLang;
      
      // Validate and set language
      const validLanguage = ['en', 'zh'].includes(detectedLanguage) ? detectedLanguage : 'en';
      setLanguageState(validLanguage as Language);
      
      // Update localStorage
      localStorage.setItem('amio-language', validLanguage);

      // Update document language attribute for accessibility
      document.documentElement.lang = validLanguage;
      
      // Update page title based on language
      const titles = {
        en: 'AMIO - Turn Your Ideas Into Collectible Reality',
        zh: 'AMIO - 将创意变为收藏现实'
      };
      document.title = titles[validLanguage as Language];
    };

    initializeLanguage();
  }, []);

  // Set language with persistence and side effects
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('amio-language', newLanguage);
    document.documentElement.lang = newLanguage;
    
    // Update page title
    const titles = {
      en: 'AMIO - Turn Your Ideas Into Collectible Reality',
      zh: 'AMIO - 将创意变为收藏现实'
    };
    document.title = titles[newLanguage];

    // Optional: Update URL for SEO (can be enabled if needed)
    // const newPath = newLanguage === 'zh' ? `/zh${window.location.pathname}` : 
    //                window.location.pathname.replace('/zh', '');
    // window.history.replaceState({}, '', newPath);

    // Dispatch custom event for analytics or other listeners
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: newLanguage } 
    }));
  };

  // Translation function with nested object support
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: Record<string, unknown> | string = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        const objValue = value as Record<string, unknown>;
        value = objValue[k] as Record<string, unknown> | string;
      } else {
        // Fallback to English if key not found in current language
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            const objValue = value as Record<string, unknown>;
            value = objValue[fallbackKey] as Record<string, unknown> | string;
          } else {
            console.warn(`Translation key "${key}" not found`);
            return key; // Return key as fallback
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  // Currency formatting based on language
  const formatCurrency = (amount: number): string => {
    if (language === 'zh') {
      return `￥${amount.toLocaleString('zh-CN')}`;
    }
    return `$${amount.toLocaleString('en-US')}`;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    formatCurrency
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Custom hook for accessing language context
 * 
 * Usage:
 * const { language, setLanguage, t } = useLanguage();
 * 
 * Examples:
 * - t('hero.title') // Returns translated title
 * - t('pricing.freeTier.features.0') // Returns first feature in array
 * - formatCurrency(1500) // Returns formatted currency based on language
 */
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Utility function for components that need to render different content based on language
export const useIsChineseLanguage = (): boolean => {
  const { language } = useLanguage();
  return language === 'zh';
};

// HOC for language-aware components
export function withLanguage<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  const WrappedComponent = (props: P) => (
    <Component {...props} />
  );
  WrappedComponent.displayName = `withLanguage(${Component.displayName || Component.name})`;
  return WrappedComponent;
}

export default LanguageContext;