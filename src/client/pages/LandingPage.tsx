import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage, useIsChineseLanguage } from '../hooks/useLanguage';
import { LanguageToggle } from '../components/common/LanguageToggle';

interface FeatureCardProps {
  title: string;
  subtitle: string;
  features: string[];
  tagline: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, subtitle, features, tagline, index }) => {
  const isRight = index % 2 === 1;
  
  return (
    <motion.div
      className={`flex flex-col lg:flex-row items-center gap-12 ${isRight ? 'lg:flex-row-reverse' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      {/* Content */}
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
      
      {/* Placeholder for visual */}
      <div className="flex-1 max-w-md">
        <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl border border-white/10 flex items-center justify-center">
          <div className="text-6xl opacity-50">🎨</div>
        </div>
      </div>
    </motion.div>
  );
};

interface StepCardProps {
  step: {
    title: string;
    subtitle: string;
    description: string[];
    timeRequired?: string;
    tools?: string;
    avgEngagement?: string;
    communitySize?: string;
    productionTime?: string;
    revenueShare?: string;
  };
  index: number;
}

const StepCard: React.FC<StepCardProps> = ({ step, index }) => {
  return (
    <motion.div
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
          {index + 1}
        </div>
        <div>
          <h4 className="text-xl font-bold">{step.title}</h4>
          <p className="text-gray-400">{step.subtitle}</p>
        </div>
      </div>
      
      <ul className="space-y-3 mb-6">
        {step.description.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2.5 flex-shrink-0" />
            <span className="text-gray-200">{item}</span>
          </li>
        ))}
      </ul>
      
      <div className="pt-4 border-t border-white/10 space-y-2 text-sm">
        {step.timeRequired && (
          <p><span className="text-blue-400 font-medium">Time:</span> {step.timeRequired}</p>
        )}
        {step.tools && (
          <p><span className="text-blue-400 font-medium">Tools:</span> {step.tools}</p>
        )}
        {step.avgEngagement && (
          <p><span className="text-blue-400 font-medium">Engagement:</span> {step.avgEngagement}</p>
        )}
        {step.communitySize && (
          <p><span className="text-blue-400 font-medium">Community:</span> {step.communitySize}</p>
        )}
        {step.productionTime && (
          <p><span className="text-blue-400 font-medium">Production:</span> {step.productionTime}</p>
        )}
        {step.revenueShare && (
          <p><span className="text-blue-400 font-medium">Revenue:</span> {step.revenueShare}</p>
        )}
      </div>
    </motion.div>
  );
};

export const LandingPage: React.FC = () => {
  const { t } = useLanguage();
  const isChinese = useIsChineseLanguage();
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation handlers
  const handleStartCreating = () => {
    navigate('/creation');
  };

  const handleBrowseGallery = () => {
    navigate('/community');
  };

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => setIsMenuOpen(false);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      {/* Mobile Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10 lg:hidden">
        <div className="flex items-center justify-between p-4">
          <div className="text-2xl font-bold">AMIO</div>
          <div className="flex items-center gap-4">
            <LanguageToggle variant="mobile" />
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-6 h-6 flex flex-col justify-center items-center"
            >
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="bg-black/95 backdrop-blur-md border-t border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="p-4 space-y-4">
              {[
                { key: 'navigation.gallery', href: '#gallery' },
                { key: 'navigation.create', href: '#create' },
                { key: 'navigation.about', href: '#about' },
                { key: 'navigation.contact', href: '#contact' }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="block py-2 text-lg hover:text-blue-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.key)}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Desktop Language Toggle */}
      <LanguageToggle className="hidden lg:flex fixed top-6 right-6 z-50" />

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
              {t('hero.description')}
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
              {t('hero.ctaPrimary')}
            </motion.button>
            <motion.button 
              className="px-8 py-4 border-2 border-white/20 hover:border-white/40 hover:bg-white/5 rounded-xl font-semibold text-lg backdrop-blur-sm transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBrowseGallery}
            >
              {t('hero.ctaSecondary')}
            </motion.button>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
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
              title={t('valueProps.create.title')}
              subtitle={t('valueProps.create.subtitle')}
              features={[
                t('valueProps.create.features.0'),
                t('valueProps.create.features.1'),
                t('valueProps.create.features.2'),
                t('valueProps.create.features.3')
              ]}
              tagline={t('valueProps.create.tagline')}
              index={0}
            />
            
            <FeatureCard
              title={t('valueProps.community.title')}
              subtitle={t('valueProps.community.subtitle')}
              features={[
                t('valueProps.community.features.0'),
                t('valueProps.community.features.1'),
                t('valueProps.community.features.2'),
                t('valueProps.community.features.3')
              ]}
              tagline={t('valueProps.community.tagline')}
              index={1}
            />
            
            <FeatureCard
              title={t('valueProps.earn.title')}
              subtitle={t('valueProps.earn.subtitle')}
              features={[
                t('valueProps.earn.features.0'),
                t('valueProps.earn.features.1'),
                t('valueProps.earn.features.2'),
                t('valueProps.earn.features.3')
              ]}
              tagline={t('valueProps.earn.tagline')}
              index={2}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {t('howItWorks.title')}
            </h2>
            <p className="text-lg text-gray-300">
              {isChinese 
                ? '三个简单步骤，从创意到现实'
                : 'Three simple steps from idea to reality'
              }
            </p>
          </motion.div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            <StepCard
              step={{
                title: t('howItWorks.steps.create.title'),
                subtitle: t('howItWorks.steps.create.subtitle'),
                description: [
                  t('howItWorks.steps.create.description.0'),
                  t('howItWorks.steps.create.description.1'),
                  t('howItWorks.steps.create.description.2'),
                  t('howItWorks.steps.create.description.3')
                ],
                timeRequired: t('howItWorks.steps.create.timeRequired'),
                tools: t('howItWorks.steps.create.tools')
              }}
              index={0}
            />
            
            <StepCard
              step={{
                title: t('howItWorks.steps.engage.title'),
                subtitle: t('howItWorks.steps.engage.subtitle'),
                description: [
                  t('howItWorks.steps.engage.description.0'),
                  t('howItWorks.steps.engage.description.1'),
                  t('howItWorks.steps.engage.description.2'),
                  t('howItWorks.steps.engage.description.3')
                ],
                avgEngagement: t('howItWorks.steps.engage.avgEngagement'),
                communitySize: t('howItWorks.steps.engage.communitySize')
              }}
              index={1}
            />
            
            <StepCard
              step={{
                title: t('howItWorks.steps.monetize.title'),
                subtitle: t('howItWorks.steps.monetize.subtitle'),
                description: [
                  t('howItWorks.steps.monetize.description.0'),
                  t('howItWorks.steps.monetize.description.1'),
                  t('howItWorks.steps.monetize.description.2'),
                  t('howItWorks.steps.monetize.description.3')
                ],
                productionTime: t('howItWorks.steps.monetize.productionTime'),
                revenueShare: t('howItWorks.steps.monetize.revenueShare')
              }}
              index={2}
            />
          </div>
        </div>
      </section>

      {/* Creator Success Stories */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {t('success.title')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {['sarah', 'alex'].map((creatorKey, idx) => (
              <motion.div
                key={creatorKey}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl font-bold">
                    {t(`success.creators.${creatorKey}.name`).charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{t(`success.creators.${creatorKey}.name`)}</h3>
                    <p className="text-blue-400">{t(`success.creators.${creatorKey}.handle`)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div>
                    <span className="text-gray-400">Monthly Earnings</span>
                    <div className="text-2xl font-bold text-green-400">
                      {t(`success.creators.${creatorKey}.monthlyEarnings`)}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400">Community</span>
                    <div className="text-lg font-semibold">
                      {t(`success.creators.${creatorKey}.community`)}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6 italic">
                  &ldquo;{t(`success.creators.${creatorKey}.quote`)}&rdquo;
                </p>
                
                <div className="space-y-2 text-sm">
                  {Object.values(t(`success.creators.${creatorKey}.metrics`) as unknown as Record<string, string>).map((metric: string, metricIdx: number) => (
                    <div key={metricIdx} className="flex justify-between">
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-200">{metric}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
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
              {t('cta.title')}
            </h2>
            <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
              {t('cta.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <input
                type="email"
                placeholder={t('cta.form.emailPlaceholder')}
                className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl font-semibold whitespace-nowrap shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartCreating}
              >
                {t('cta.form.submitButton')}
              </motion.button>
            </div>
            
            <p className="text-sm text-gray-400">{t('cta.form.subtext')}</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-bold">AMIO</div>
            <LanguageToggle variant="footer" />
            <div className="text-sm text-gray-400">
              © 2024 AMIO. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};