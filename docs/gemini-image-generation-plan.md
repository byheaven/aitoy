# Google Gemini Image Generation Integration Plan

## 📋 Overview
Integration of Google Gemini's `gemini-2.5-flash-image-preview` model to enable AI-powered image generation for toy designs in the AMIO platform.

## 🎯 Objectives
- Enable users to generate toy designs from text prompts
- Support multiple toy styles (blind box, plush, keychain, figure)
- Integrate seamlessly with existing creation workflow
- Implement token-based consumption system
- Provide bilingual support (Chinese/English)

## 📚 Technical Stack
- **Model**: `gemini-2.5-flash-image-preview`
- **SDK**: `@google/generative-ai` (official Google AI SDK)
- **API Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent`
- **Authentication**: API Key-based
- **Response Format**: Base64-encoded PNG images with SynthID watermark

## 🛠️ Implementation Phases

### Phase 1: Backend Setup & API Integration

#### 1.1 Install Dependencies
```bash
npm install @google/generative-ai
npm install --save-dev @types/node
```

#### 1.2 Environment Configuration
Add to `.env.local`:
```env
GEMINI_API_KEY=your_api_key_here
GEMINI_IMAGE_MODEL=gemini-2.5-flash-image-preview
GEMINI_API_BASE_URL=https://generativelanguage.googleapis.com/v1beta
```

Update `.env.example`:
```env
# Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key
GEMINI_IMAGE_MODEL=gemini-2.5-flash-image-preview
GEMINI_API_BASE_URL=https://generativelanguage.googleapis.com/v1beta
```

#### 1.3 API Service Layer Structure
```
lib/
└── gemini/
    ├── client.ts           # Gemini client initialization
    ├── image-generator.ts  # Image generation service
    ├── prompt-templates.ts # Toy-specific prompt templates
    ├── types.ts           # TypeScript interfaces
    └── utils.ts           # Helper functions
```

#### 1.4 Core Service Implementation

**lib/gemini/types.ts**
```typescript
export interface GenerateImageRequest {
  prompt: string;
  style?: 'blindBox' | 'plush' | 'keychain' | 'figure';
  character?: string;
  material?: string;
  reference?: string; // Base64 encoded reference image
}

export interface GenerateImageResponse {
  imageData: string; // Base64 encoded image
  mimeType: string;
  prompt: string;
  timestamp: number;
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
  }>;
}
```

**lib/gemini/client.ts**
```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiClient {
  private client: GoogleGenerativeAI;
  private model: string;

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    this.client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image-preview';
  }

  async generateImage(prompt: string): Promise<any> {
    const model = this.client.getGenerativeModel({ model: this.model });
    const result = await model.generateContent(prompt);
    return result.response;
  }
}
```

### Phase 2: Frontend Integration

#### 2.1 Component Structure
```
components/
└── creation/
    ├── ImageGenerator.tsx       # Main generation interface
    ├── PromptBuilder.tsx        # Prompt construction helper
    ├── GeneratedImagePreview.tsx # Image display & actions
    ├── StyleTemplates.tsx       # Pre-defined styles
    └── GenerationHistory.tsx    # Previous generations
```

#### 2.2 UI Integration Points

**Update Creation Page (app/(app)/creation/page.tsx)**
- Replace placeholder in Step 3 with actual generation interface
- Add prompt input field
- Add style selector
- Display generated images
- Add save/regenerate actions

#### 2.3 State Management

**stores/imageGenerationStore.ts**
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GenerationState {
  history: GeneratedImage[];
  currentGeneration: GeneratedImage | null;
  isGenerating: boolean;
  tokens: number;
  addToHistory: (image: GeneratedImage) => void;
  setCurrentGeneration: (image: GeneratedImage | null) => void;
  setIsGenerating: (status: boolean) => void;
  consumeTokens: (amount: number) => void;
}

export const useGenerationStore = create<GenerationState>()(
  persist(
    (set) => ({
      history: [],
      currentGeneration: null,
      isGenerating: false,
      tokens: 100, // Initial free tokens
      // ... store methods
    }),
    {
      name: 'image-generation-storage',
    }
  )
);
```

