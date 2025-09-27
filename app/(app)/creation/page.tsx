'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ImageGenerator from '@/components/creation/ImageGenerator';
import { useImageGenerationStore, createGeneratedImage } from '@/stores/imageGenerationStore';

export default function CreationPage() {
  const { t, language } = useLanguage();
  const isChinese = language === 'zh';
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCharacter] = useState('');
  const [selectedStyle] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Image generation store
  const { addToHistory, consumeTokens, tokens } = useImageGenerationStore();

  // Handle image generation
  const handleImageGenerated = (imageData: string, prompt: string) => {
    setGeneratedImage(imageData);
    setGenerationError(null);

    // Create and save to history
    const generatedImageObj = createGeneratedImage(
      imageData,
      'image/png',
      prompt,
      selectedStyle,
      selectedCharacter,
      5
    );
    addToHistory(generatedImageObj);
    consumeTokens(5);
  };

  const handleGenerationError = (error: string) => {
    setGenerationError(error);
    setGeneratedImage(null);
  };

  const steps = [
    {
      id: 1,
      title: isChinese ? '选择角色' : 'Choose Character',
      description: isChinese ? '选择一个名人或角色作为创作基础' : 'Select a celebrity or character as your creation base',
    },
    {
      id: 2,
      title: isChinese ? '风格设置' : 'Style Settings',
      description: isChinese ? '选择材质、风格和设计偏好' : 'Choose materials, styles, and design preferences',
    },
    {
      id: 3,
      title: isChinese ? 'AI生成设计' : 'AI Generate Design',
      description: isChinese ? '使用AI生成独特的玩具设计' : 'Use AI to generate unique toy designs',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {t('nav.creation')}
              </h1>
              <p className="text-gray-600 mt-2">
                {isChinese
                  ? '使用AI技术创作独特的3D玩具设计'
                  : 'Create unique 3D toy designs with AI technology'
                }
              </p>
            </div>

            {/* Token Display */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg px-4 py-2">
              <div className="text-sm font-medium text-primary-600">
                {isChinese ? '剩余代币' : 'Tokens'}
              </div>
              <div className="text-xl font-bold text-primary-700">
                ✨ {tokens}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  currentStep >= step.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {step.id}
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">{step.title}</p>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 w-24 mx-8 ${
                    currentStep > step.id ? 'bg-primary-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {isChinese ? '选择角色或名人' : 'Select Character or Celebrity'}
              </h2>

              {/* Search Bar */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder={isChinese ? '搜索名人、角色或输入描述...' : 'Search celebrities, characters, or enter description...'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Popular Categories */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  {isChinese ? '热门分类' : 'Popular Categories'}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: isChinese ? '动漫角色' : 'Anime Characters', icon: '🎭' },
                    { name: isChinese ? '电影明星' : 'Movie Stars', icon: '🎬' },
                    { name: isChinese ? '运动员' : 'Athletes', icon: '🏆' },
                    { name: isChinese ? '历史人物' : 'Historical Figures', icon: '📚' },
                  ].map((category, index) => (
                    <button
                      key={index}
                      className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                    >
                      <div className="text-2xl mb-2">{category.icon}</div>
                      <div className="text-sm font-medium text-gray-900">{category.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sample Characters */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  {isChinese ? '推荐角色' : 'Recommended Characters'}
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {Array.from({ length: 6 }, (_, i) => (
                    <button
                      key={i}
                      className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                    >
                      <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-2">
                        <span className="text-2xl">👤</span>
                      </div>
                      <div className="text-xs font-medium text-gray-900">
                        {isChinese ? '角色' : 'Character'} {i + 1}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {isChinese ? '设计风格和材质' : 'Design Style and Materials'}
              </h2>

              <div className="space-y-6">
                {/* Style Selection */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {isChinese ? '玩具风格' : 'Toy Style'}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: isChinese ? '盲盒' : 'Blind Box', icon: '📦' },
                      { name: isChinese ? '毛绒玩具' : 'Plush Toy', icon: '🧸' },
                      { name: isChinese ? '钥匙扣' : 'Keychain', icon: '🔑' },
                      { name: isChinese ? '手办' : 'Figure', icon: '🎭' },
                    ].map((style, index) => (
                      <button
                        key={index}
                        className="p-4 bg-gray-50 hover:bg-primary-50 border-2 border-gray-200 hover:border-primary-300 rounded-lg transition-colors"
                      >
                        <div className="text-2xl mb-2">{style.icon}</div>
                        <div className="text-sm font-medium">{style.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Material Selection */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {isChinese ? '材质选择' : 'Material Choice'}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { name: isChinese ? 'PVC塑料' : 'PVC Plastic', desc: isChinese ? '光滑表面，细节丰富' : 'Smooth surface, rich details' },
                      { name: isChinese ? '毛绒布料' : 'Plush Fabric', desc: isChinese ? '柔软触感，温馨可爱' : 'Soft touch, warm and cute' },
                      { name: isChinese ? '树脂材质' : 'Resin Material', desc: isChinese ? '高档质感，收藏价值' : 'Premium texture, collectible value' },
                    ].map((material, index) => (
                      <button
                        key={index}
                        className="p-4 bg-gray-50 hover:bg-primary-50 border-2 border-gray-200 hover:border-primary-300 rounded-lg text-left transition-colors"
                      >
                        <div className="font-medium text-gray-900 mb-1">{material.name}</div>
                        <div className="text-sm text-gray-600">{material.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {isChinese ? 'AI生成设计' : 'AI Generate Design'}
              </h2>

              {/* Error Message */}
              {generationError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="text-red-600 font-medium">
                      ❌ {isChinese ? '生成失败' : 'Generation Failed'}
                    </div>
                  </div>
                  <div className="text-red-700 mt-1 text-sm">
                    {generationError}
                  </div>
                </div>
              )}

              {/* Token Warning */}
              {tokens < 5 && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="text-yellow-600 font-medium">
                      ⚠️ {isChinese ? '代币不足' : 'Insufficient Tokens'}
                    </div>
                  </div>
                  <div className="text-yellow-700 mt-1 text-sm">
                    {isChinese
                      ? '您需要至少5个代币来生成图片。请稍后再试或获取更多代币。'
                      : 'You need at least 5 tokens to generate an image. Please try again later or earn more tokens.'
                    }
                  </div>
                </div>
              )}

              {/* Image Generator Component */}
              <ImageGenerator
                onImageGenerated={handleImageGenerated}
                onError={handleGenerationError}
              />
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isChinese ? '上一步' : 'Previous'}
            </button>

            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                {isChinese ? '下一步' : 'Next'}
              </button>
            ) : (
              <button
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  generatedImage
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
                disabled={!generatedImage}
              >
                {generatedImage
                  ? (isChinese ? '保存创作 ✅' : 'Save Creation ✅')
                  : (isChinese ? '先生成设计' : 'Generate Design First')
                }
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}