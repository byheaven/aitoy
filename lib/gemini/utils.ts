/**
 * Utility functions for Gemini image generation
 */

import { GeneratedImage } from './types';

/**
 * Convert file to base64 string
 */
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove data URL prefix
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Only JPEG, PNG, and WebP images are supported'
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Image size must be less than 10MB'
    };
  }

  return { valid: true };
}

/**
 * Download base64 image as file
 */
export function downloadImage(base64Data: string, filename: string, mimeType: string): void {
  try {
    // Create blob from base64
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: mimeType });
    const url = URL.createObjectURL(blob);

    // Create download link
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to download image:', error);
    throw new Error('Failed to download image');
  }
}

/**
 * Generate unique ID for images
 */
export function generateImageId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 15);
  return `img_${timestamp}_${random}`;
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Calculate estimated base64 size from image dimensions
 */
export function estimateBase64Size(width: number, height: number, quality: number = 0.8): number {
  // Rough estimate: width * height * 3 (RGB) * quality factor / 0.75 (base64 overhead)
  return Math.round((width * height * 3 * quality) / 0.75);
}

/**
 * Compress base64 image (client-side)
 */
export async function compressBase64Image(
  base64: string,
  maxWidth: number = 1024,
  maxHeight: number = 1024,
  quality: number = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      // Calculate new dimensions
      let { width, height } = img;
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      const compressedBase64 = canvas.toDataURL('image/jpeg', quality);

      // Remove data URL prefix
      const base64Data = compressedBase64.split(',')[1];
      resolve(base64Data);
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = `data:image/jpeg;base64,${base64}`;
  });
}

/**
 * Create thumbnail from base64 image
 */
export async function createThumbnail(
  base64: string,
  size: number = 150
): Promise<string> {
  return compressBase64Image(base64, size, size, 0.7);
}

/**
 * Parse toy style from string
 */
export function parseToyStyle(style: string): 'blindBox' | 'plush' | 'keychain' | 'figure' | null {
  const normalizedStyle = style.toLowerCase().replace(/[\s-_]/g, '');

  switch (normalizedStyle) {
    case 'blindbox':
    case 'blind':
    case 'box':
      return 'blindBox';
    case 'plush':
    case 'soft':
    case 'stuffed':
      return 'plush';
    case 'keychain':
    case 'key':
    case 'charm':
      return 'keychain';
    case 'figure':
    case 'action':
    case 'figurine':
      return 'figure';
    default:
      return null;
  }
}

/**
 * Format timestamp for display
 */
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString();
}

/**
 * Validate prompt content
 */
export function validatePrompt(prompt: string): { valid: boolean; error?: string } {
  if (!prompt || prompt.trim().length === 0) {
    return {
      valid: false,
      error: 'Prompt cannot be empty'
    };
  }

  if (prompt.length > 1000) {
    return {
      valid: false,
      error: 'Prompt must be less than 1000 characters'
    };
  }

  // Check for inappropriate content
  const inappropriate = ['violence', 'sexual', 'gore', 'weapon', 'drug', 'hate'];
  const lowerPrompt = prompt.toLowerCase();

  for (const word of inappropriate) {
    if (lowerPrompt.includes(word)) {
      return {
        valid: false,
        error: `Inappropriate content detected: ${word}`
      };
    }
  }

  return { valid: true };
}

/**
 * Export generation history to JSON
 */
export function exportHistory(history: GeneratedImage[]): void {
  const dataStr = JSON.stringify(history, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `amio-generation-history-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Import generation history from JSON file
 */
export async function importHistory(file: File): Promise<GeneratedImage[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        if (Array.isArray(data)) {
          resolve(data);
        } else {
          reject(new Error('Invalid history file format'));
        }
      } catch (error) {
        reject(new Error('Failed to parse history file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}