### Phase 3: Toy-Specific Features

#### 3.1 Prompt Templates

**lib/gemini/prompt-templates.ts**
```typescript
export const toyPromptTemplates = {
  blindBox: (character: string, style: string = 'modern') =>
    `Create a cute blind box collectible toy design of ${character}.
     Style: ${style}, chibi proportions (big head, small body),
     adorable kawaii expression, pastel colors,
     high-quality vinyl toy appearance,
     clean white background with soft shadows,
     professional product photography lighting,
     3D rendered look, collectible figure quality`,

  plush: (character: string, material: string = 'soft velvet') =>
    `Design a huggable plush toy of ${character}.
     Material: ${material} fabric texture,
     rounded soft features, child-friendly design,
     warm and friendly expression, embroidered details,
     approximately 30cm size reference,
     cozy and comforting appearance`,

  keychain: (character: string) =>
    `Design a miniature keychain toy charm of ${character}.
     Simplified but highly recognizable features,
     durable acrylic or metal design,
     visible keyring attachment,
     approximately 5cm size, cute and compact,
     vibrant colors that pop`,

  figure: (character: string, style: string = 'anime') =>
    `Create a detailed collectible action figure of ${character}.
     Style: ${style}, articulated pose possibilities,
     high detail sculpting, premium collectible quality,
     dynamic action pose, display base included,
     professional studio lighting,
     1:12 scale reference`
};

// Enhancement modifiers for better results
export const enhancementKeywords = {
  quality: 'ultra detailed, high resolution, professional product photography, studio lighting',
  background: 'clean white background, subtle shadows, product showcase setup',
  style: '3D rendered, octane render quality, trending on ArtStation',
  safety: 'child-friendly, safe design, no sharp edges, appropriate for all ages'
};
```

#### 3.2 Multi-Angle Generation
```typescript
export const generateMultipleViews = async (basePrompt: string) => {
  const views = ['front view', 'side profile', 'back view', '3/4 angle'];
  const promises = views.map(view =>
    generateImage(`${basePrompt}, ${view}`)
  );
  return Promise.all(promises);
};
```

### Phase 4: API Route Implementation

#### 4.1 API Endpoint

**app/api/generate-image/route.ts**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { GeminiClient } from '@/lib/gemini/client';
import { toyPromptTemplates } from '@/lib/gemini/prompt-templates';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    // Rate limiting check
    const identifier = req.ip ?? 'anonymous';
    const { success } = await rateLimit(identifier);

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { prompt, style, character, material } = body;

    // Build enhanced prompt
    let enhancedPrompt = prompt;
    if (style && character) {
      enhancedPrompt = toyPromptTemplates[style](character, material);
    }

    // Generate image
    const client = new GeminiClient();
    const response = await client.generateImage(enhancedPrompt);

    // Extract image data
    const imageData = response.candidates[0]?.content?.parts[0]?.inlineData;

    if (!imageData) {
      throw new Error('No image generated');
    }

    // Return response
    return NextResponse.json({
      success: true,
      image: {
        data: imageData.data,
        mimeType: imageData.mimeType,
        prompt: enhancedPrompt,
        timestamp: Date.now()
      }
    });

  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
```

### Phase 5: Safety & Performance

#### 5.1 Content Safety
- Gemini's built-in safety filters
- Custom prompt validation
- Age-appropriate content enforcement
- Prohibited content list

#### 5.2 Rate Limiting
```typescript
// lib/rate-limit.ts
import { LRUCache } from 'lru-cache';

const rateLimitMap = new LRUCache<string, number[]>({
  max: 1000,
  ttl: 60000, // 1 minute
});

