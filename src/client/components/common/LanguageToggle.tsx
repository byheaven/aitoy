import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';

interface LanguageToggleProps {
  className?: string;
  variant?: 'default' | 'mobile' | 'footer';
}

/**
 * Language toggle component for switching between English and Chinese
 * 
 * Features:
 * - Smooth animations using Framer Motion
 * - Multiple variants for different contexts
 * - Persistent language preference in localStorage
 * - Responsive design for mobile and desktop
 * - Clean toggle switch design inspired by modern UX patterns
 * 
 * Usage:
 * - Default: Top-right corner of landing page
 * - Mobile: Compact version for mobile navigation
 * - Footer: Alternative placement for footer sections
 */
export const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  className = '', 
  variant = 'default' 
}) => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'zh' : 'en';
    setLanguage(newLanguage);
  };

  const variants = {
    default: {
      container: "flex items-center gap-2 px-4 py-2 bg-black/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-black/20 transition-all duration-300",
      text: "text-sm font-medium text-white/90 hover:text-white",
      separator: "text-white/40"
    },
    mobile: {
      container: "flex items-center gap-1 px-3 py-1.5 bg-black/5 rounded-lg border border-gray-200",
      text: "text-xs font-medium text-gray-700 hover:text-gray-900",
      separator: "text-gray-400"
    },
    footer: {
      container: "flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200",
      text: "text-sm font-medium cursor-pointer hover:text-white",
      separator: "text-gray-600"
    }
  };

  const currentVariant = variants[variant];

  return (
    <motion.div
      className={`${currentVariant.container} ${className}`}
      whileHover={{ scale: variant === 'footer' ? 1 : 1.05 }}
      whileTap={{ scale: variant === 'footer' ? 1 : 0.95 }}
    >
      {/* Language Toggle Button */}
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-full"
        aria-label={`Switch to ${language === 'en' ? 'Chinese' : 'English'}`}
      >
        {/* English Option */}
        <motion.span
          className={`${currentVariant.text} ${
            language === 'en' ? 'opacity-100' : 'opacity-50'
          }`}
          animate={{
            opacity: language === 'en' ? 1 : 0.5,
            scale: language === 'en' ? 1.1 : 1
          }}
          transition={{ duration: 0.2 }}
        >
          {t('language.english')}
        </motion.span>

        {/* Separator */}
        <span className={`${currentVariant.separator} select-none`}>|</span>

        {/* Chinese Option */}
        <motion.span
          className={`${currentVariant.text} ${
            language === 'zh' ? 'opacity-100' : 'opacity-50'
          }`}
          animate={{
            opacity: language === 'zh' ? 1 : 0.5,
            scale: language === 'zh' ? 1.1 : 1
          }}
          transition={{ duration: 0.2 }}
        >
          {t('language.chinese')}
        </motion.span>
      </button>

      {/* Optional Globe Icon for Default Variant */}
      {variant === 'default' && (
        <motion.div
          className="text-white/70"
          animate={{ rotate: language === 'zh' ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
};

// Component positioning guidelines for implementation:

/**
 * POSITIONING GUIDELINES:
 * 
 * 1. Default Variant (Landing Page Header):
 *    - Position: Absolute top-right corner
 *    - Coordinates: top-4 right-4 md:top-6 md:right-6
 *    - Z-index: z-50 to ensure it's above other elements
 *    - Backdrop blur for visibility over varying backgrounds
 * 
 * 2. Mobile Variant:
 *    - Use in mobile navigation menu
 *    - Typically in hamburger menu or mobile header
 *    - Smaller size and more compact design
 * 
 * 3. Footer Variant:
 *    - Alternative placement in footer
 *    - Minimal design to match footer aesthetics
 *    - No background, just text-based toggle
 * 
 * RESPONSIVE BEHAVIOR:
 * - Desktop: Show default variant in top-right corner
 * - Mobile: Switch to mobile variant or hide in favor of menu placement
 * - Tablet: Default variant but with responsive padding adjustments
 * 
 * ACCESSIBILITY:
 * - Proper ARIA labels for screen readers
 * - Keyboard navigation support
 * - Focus indicators for accessibility compliance
 * - Clear visual feedback for current language state
 */