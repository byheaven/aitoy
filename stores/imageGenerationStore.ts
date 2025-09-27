/**
 * Zustand store for image generation state management
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GeneratedImage } from '@/lib/gemini/types';
import { generateImageId } from '@/lib/gemini/utils';

interface ImageGenerationState {
  // Current generation state
  isGenerating: boolean;
  currentImage: GeneratedImage | null;
  error: string | null;

  // Generation history
  history: GeneratedImage[];

  // User tokens
  tokens: number;

  // Generation settings
  lastUsedSettings: {
    style: string;
    material: string;
    character: string;
  };

  // Actions
  setIsGenerating: (generating: boolean) => void;
  setCurrentImage: (image: GeneratedImage | null) => void;
  setError: (error: string | null) => void;
  addToHistory: (image: GeneratedImage) => void;
  removeFromHistory: (imageId: string) => void;
  clearHistory: () => void;
  consumeTokens: (amount: number) => void;
  addTokens: (amount: number) => void;
  updateLastUsedSettings: (settings: Partial<ImageGenerationState['lastUsedSettings']>) => void;
  exportHistory: () => GeneratedImage[];
  importHistory: (history: GeneratedImage[]) => void;
}

export const useImageGenerationStore = create<ImageGenerationState>()(
  persist(
    (set, get) => ({
      // Initial state
      isGenerating: false,
      currentImage: null,
      error: null,
      history: [],
      tokens: 100, // Initial free tokens
      lastUsedSettings: {
        style: 'blindBox',
        material: 'vinyl',
        character: ''
      },

      // Actions
      setIsGenerating: (generating) => set({ isGenerating: generating }),

      setCurrentImage: (image) => set({ currentImage: image }),

      setError: (error) => set({ error }),

      addToHistory: (image) => {
        const state = get();
        const newHistory = [image, ...state.history].slice(0, 50); // Keep only last 50
        set({
          history: newHistory,
          currentImage: image,
          error: null
        });
      },

      removeFromHistory: (imageId) => {
        const state = get();
        const newHistory = state.history.filter(img => img.id !== imageId);
        set({ history: newHistory });
      },

      clearHistory: () => set({
        history: [],
        currentImage: null
      }),

      consumeTokens: (amount) => {
        const state = get();
        const newTokens = Math.max(0, state.tokens - amount);
        set({ tokens: newTokens });
      },

      addTokens: (amount) => {
        const state = get();
        const newTokens = state.tokens + amount;
        set({ tokens: newTokens });
      },

      updateLastUsedSettings: (settings) => {
        const state = get();
        set({
          lastUsedSettings: {
            ...state.lastUsedSettings,
            ...settings
          }
        });
      },

      exportHistory: () => {
        return get().history;
      },

      importHistory: (history) => {
        set({ history });
      }
    }),
    {
      name: 'amio-image-generation',
      partialize: (state) => ({
        history: state.history,
        tokens: state.tokens,
        lastUsedSettings: state.lastUsedSettings
      })
    }
  )
);

// Helper hooks
export const useGenerationHistory = () => {
  const store = useImageGenerationStore();
  return {
    history: store.history,
    addToHistory: store.addToHistory,
    removeFromHistory: store.removeFromHistory,
    clearHistory: store.clearHistory,
    exportHistory: store.exportHistory,
    importHistory: store.importHistory
  };
};

export const useTokens = () => {
  const store = useImageGenerationStore();
  return {
    tokens: store.tokens,
    consumeTokens: store.consumeTokens,
    addTokens: store.addTokens
  };
};

export const useGenerationState = () => {
  const store = useImageGenerationStore();
  return {
    isGenerating: store.isGenerating,
    currentImage: store.currentImage,
    error: store.error,
    setIsGenerating: store.setIsGenerating,
    setCurrentImage: store.setCurrentImage,
    setError: store.setError
  };
};

// Helper function to create GeneratedImage from API response
export const createGeneratedImage = (
  data: string,
  mimeType: string,
  prompt: string,
  style?: string,
  character?: string,
  tokensUsed: number = 5
): GeneratedImage => ({
  id: generateImageId(),
  data,
  mimeType,
  prompt,
  style,
  character,
  timestamp: Date.now(),
  tokensUsed
});