/**
 * API route for generating multiple variations of the same toy
 */

import { NextRequest, NextResponse } from 'next/server';
import { ImageGenerationService } from '@/lib/gemini/image-generator';
import { GenerateImageRequest } from '@/lib/gemini/types';
import { validatePrompt } from '@/lib/gemini/utils';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    // Get client identifier for rate limiting
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const identifier = forwardedFor?.split(',')[0] || realIp || 'anonymous';

    // Check rate limit (stricter for batch operations)
    const rateLimitResult = await rateLimit(identifier);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Too many requests',
          message: 'Rate limit exceeded. Please try again later.',
          resetTime: rateLimitResult.resetTime
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime?.toString() || '',
            'Retry-After': '900'
          }
        }
      );
    }

    // Parse request body
    const body = await req.json();
    const {
      prompt,
      style,
      character,
      material,
      referenceImage,
      language = 'en',
      count = 3,
      type = 'variations' // 'variations' or 'angles'
    } = body;

    // Validate required fields
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    // Validate count
    const maxCount = 4;
    const validCount = Math.min(Math.max(1, parseInt(count) || 3), maxCount);

    // Validate prompt content
    const promptValidation = validatePrompt(prompt);
    if (!promptValidation.valid) {
      return NextResponse.json(
        { error: promptValidation.error },
        { status: 400 }
      );
    }

    // Initialize image generation service
    const imageService = new ImageGenerationService();

    // Prepare generation request
    const generationRequest: GenerateImageRequest = {
      prompt,
      style,
      character,
      material,
      referenceImage,
      language
    };

    // Estimate total token cost
    const singleCost = imageService.estimateTokenCost(generationRequest);
    const totalEstimatedCost = singleCost * validCount;

    let results;
    let successCount = 0;
    let totalTokensUsed = 0;

    try {
      if (type === 'angles') {
        // Generate multiple angles of the same toy
        results = await imageService.generateMultiAngleViews(generationRequest);
      } else {
        // Generate variations
        results = await imageService.generateToyVariations(generationRequest, validCount);
      }

      // Count successful generations and tokens used
      for (const result of results) {
        if (result.success) {
          successCount++;
        }
        totalTokensUsed += result.tokensUsed || 0;
      }

    } catch (error) {
      console.error('Batch generation error:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to generate images',
          details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      );
    }

    // Prepare response
    const responseHeaders = {
      'X-RateLimit-Remaining': rateLimitResult.remaining?.toString() || '0',
      'X-RateLimit-Reset': rateLimitResult.resetTime?.toString() || ''
    };

    if (successCount > 0) {
      return NextResponse.json(
        {
          success: true,
          data: {
            results,
            summary: {
              total: validCount,
              successful: successCount,
              failed: validCount - successCount,
              tokensUsed: totalTokensUsed,
              estimatedCost: totalEstimatedCost
            },
            type
          }
        },
        { headers: responseHeaders }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: 'All generation attempts failed',
          data: {
            results,
            summary: {
              total: validCount,
              successful: 0,
              failed: validCount,
              tokensUsed: totalTokensUsed,
              estimatedCost: totalEstimatedCost
            }
          }
        },
        {
          status: 500,
          headers: responseHeaders
        }
      );
    }

  } catch (error) {
    console.error('API route error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Information endpoint about batch generation capabilities
  return NextResponse.json({
    service: 'gemini-batch-generation',
    capabilities: {
      maxVariations: 4,
      supportedTypes: ['variations', 'angles'],
      supportedStyles: ['blindBox', 'plush', 'keychain', 'figure'],
      supportedLanguages: ['en', 'zh']
    },
    rateLimit: {
      window: '15 minutes',
      maxRequests: 20
    },
    tokenCosts: {
      perImage: 5,
      withReference: 8,
      complexPrompt: 7
    }
  });
}