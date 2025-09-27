/**
 * Gemini AI client for image generation
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiConfig, GeminiAPIResponse } from './types';

export class GeminiClient {
  private client: GoogleGenerativeAI;
  private config: GeminiConfig;

  constructor() {
    // Validate environment variables
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }

    this.config = {
      apiKey,
      model: process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image-preview',
      baseUrl: process.env.GEMINI_API_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta'
    };

    this.client = new GoogleGenerativeAI(apiKey);
  }

  /**
   * Generate image from text prompt
   */
  async generateImage(prompt: string): Promise<GeminiAPIResponse> {
    try {
      const model = this.client.getGenerativeModel({
        model: this.config.model
      });

      const result = await model.generateContent({
        contents: [{
          role: 'user',
          parts: [{
            text: prompt
          }]
        }]
      });

      const response = await result.response;

      // Transform response to match our interface
      const candidates = response.candidates?.map(candidate => ({
        content: {
          parts: candidate.content.parts.map(part => ({
            inlineData: part.inlineData ? {
              mimeType: part.inlineData.mimeType || 'image/png',
              data: part.inlineData.data
            } : undefined,
            text: part.text
          }))
        },
        finishReason: candidate.finishReason,
        index: candidate.index
      })) || [];

      return { candidates };
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error(`Failed to generate image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generate image with reference image (image-to-image)
   */
  async generateImageWithReference(
    prompt: string,
    referenceImage: string,
    mimeType: string = 'image/png'
  ): Promise<GeminiAPIResponse> {
    try {
      const model = this.client.getGenerativeModel({
        model: this.config.model
      });

      const result = await model.generateContent({
        contents: [{
          role: 'user',
          parts: [
            {
              inlineData: {
                mimeType,
                data: referenceImage
              }
            },
            {
              text: prompt
            }
          ]
        }]
      });

      const response = await result.response;

      // Transform response to match our interface
      const candidates = response.candidates?.map(candidate => ({
        content: {
          parts: candidate.content.parts.map(part => ({
            inlineData: part.inlineData ? {
              mimeType: part.inlineData.mimeType || 'image/png',
              data: part.inlineData.data
            } : undefined,
            text: part.text
          }))
        },
        finishReason: candidate.finishReason,
        index: candidate.index
      })) || [];

      return { candidates };
    } catch (error) {
      console.error('Gemini API error with reference:', error);
      throw new Error(`Failed to generate image with reference: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get model configuration
   */
  getConfig(): GeminiConfig {
    return { ...this.config };
  }

  /**
   * Test API connection
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.generateImage('test image generation');
      return true;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
}