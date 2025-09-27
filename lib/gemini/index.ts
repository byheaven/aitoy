/**
 * Gemini image generation module exports
 */

// Core classes
export { GeminiClient } from './client';
export { ImageGenerationService } from './image-generator';

// Types
export type {
  GenerateImageRequest,
  GenerateImageResponse,
  GeneratedImage,
  GeminiAPIResponse,
  GeminiConfig,
  ToyStyle,
  ToyMaterial,
  EnhancedPromptOptions
} from './types';

// Prompt building functions
export {
  toyPromptTemplates,
  toyPromptTemplatesZh,
  enhancementKeywords,
  colorSchemes,
  buildToyPrompt,
  generateMultiAnglePrompts,
  sanitizePrompt
} from './prompt-templates';

// Utility functions
export {
  fileToBase64,
  validateImageFile,
  downloadImage,
  generateImageId,
  formatFileSize,
  estimateBase64Size,
  compressBase64Image,
  createThumbnail,
  parseToyStyle,
  formatTimestamp,
  validatePrompt,
  exportHistory,
  importHistory
} from './utils';

// Note: ImageGenerationService should be instantiated in components or API routes as needed