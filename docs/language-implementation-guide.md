# AMIO多语言实现指南
# AMIO Language Implementation Guide

## 概览 | Overview

此指南提供了在AMIO落地页中实现中英文双语切换的完整实施方案。

This guide provides a complete implementation plan for Chinese-English bilingual switching in the AMIO landing page.

---

## 文件结构 | File Structure

```
src/client/
├── locales/
│   ├── en.json                 # English translations
│   └── zh.json                 # Chinese translations
├── contexts/
│   └── LanguageContext.tsx     # Language context provider
├── hooks/
│   └── useLanguage.ts          # Language hook for components
├── components/
│   └── common/
│       └── LanguageToggle.tsx  # Language toggle component
└── pages/
    └── LandingPage.tsx         # Main landing page component

docs/
├── landing-page-content.md     # Original English content
├── landing-page-content-zh.md # Chinese content version
└── language-implementation-guide.md # This guide
```

---

## 实施步骤 | Implementation Steps

### 1. 安装依赖 | Install Dependencies

```bash
# If not already installed
npm install framer-motion  # For smooth animations
```

### 2. 应用程序设置 | App Setup

在您的主要`App.tsx`文件中包装LanguageProvider：

Wrap your main `App.tsx` file with the LanguageProvider:

```tsx
// src/client/App.tsx
import { LanguageProvider } from './contexts/LanguageContext';
import { LandingPage } from './pages/LandingPage';

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <LandingPage />
      </div>
    </LanguageProvider>
  );
}

export default App;
```

### 3. 创建落地页组件 | Create Landing Page Component

```tsx
// src/client/pages/LandingPage.tsx
import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { LanguageToggle } from '../components/common/LanguageToggle';

export const LandingPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Language Toggle - Top Right Corner */}
      <LanguageToggle className="absolute top-4 right-4 md:top-6 md:right-6 z-50" />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-4">
            {t('hero.subtitle')}
          </p>
          <p className="text-base md:text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
            {t('hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
              {t('hero.ctaPrimary')}
            </button>
            <button className="px-8 py-3 border border-white/20 hover:bg-white/10 rounded-lg font-semibold transition-colors">
              {t('hero.ctaSecondary')}
            </button>
          </div>
        </div>
      </section>

      {/* Additional sections using translation keys */}
      {/* ... */}
    </div>
  );
};
```

### 4. 响应式设计实施 | Responsive Design Implementation

```tsx
// Mobile-optimized language toggle
const MobileHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="flex items-center justify-between p-4">
        <div className="text-xl font-bold">AMIO</div>
        
        {/* Mobile Language Toggle */}
        <div className="flex items-center gap-4">
          <LanguageToggle variant="mobile" />
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
          >
            {/* Hamburger menu icon */}
          </button>
        </div>
      </div>
    </header>
  );
};
```

---

## 翻译键使用指南 | Translation Key Usage Guide

### 基本用法 | Basic Usage

```tsx
const { t } = useLanguage();

// Simple string
<h1>{t('hero.title')}</h1>

// Array access
<p>{t('pricing.freeTier.features.0')}</p>

// Nested objects
<span>{t('success.creators.sarah.name')}</span>
```

### 动态内容 | Dynamic Content

```tsx
const { t, formatCurrency } = useLanguage();

// Currency formatting
<span>{formatCurrency(1500)}</span> 
// Returns: "$1,500" (EN) or "￥1,500" (ZH)

// Conditional rendering based on language
const { language } = useLanguage();
{language === 'zh' && <ChineseSpecificComponent />}
```

---

## SEO优化 | SEO Optimization

### 1. 语言标签 | Language Tags

```html
<!-- Automatically set by LanguageProvider -->
<html lang="en"> <!-- or lang="zh" -->
```

### 2. 元数据 | Meta Tags

```tsx
// Optional: Add to document head
useEffect(() => {
  const metaDescription = t('meta.description');
  const existingMeta = document.querySelector('meta[name="description"]');
  if (existingMeta) {
    existingMeta.setAttribute('content', metaDescription);
  }
}, [language]);
```

### 3. URL路由 | URL Routing

```tsx
// Optional: URL-based language routing
// Enable in LanguageContext.tsx by uncommenting URL update section
// URLs will be: example.com/en or example.com/zh
```

---

## 样式指南 | Styling Guidelines

### Tailwind CSS类 | Tailwind CSS Classes

```tsx
// Language-aware font sizing for Chinese characters
const textClasses = {
  en: "text-4xl md:text-6xl",
  zh: "text-3xl md:text-5xl" // Slightly smaller for Chinese
};

<h1 className={`font-bold ${textClasses[language]}`}>
  {t('hero.title')}
</h1>
```

### 字体优化 | Font Optimization

