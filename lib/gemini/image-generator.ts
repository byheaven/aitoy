/**
 * High-level image generation service using Gemini API
 */

import { GeminiClient } from './client';
import { buildToyPrompt, sanitizePrompt, generateMultiAnglePrompts } from './prompt-templates';
import {
  GenerateImageRequest,
  GenerateImageResponse,
  GeneratedImage,
  ToyMaterial
} from './types';

export class ImageGenerationService {
  private client: GeminiClient;
  private readonly TOKENS_PER_GENERATION = 5;

  constructor() {
    this.client = new GeminiClient();
  }

  /**
   * Generate a single toy image
   */
  async generateToyImage(request: GenerateImageRequest): Promise<GenerateImageResponse> {
    try {
      // Sanitize input
      const sanitizedPrompt = sanitizePrompt(request.prompt);

      // Build enhanced prompt
      let enhancedPrompt: string;
      if (request.style && request.character) {
        enhancedPrompt = buildToyPrompt(request.character, request.style, {
          material: request.material as ToyMaterial,
          language: request.language || 'en'
        });
      } else {
        enhancedPrompt = sanitizedPrompt;
      }

      // Generate image
      let response;
      if (request.referenceImage) {
        response = await this.client.generateImageWithReference(
          enhancedPrompt,
          request.referenceImage
        );
      } else {
        response = await this.client.generateImage(enhancedPrompt);
      }

      // Extract image data
      const candidate = response.candidates[0];
      if (!candidate?.content?.parts?.[0]?.inlineData) {
        return {
          success: false,
          error: 'No image generated in response'
        };
      }

      const imageData = candidate.content.parts[0].inlineData;

      return {
        success: true,
        image: {
          data: imageData.data,
          mimeType: imageData.mimeType,
          prompt: enhancedPrompt,
          timestamp: Date.now()
        },
        tokensUsed: this.TOKENS_PER_GENERATION
      };

    } catch (error) {
      console.error('Image generation failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        tokensUsed: 0
      };
    }
  }

  /**
   * Generate multiple variations of the same toy
   */
  async generateToyVariations(
    request: GenerateImageRequest,
    count: number = 3
  ): Promise<GenerateImageResponse[]> {
    const variations = [];

    for (let i = 0; i < count; i++) {
      // Add slight variations to the prompt
      const variationRequest = {
        ...request,
        prompt: `${request.prompt} (variation ${i + 1})`
      };

      const result = await this.generateToyImage(variationRequest);
      variations.push(result);

      // Add small delay to avoid rate limiting
      if (i < count - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return variations;
  }

  /**
   * Generate multiple angles of the same toy
   */
  async generateMultiAngleViews(request: GenerateImageRequest): Promise<GenerateImageResponse[]> {
    try {
      // Build base prompt
      let basePrompt: string;
      if (request.style && request.character) {
        basePrompt = buildToyPrompt(request.character, request.style, {
          material: request.material as ToyMaterial,
          language: request.language || 'en'
        });
      } else {
        basePrompt = sanitizePrompt(request.prompt);
      }

      // Generate prompts for different angles
      const anglePrompts = generateMultiAnglePrompts(basePrompt, request.language);

      // Generate images for each angle
      const results = [];
      for (const prompt of anglePrompts) {
        const response = await this.client.generateImage(prompt);

        const candidate = response.candidates[0];
        if (candidate?.content?.parts?.[0]?.inlineData) {
          const imageData = candidate.content.parts[0].inlineData;
          results.push({
            success: true,
            image: {
              data: imageData.data,
              mimeType: imageData.mimeType,
              prompt,
              timestamp: Date.now()
            },
            tokensUsed: this.TOKENS_PER_GENERATION
          } as GenerateImageResponse);
        }

        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      return results;

    } catch (error) {
      console.error('Multi-angle generation failed:', error);
      return [{
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        tokensUsed: 0
      }];
    }
  }

  /**
   * Convert base64 image to downloadable blob URL
   */
  createImageBlob(base64Data: string, mimeType: string): string {
    try {
      // Remove data URL prefix if present
      const cleanBase64 = base64Data.replace(/^data:image\/[a-z]+;base64,/, '');

      // Convert to binary
      const binaryString = atob(cleanBase64);
      const bytes = new Uint8Array(binaryString.length);

      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Create blob
      const blob = new Blob([bytes], { type: mimeType });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Failed to create image blob:', error);
      throw new Error('Failed to process image data');
    }
  }

  /**
   * Save generated image to browser storage
   */
  saveToHistory(image: GeneratedImage): void {
    try {
      const stored = localStorage.getItem('amio-generation-history');
      const history: GeneratedImage[] = stored ? JSON.parse(stored) : [];

      // Add new image to beginning of history
      history.unshift(image);

      // Keep only last 50 images
      const trimmedHistory = history.slice(0, 50);

      localStorage.setItem('amio-generation-history', JSON.stringify(trimmedHistory));
    } catch (error) {
      console.error('Failed to save to history:', error);
    }
  }

  /**
   * Get generation history from browser storage
   */
  getHistory(): GeneratedImage[] {
    try {
      const stored = localStorage.getItem('amio-generation-history');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load history:', error);
      return [];
    }
  }

  /**
   * Clear generation history
   */
  clearHistory(): void {
    try {
      localStorage.removeItem('amio-generation-history');
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  }

  /**
   * Estimate token cost for a generation request
   */
  estimateTokenCost(request: GenerateImageRequest): number {
    let baseCost = this.TOKENS_PER_GENERATION;

    // Reference image adds cost
    if (request.referenceImage) {
      baseCost += 3;
    }

    // Complex prompts cost more
    if (request.prompt.length > 200) {
      baseCost += 2;
    }

    return baseCost;
  }

  /**
   * Test the service connection
   */
  async testService(): Promise<boolean> {
    return this.client.testConnection();
  }
}