export async function rateLimit(identifier: string, limit = 10) {
  const now = Date.now();
  const timestamps = rateLimitMap.get(identifier) || [];
  const recentTimestamps = timestamps.filter(t => now - t < 60000);

  if (recentTimestamps.length >= limit) {
    return { success: false };
  }

  recentTimestamps.push(now);
  rateLimitMap.set(identifier, recentTimestamps);
  return { success: true };
}
```

#### 5.3 Caching Strategy
- Cache identical prompts for 24 hours
- Store in Redis or local memory cache
- Serve cached results to save API calls

### Phase 6: Testing & Deployment

#### 6.1 Test Cases
- [ ] Generate image with text prompt
- [ ] Generate with style templates
- [ ] Handle API errors gracefully
- [ ] Validate rate limiting
- [ ] Test bilingual prompts
- [ ] Verify token consumption
- [ ] Test image display and saving

#### 6.2 Performance Metrics
- Average generation time: < 3 seconds
- Success rate target: > 95%
- API cost per image: ~$0.002
- Cache hit rate target: > 30%

#### 6.3 Monitoring
- API usage tracking
- Error rate monitoring
- User satisfaction metrics
- Token consumption analytics

## 📊 Token Economy Integration

### Consumption Rates
- Text-to-image generation: 5 tokens
- Multi-angle generation: 15 tokens
- Style variations: 10 tokens
- High-resolution export: 10 tokens

### Token Rewards
- Daily login: 10 tokens
- Share creation: 5 tokens
- Community likes (per 10): 5 tokens
- First creation: 20 tokens bonus

## 🚀 Deployment Checklist

### Pre-deployment
- [ ] API key configured
- [ ] Environment variables set
- [ ] Rate limiting tested
- [ ] Error handling verified
- [ ] Bilingual support confirmed

### Post-deployment
- [ ] Monitor API usage
- [ ] Track generation success rate
- [ ] Collect user feedback
- [ ] Optimize prompt templates
- [ ] Adjust rate limits if needed

## 📝 API Usage Examples

### Basic Text-to-Image
```bash
curl -X POST http://localhost:3000/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "cute robot toy with big eyes",
    "style": "blindBox"
  }'
```

### With Character and Material
```bash
curl -X POST http://localhost:3000/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{
    "character": "panda astronaut",
    "style": "plush",
    "material": "soft cotton"
  }'
```

## 🔒 Security Considerations

1. **API Key Protection**
   - Never expose API key to frontend
   - Use server-side API routes only
   - Implement request signing if needed

2. **User Authentication**
   - Require user login for generation
   - Track usage per user
   - Implement user quotas

3. **Content Moderation**
   - Log all generation requests
   - Implement reporting system
   - Manual review for flagged content

## 📈 Success Metrics

- **Week 1**: 100+ images generated
- **Week 2**: 500+ images, 50+ active users
- **Month 1**: 5000+ images, 200+ users
- **Quarter 1**: 50,000+ images, 1000+ users

## 🔄 Future Enhancements

1. **Advanced Features**
   - Image-to-image transformation
   - Style mixing from multiple references
   - Animation generation (when available)
   - 3D model generation from images

2. **Community Features**
   - Prompt sharing marketplace
   - Style preset library
   - Collaborative generation
   - Generation contests

3. **Business Features**
   - Premium generation tiers
   - Bulk generation API
   - White-label solutions
   - Enterprise accounts

## 📞 Support & Resources

- **Gemini API Docs**: https://ai.google.dev/gemini-api/docs
- **SDK Reference**: https://www.npmjs.com/package/@google/generative-ai
- **Rate Limits**: 60 requests per minute (free tier)
- **Support**: gemini-api-support@google.com

## 🏁 Getting Started

1. Obtain Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Set up environment variables
3. Install dependencies: `npm install @google/generative-ai`
4. Implement backend service
5. Update frontend UI
6. Test generation flow
7. Deploy to production

---

**Document Version**: 1.0.0
**Last Updated**: 2025-01-27
**Author**: AMIO Development Team
**Status**: Ready for Implementation