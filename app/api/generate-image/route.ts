/**
 * API route for Gemini image generation
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

    // Check rate limit
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
            'Retry-After': '900' // 15 minutes
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
      language = 'en'
    }: GenerateImageRequest = body;

    // Validate required fields
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

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

    // Estimate token cost
    const estimatedCost = imageService.estimateTokenCost(generationRequest);

    // Generate image
    const result = await imageService.generateToyImage(generationRequest);

    // Add rate limit headers to successful responses
    const responseHeaders = {
      'X-RateLimit-Remaining': rateLimitResult.remaining?.toString() || '0',
      'X-RateLimit-Reset': rateLimitResult.resetTime?.toString() || ''
    };

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          data: result.image,
          tokensUsed: result.tokensUsed,
          estimatedCost
        },
        { headers: responseHeaders }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          tokensUsed: result.tokensUsed || 0
        },
        {
          status: 500,
          headers: responseHeaders
        }
      );
    }

  } catch (error) {
    console.error('API route error:', error);

    // Check if it's a specific API error
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'API configuration error' },
          { status: 500 }
        );
      }

      if (error.message.includes('quota') || error.message.includes('billing')) {
        return NextResponse.json(
          { error: 'Service temporarily unavailable' },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Health check endpoint
  try {
    const imageService = new ImageGenerationService();
    const isHealthy = await imageService.testService();

    return NextResponse.json({
      status: 'ok',
      service: 'gemini-image-generation',
      healthy: isHealthy,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        service: 'gemini-image-generation',
        healthy: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}