'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GenerateImageRequest, ToyStyle, ToyMaterial } from '@/lib/gemini/types';
import { validatePrompt } from '@/lib/gemini/utils';

interface ImageGeneratorProps {
  onImageGenerated?: (imageData: string, prompt: string) => void;
  onError?: (error: string) => void;
  className?: string;
}

export default function ImageGenerator({
  onImageGenerated,
  onError,
  className = ''
}: ImageGeneratorProps) {
  const { language } = useLanguage();
  const isChinese = language === 'zh';

  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<ToyStyle>('blindBox');
  const [selectedMaterial, setSelectedMaterial] = useState<ToyMaterial>('vinyl');
  const [character, setCharacter] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [lastPrompt, setLastPrompt] = useState('');

  const styles = [
    {
      id: 'blindBox' as ToyStyle,
      name: isChinese ? '盲盒' : 'Blind Box',
      icon: '📦',
      description: isChinese ? 'Q版可爱风格' : 'Chibi cute style'
    },
    {
      id: 'plush' as ToyStyle,
      name: isChinese ? '毛绒玩具' : 'Plush Toy',
      icon: '🧸',
      description: isChinese ? '柔软温暖质感' : 'Soft warm texture'
    },
    {
      id: 'keychain' as ToyStyle,
      name: isChinese ? '钥匙扣' : 'Keychain',
      icon: '🔑',
      description: isChinese ? '迷你精致设计' : 'Mini exquisite design'
    },
    {
      id: 'figure' as ToyStyle,
      name: isChinese ? '手办' : 'Figure',
      icon: '🎭',
      description: isChinese ? '精细收藏品质' : 'Fine collectible quality'
    },
  ];

  const materials = [
    { id: 'vinyl' as ToyMaterial, name: isChinese ? 'PVC塑料' : 'PVC Plastic' },
    { id: 'plush' as ToyMaterial, name: isChinese ? '毛绒布料' : 'Plush Fabric' },
    { id: 'resin' as ToyMaterial, name: isChinese ? '树脂材质' : 'Resin Material' },
    { id: 'fabric' as ToyMaterial, name: isChinese ? '布料材质' : 'Fabric Material' },
    { id: 'plastic' as ToyMaterial, name: isChinese ? '塑料材质' : 'Plastic Material' },
  ];

  const handleGenerate = async () => {
    // Validate prompt
    const validation = validatePrompt(prompt);
    if (!validation.valid) {
      onError?.(validation.error || 'Invalid prompt');
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const request: GenerateImageRequest = {
        prompt,
        style: selectedStyle,
        character,
        material: selectedMaterial,
        language
      };

      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const result = await response.json();

      if (result.success && result.data) {
        const imageData = result.data.data;
        setGeneratedImage(imageData);
        setLastPrompt(result.data.prompt);
        onImageGenerated?.(imageData, result.data.prompt);
      } else {
        throw new Error(result.error || 'Generation failed');
      }
    } catch (error) {
      console.error('Generation error:', error);
      onError?.(error instanceof Error ? error.message : 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateVariations = async () => {
    if (!generatedImage) return;

    setIsGenerating(true);

    try {
      const request = {
        prompt,
        style: selectedStyle,
        character,
        material: selectedMaterial,
        language,
        count: 3,
        type: 'variations'
      };

      const response = await fetch('/api/generate-variations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const result = await response.json();

      if (result.success && result.data?.results) {
        // Show the first successful variation
        const firstSuccess = result.data.results.find((r: { success: boolean; image?: { data: string; prompt: string } }) => r.success);
        if (firstSuccess?.image) {
          setGeneratedImage(firstSuccess.image.data);
          onImageGenerated?.(firstSuccess.image.data, firstSuccess.image.prompt);
        }
      } else {
        throw new Error(result.error || 'Variation generation failed');
      }
    } catch (error) {
      console.error('Variation error:', error);
      onError?.(error instanceof Error ? error.message : 'Variation generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Character Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isChinese ? '角色描述' : 'Character Description'}
        </label>
        <input
          type="text"
          value={character}
          onChange={(e) => setCharacter(e.target.value)}
          placeholder={isChinese ? '例如：熊猫宇航员' : 'e.g.: Panda astronaut'}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Style Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {isChinese ? '玩具风格' : 'Toy Style'}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {styles.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                selectedStyle === style.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-2">{style.icon}</div>
              <div className="font-medium text-sm">{style.name}</div>
              <div className="text-xs text-gray-500 mt-1">{style.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Material Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isChinese ? '材质选择' : 'Material Choice'}
        </label>
        <select
          value={selectedMaterial}
          onChange={(e) => setSelectedMaterial(e.target.value as ToyMaterial)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {materials.map((material) => (
            <option key={material.id} value={material.id}>
              {material.name}
            </option>
          ))}
        </select>
      </div>

      {/* Custom Prompt */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isChinese ? '详细描述（可选）' : 'Detailed Description (Optional)'}
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={isChinese
            ? '添加更多细节描述，如颜色、表情、姿态等...'
            : 'Add more details like colors, expressions, poses...'
          }
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        />
        <div className="text-xs text-gray-500 mt-1">
          {prompt.length}/1000 {isChinese ? '字符' : 'characters'}
        </div>
      </div>

      {/* Generation Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !character}
          className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {isChinese ? '生成中...' : 'Generating...'}
            </>
          ) : (
            <>
              ✨ {isChinese ? '生成图片' : 'Generate Image'}
            </>
          )}
        </button>

        {generatedImage && (
          <button
            onClick={handleGenerateVariations}
            disabled={isGenerating}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            🔄 {isChinese ? '变体' : 'Variations'}
          </button>
        )}
      </div>

      {/* Generated Image Preview */}
      {generatedImage && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3">
            {isChinese ? '生成结果' : 'Generated Result'}
          </h3>
          <div className="relative">
            <img
              src={`data:image/png;base64,${generatedImage}`}
              alt="Generated toy design"
              className="w-full max-w-md mx-auto rounded-lg shadow-md"
            />
          </div>
          {lastPrompt && (
            <div className="mt-3 p-3 bg-white rounded border">
              <div className="text-xs font-medium text-gray-500 mb-1">
                {isChinese ? '使用的提示词：' : 'Generated with prompt:'}
              </div>
              <div className="text-sm text-gray-700 break-words">
                {lastPrompt}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}