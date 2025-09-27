/**
 * TypeScript interfaces for Gemini image generation API
 */

export interface GenerateImageRequest {
  prompt: string;
  style?: 'blindBox' | 'plush' | 'keychain' | 'figure';
  character?: string;
  material?: string;
  referenceImage?: string; // Base64 encoded reference image
  language?: 'en' | 'zh';
}

export interface GenerateImageResponse {
  success: boolean;
  image?: {
    data: string; // Base64 encoded image
    mimeType: string;
    prompt: string;
    timestamp: number;
  };
  error?: string;
  tokensUsed?: number;
}

export interface GeminiAPIResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        inlineData?: {
          mimeType: string;
          data: string;
        };
        text?: string;
      }>;
    };
    finishReason?: string;
    index?: number;
  }>;
}

export interface GeneratedImage {
  id: string;
  data: string; // Base64 encoded
  mimeType: string;
  prompt: string;
  style?: string;
  character?: string;
  timestamp: number;
  tokensUsed: number;
}

export interface GeminiConfig {
  apiKey: string;
  model: string;
  baseUrl: string;
}

export type ToyStyle = 'blindBox' | 'plush' | 'keychain' | 'figure';
export type ToyMaterial = 'vinyl' | 'plush' | 'resin' | 'fabric' | 'plastic';

export interface EnhancedPromptOptions {
  style: ToyStyle;
  character: string;
  material?: ToyMaterial;
  colorScheme?: string;
  size?: 'small' | 'medium' | 'large';
  language?: 'en' | 'zh';
}