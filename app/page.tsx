'use client';

import React, { Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import dynamic from 'next/dynamic';

// Dynamically import Three.js components to avoid SSR issues
const ToyCreationScene = dynamic(() => import('@/components/three/ToyCreationScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl border border-white/10 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-2">🎨</div>
        <div className="text-xs text-gray-500">Loading 3D Scene...</div>
      </div>
    </div>
  )
});

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-2">✨</div>
        <div className="text-sm text-gray-400">Loading 3D Experience...</div>
      </div>
    </div>
  )
});

interface FeatureCardProps {
  title: string;
  subtitle: string;
  features: string[];
  tagline: string;
  index: number;
  sceneType: 'creation' | 'community' | 'production';
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, subtitle, features, tagline, index, sceneType }) => {
  const isRight = index % 2 === 1;

  return (
    <motion.div
      className={`flex flex-col lg:flex-row items-center gap-12 ${isRight ? 'lg:flex-row-reverse' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <div className="flex-1 text-center lg:text-left">
        <h3 className="text-2xl lg:text-3xl font-bold mb-4">{title}</h3>
        <p className="text-lg text-gray-300 mb-6">{subtitle}</p>
        <ul className="space-y-3 mb-6">
          {features.map((feature, idx) => (
            <motion.li
              key={idx}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-200">{feature}</span>
            </motion.li>
          ))}
        </ul>
        <p className="text-blue-400 italic font-medium">{tagline}</p>
      </div>

      <div className="flex-1 max-w-md">
        <div className="aspect-square rounded-2xl border border-white/10 overflow-hidden">
          <Suspense fallback={
            <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
              <div className="text-6xl opacity-50">🎨</div>
            </div>
          }>
            <ToyCreationScene sceneType={sceneType} />
          </Suspense>
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);

  // Mobile menu state (for future mobile navigation)
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isChinese = language === 'zh';

  const handleStartCreating = () => {
    router.push('/creation');
  };

  const handleBrowseGallery = () => {
    router.push('/community');
  };

  // Cleanup effect for future mobile menu
  // useEffect(() => {
  //   const handleScroll = () => setIsMenuOpen(false);
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Background Elements */}
      <motion.div
        className="fixed inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl" />
      </motion.div>

      {/* Language Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
          className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all"
        >
          {language === 'en' ? '中文' : 'English'}
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16 lg:pt-0">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={`font-bold mb-6 ${
              isChinese
                ? 'text-3xl md:text-5xl lg:text-6xl'
                : 'text-4xl md:text-6xl lg:text-7xl'
            }`}>
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-blue-400 mb-4 font-medium">
              {t('hero.subtitle')}
            </p>
            <p className="text-base md:text-lg text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              {isChinese
                ? '结合PopMart+OnlyFans+AI的创新平台，让用户通过AI技术创造个性化IP玩具和商品，享受社区互动并连接3D打印实现实体生产。'
                : 'An innovative platform combining PopMart + OnlyFans + AI, enabling users to create personalized IP toys and merchandise through AI technology, enjoy community interactions, and connect to 3D printing for physical production.'
              }
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl font-semibold text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartCreating}
            >
              {isChinese ? '开始创作' : 'Start Creating'}
            </motion.button>
            <motion.button
              className="px-8 py-4 border-2 border-white/20 hover:border-white/40 hover:bg-white/5 rounded-xl font-semibold text-lg backdrop-blur-sm transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBrowseGallery}
            >
              {isChinese ? '浏览作品' : 'Browse Gallery'}
            </motion.button>
          </motion.div>

          {/* Hero 3D Scene */}
          <motion.div
            className="mt-12 mb-8 h-64 md:h-80 max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { value: '15,000+', label: isChinese ? '注册创作者' : 'Creators' },
              { value: '127K+', label: isChinese ? '生成设计' : 'Designs' },
              { value: '8,200+', label: isChinese ? '实体产品' : 'Products' },
              { value: isChinese ? '￥840万+' : '$1.2M+', label: isChinese ? '创作者收入' : 'Creator Earnings' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-400">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {isChinese ? '为什么选择AMIO？' : 'Why Choose AMIO?'}
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              {isChinese
                ? '从创意到收入，AMIO为创作者提供完整的AI驱动3D创作生态系统'
                : 'From concept to income, AMIO provides creators with a complete AI-powered 3D creation ecosystem'
              }
            </p>
          </motion.div>

          <div className="space-y-24">
            <FeatureCard
              title={isChinese ? "AI驱动创作" : "AI-Powered Creation"}
              subtitle={isChinese ? "通过先进AI技术，将创意转化为独特的3D设计" : "Transform your ideas into unique 3D designs with advanced AI technology"}
              features={[
                isChinese ? "智能角色分析和风格提取" : "Intelligent character analysis and style extraction",
                isChinese ? "3D词云可视化灵感展示" : "3D word cloud visualization for inspiration",
                isChinese ? "多样化材质和风格选择" : "Diverse materials and style options",
                isChinese ? "实时预览和编辑功能" : "Real-time preview and editing capabilities"
              ]}
              tagline={isChinese ? "让每个创意都成为可能" : "Making every idea possible"}
              index={0}
              sceneType="creation"
            />

            <FeatureCard
              title={isChinese ? "活跃创作社区" : "Vibrant Creator Community"}
              subtitle={isChinese ? "与全球创作者分享作品，获得支持和灵感" : "Share your work with global creators, gain support and inspiration"}
              features={[
                isChinese ? "作品展示和价值趋势追踪" : "Showcase work with value trend tracking",
                isChinese ? "代币支持和创作者经济" : "Token support and creator economy",
                isChinese ? "社交媒体集成分享" : "Social media integration sharing",
                isChinese ? "社区挑战和协作项目" : "Community challenges and collaboration"
              ]}
              tagline={isChinese ? "创作不是孤独的旅程" : "Creation is not a lonely journey"}
              index={1}
              sceneType="community"
            />

            <FeatureCard
              title={isChinese ? "实体化生产" : "Physical Production"}
              subtitle={isChinese ? "连接3D打印，将虚拟设计转化为现实产品" : "Connect to 3D printing, transform virtual designs into real products"}
              features={[
                isChinese ? "高质量3D模型生成" : "High-quality 3D model generation",
                isChinese ? "个性化定制和编辑" : "Personalized customization and editing",
                isChinese ? "多种生产材料选择" : "Multiple production material options",
                isChinese ? "全球配送和质量保证" : "Global shipping with quality assurance"
              ]}
              tagline={isChinese ? "从虚拟到现实，一步到位" : "From virtual to reality, in one step"}
              index={2}
              sceneType="production"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {isChinese ? '准备好开始创作了吗？' : 'Ready to Start Creating?'}
            </h2>
            <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
              {isChinese
                ? '加入数千名创作者的行列，用AI技术实现你的创意梦想。'
                : 'Join thousands of creators and turn your creative dreams into reality with AI technology.'
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl font-semibold text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartCreating}
              >
                {isChinese ? '立即开始' : 'Get Started Now'}
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-white/20 hover:border-white/40 hover:bg-white/5 rounded-xl font-semibold text-lg backdrop-blur-sm transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBrowseGallery}
              >
                {isChinese ? '探索作品' : 'Explore Gallery'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-bold">AMIO</div>
            <div className="text-sm text-gray-400">
              © 2024 AMIO. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}