```css
/* globals.css - Add Chinese font support */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Chinese font stack */
.font-chinese {
  font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

/* Mixed language support */
body {
  font-family: 'Inter', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
}
```

---

## 性能优化 | Performance Optimizations

### 1. 懒加载翻译 | Lazy Load Translations

```tsx
// Optional: For larger applications, load translations dynamically
const loadTranslations = async (language: Language) => {
  const translations = await import(`../locales/${language}.json`);
  return translations.default;
};
```

### 2. 缓存优化 | Caching

```tsx
// Translation caching is handled automatically by the module system
// LocalStorage caches user language preference
```

---

## 测试指南 | Testing Guidelines

### 1. 功能测试 | Functional Tests

```tsx
// Test language switching
it('should switch language when toggle is clicked', () => {
  render(<App />);
  const toggle = screen.getByRole('button', { name: /switch to/i });
  fireEvent.click(toggle);
  expect(screen.getByText('将创意变为收藏现实')).toBeInTheDocument();
});
```

### 2. 翻译覆盖测试 | Translation Coverage

```tsx
// Ensure all translation keys exist
const checkTranslationKeys = (enKeys: object, zhKeys: object) => {
  // Recursive key comparison logic
};
```

---

## 部署注意事项 | Deployment Considerations

### 1. 静态资源 | Static Assets

```json
// package.json - build script considerations
{
  "scripts": {
    "build": "react-scripts build && npm run generate-sitemap",
    "generate-sitemap": "node scripts/generate-multilingual-sitemap.js"
  }
}
```

### 2. CDN配置 | CDN Configuration

```javascript
// Ensure proper caching for translation files
// Cache translation JSON files with appropriate headers
```

---

## 故障排除 | Troubleshooting

### 常见问题 | Common Issues

1. **翻译键未找到 | Translation key not found**
   ```
   Warning: Translation key "hero.title" not found
   Solution: Check JSON file structure and key naming
   ```

2. **字体显示问题 | Font rendering issues**
   ```
   Chinese characters appear as boxes
   Solution: Add Chinese font stack to CSS
   ```

3. **持久性问题 | Persistence issues**
   ```
   Language resets on page refresh
   Solution: Check localStorage implementation
   ```

### 调试工具 | Debug Tools

```tsx
// Add to development environment
const LanguageDebugger: React.FC = () => {
  const { language, t } = useLanguage();
  
  if (process.env.NODE_ENV !== 'development') return null;
  
  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-4 rounded-lg z-50">
      <p>Current Language: {language}</p>
      <p>Sample Translation: {t('hero.title')}</p>
      <p>localStorage: {localStorage.getItem('amio-language')}</p>
    </div>
  );
};
```

---

## 未来扩展 | Future Enhancements

### 1. 更多语言支持 | Additional Language Support

```tsx
// Easy to extend for more languages
type Language = 'en' | 'zh' | 'ja' | 'ko' | 'es';

const translations = {
  en: enTranslations,
  zh: zhTranslations,
  ja: jaTranslations, // Japanese
  ko: koTranslations, // Korean
  es: esTranslations  // Spanish
};
```

### 2. RTL语言支持 | RTL Language Support

```tsx
// For future RTL languages like Arabic
const isRTL = ['ar', 'he', 'fa'].includes(language);
<div dir={isRTL ? 'rtl' : 'ltr'}>
```

### 3. 动态翻译 | Dynamic Translations

```tsx
// Integration with translation services
const useTranslationAPI = () => {
  // Google Translate API integration
  // Real-time translation updates
};
```

---

## 最佳实践总结 | Best Practices Summary

### 开发最佳实践 | Development Best Practices

1. **一致的键命名** | Consistent key naming
   - 使用点记法 | Use dot notation: `section.subsection.key`
   - 描述性命名 | Descriptive names: `hero.title` not `h1`

2. **翻译文件结构** | Translation file structure  
   - 按页面/组件分组 | Group by page/component
   - 保持嵌套层级一致 | Maintain consistent nesting levels

3. **性能考虑** | Performance considerations
   - 避免过度渲染 | Avoid excessive re-renders
   - 合理使用useCallback | Use useCallback appropriately

4. **用户体验** | User Experience
   - 平滑过渡动画 | Smooth transition animations  
   - 保持布局稳定 | Maintain layout stability
   - 响应式设计 | Responsive design

### 维护指南 | Maintenance Guidelines

1. **定期审查翻译** | Regular translation review
2. **更新文档** | Keep documentation updated
3. **性能监控** | Monitor performance impact
4. **用户反馈收集** | Collect user feedback

---

*此实施指南提供了完整的双语落地页解决方案。按照这些步骤，您将拥有一个功能完整、用户友好的多语言AMIO落地页。*

*This implementation guide provides a complete bilingual landing page solution. Following these steps, you'll have a fully functional, user-friendly multilingual AMIO landing page.*