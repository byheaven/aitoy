/**
 * Toy-specific prompt templates for Gemini image generation
 */

import { ToyStyle, ToyMaterial } from './types';

// Base templates for different toy styles
export const toyPromptTemplates = {
  blindBox: (character: string, material: ToyMaterial = 'vinyl') =>
    `Create a cute blind box collectible toy design of ${character}.
     Style: modern collectible, chibi proportions (oversized head, small body),
     adorable kawaii expression, ${material} material appearance,
     pastel color palette, high-quality collectible figure,
     clean white background with soft shadows,
     professional product photography lighting,
     3D rendered look, premium toy quality`,

  plush: (character: string, material: ToyMaterial = 'plush') =>
    `Design a huggable plush toy of ${character}.
     Material: soft ${material} fabric texture, rounded soft features,
     child-friendly design, warm and friendly expression,
     embroidered facial details, approximately 25-30cm size,
     cozy and comforting appearance, safety stitching visible,
     studio lighting against clean background`,

  keychain: (character: string, material: ToyMaterial = 'plastic') =>
    `Design a miniature keychain charm toy of ${character}.
     Material: durable ${material}, simplified but highly recognizable features,
     approximately 4-6cm size, visible keyring attachment point,
     vibrant colors that pop, cute and compact design,
     clear details despite small size, collectible quality`,

  figure: (character: string, material: ToyMaterial = 'vinyl') =>
    `Create a detailed action figure of ${character}.
     Material: high-quality ${material}, articulated pose possibilities,
     intricate sculpting details, premium collectible grade,
     dynamic action stance, approximately 15cm scale,
     professional studio lighting, display-worthy quality,
     clean background for product showcase`
};

// Chinese versions of the templates
export const toyPromptTemplatesZh = {
  blindBox: (character: string, material: ToyMaterial = 'vinyl') =>
    `创建一个可爱的${character}盲盒收藏玩具设计。
     风格：现代收藏品，Q版比例（大头小身体），
     可爱的萌系表情，${material}材质外观，
     马卡龙色调，高品质收藏手办，
     干净的白色背景与柔和阴影，
     专业产品摄影灯光，3D渲染效果，精品玩具质感`,

  plush: (character: string, material: ToyMaterial = 'plush') =>
    `设计一个可拥抱的${character}毛绒玩具。
     材质：柔软的${material}布料质感，圆润的柔和特征，
     儿童友好设计，温暖友善的表情，
     刺绣面部细节，约25-30厘米大小，
     舒适温馨的外观，可见的安全缝制，
     干净背景下的影棚灯光`,

  keychain: (character: string, material: ToyMaterial = 'plastic') =>
    `设计一个${character}的迷你钥匙扣挂件玩具。
     材质：耐用的${material}，简化但高度可识别的特征，
     约4-6厘米大小，可见的钥匙环连接点，
     鲜艳突出的颜色，可爱紧凑的设计，
     尽管尺寸小但细节清晰，收藏品质感`,

  figure: (character: string, material: ToyMaterial = 'vinyl') =>
    `创建一个精细的${character}动作手办。
     材质：高品质${material}，可动姿态设计，
     复杂的雕刻细节，精品收藏级别，
     动态动作姿态，约15厘米比例，
     专业影棚灯光，展示级品质，
     产品展示用的干净背景`
};

// Enhancement keywords for better image quality
export const enhancementKeywords = {
  quality: {
    en: 'ultra detailed, high resolution, professional product photography, studio lighting, sharp focus',
    zh: '超精细，高分辨率，专业产品摄影，影棚灯光，清晰对焦'
  },
  background: {
    en: 'clean white background, subtle shadows, product showcase setup, minimalist composition',
    zh: '干净的白色背景，细微阴影，产品展示设置，极简构图'
  },
  style: {
    en: '3D rendered, octane render quality, trending on ArtStation, photorealistic',
    zh: '3D渲染，octane渲染质量，ArtStation热门，照片般真实'
  },
  safety: {
    en: 'child-friendly, safe design, no sharp edges, appropriate for all ages, non-toxic appearance',
    zh: '儿童友好，安全设计，无尖锐边缘，适合所有年龄，无毒外观'
  }
};

// Color scheme suggestions
export const colorSchemes = {
  pastel: {
    en: 'soft pastel colors, pink and blue tones, gentle gradient',
    zh: '柔和马卡龙色，粉色和蓝色调，温和渐变'
  },
  vibrant: {
    en: 'bright vibrant colors, rainbow palette, eye-catching',
    zh: '明亮鲜艳的颜色，彩虹调色板，引人注目'
  },
  monochrome: {
    en: 'single color theme, monochromatic palette, elegant simplicity',
    zh: '单色主题，单色调色板，优雅简约'
  },
  natural: {
    en: 'natural earth tones, brown and green hues, organic feel',
    zh: '天然大地色调，棕色和绿色调，有机感觉'
  }
};

/**
 * Build enhanced prompt for toy generation
 */
export function buildToyPrompt(
  character: string,
  style: ToyStyle,
  options: {
    material?: ToyMaterial;
    colorScheme?: keyof typeof colorSchemes;
    language?: 'en' | 'zh';
    customPrompt?: string;
  } = {}
): string {
  const {
    material = 'vinyl',
    colorScheme = 'pastel',
    language = 'en',
    customPrompt
  } = options;

  // Use custom prompt if provided
  if (customPrompt) {
    const qualityKeywords = enhancementKeywords.quality[language];
    const backgroundKeywords = enhancementKeywords.background[language];
    return `${customPrompt}, ${qualityKeywords}, ${backgroundKeywords}`;
  }

  // Select template based on language
  const templates = language === 'zh' ? toyPromptTemplatesZh : toyPromptTemplates;
  const basePrompt = templates[style](character, material);

  // Add color scheme
  const colorKeywords = colorSchemes[colorScheme][language];

  // Add enhancement keywords
  const qualityKeywords = enhancementKeywords.quality[language];
  const styleKeywords = enhancementKeywords.style[language];
  const safetyKeywords = enhancementKeywords.safety[language];

  return `${basePrompt}, ${colorKeywords}, ${qualityKeywords}, ${styleKeywords}, ${safetyKeywords}`;
}

/**
 * Generate multiple angle prompts for the same toy
 */
export function generateMultiAnglePrompts(
  basePrompt: string,
  language: 'en' | 'zh' = 'en'
): string[] {
  const angles = language === 'zh'
    ? ['正面视角', '侧面轮廓', '背面视角', '3/4角度视角']
    : ['front view', 'side profile', 'back view', '3/4 angle view'];

  return angles.map(angle => `${basePrompt}, ${angle}`);
}

/**
 * Validate and sanitize user input for prompts
 */
export function sanitizePrompt(input: string): string {
  // Remove potentially harmful content
  const banned = ['violent', 'sexual', 'gore', 'weapon', 'drug'];
  const sanitized = input.toLowerCase();

  for (const word of banned) {
    if (sanitized.includes(word)) {
      throw new Error(`Inappropriate content detected: ${word}`);
    }
  }

  // Limit length
  if (input.length > 1000) {
    throw new Error('Prompt too long (max 1000 characters)');
  }

  return input.trim();
}