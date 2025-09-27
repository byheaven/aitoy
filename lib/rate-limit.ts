/**
 * Simple in-memory rate limiting for API endpoints
 */

interface RateLimitEntry {
  timestamps: number[];
  resetTime: number;
}

class RateLimiter {
  private cache = new Map<string, RateLimitEntry>();
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(windowMs: number = 60000, maxRequests: number = 10) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;

    // Clean up old entries every 5 minutes
    setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  check(identifier: string): { success: boolean; resetTime?: number; remaining?: number } {
    const now = Date.now();
    const entry = this.cache.get(identifier);

    if (!entry) {
      // First request for this identifier
      this.cache.set(identifier, {
        timestamps: [now],
        resetTime: now + this.windowMs
      });
      return {
        success: true,
        remaining: this.maxRequests - 1,
        resetTime: now + this.windowMs
      };
    }

    // Remove timestamps outside the window
    const windowStart = now - this.windowMs;
    entry.timestamps = entry.timestamps.filter(ts => ts > windowStart);

    if (entry.timestamps.length >= this.maxRequests) {
      // Rate limit exceeded
      return {
        success: false,
        resetTime: entry.resetTime,
        remaining: 0
      };
    }

    // Add current timestamp
    entry.timestamps.push(now);
    entry.resetTime = now + this.windowMs;

    return {
      success: true,
      remaining: this.maxRequests - entry.timestamps.length,
      resetTime: entry.resetTime
    };
  }

  private cleanup(): void {
    const now = Date.now();
    const entries = Array.from(this.cache.entries());
    for (const [key, entry] of entries) {
      if (entry.resetTime < now) {
        this.cache.delete(key);
      }
    }
  }

  // Get current status without affecting rate limit
  status(identifier: string): { remaining: number; resetTime: number } {
    const now = Date.now();
    const entry = this.cache.get(identifier);

    if (!entry) {
      return {
        remaining: this.maxRequests,
        resetTime: now + this.windowMs
      };
    }

    const windowStart = now - this.windowMs;
    const validTimestamps = entry.timestamps.filter(ts => ts > windowStart);

    return {
      remaining: Math.max(0, this.maxRequests - validTimestamps.length),
      resetTime: entry.resetTime
    };
  }
}

// Global rate limiter instance
const rateLimiter = new RateLimiter(
  parseInt(process.env.RATE_LIMIT_WINDOW || '900000'), // 15 minutes default
  parseInt(process.env.RATE_LIMIT_MAX || '20') // 20 requests default
);

export async function rateLimit(identifier: string) {
  return rateLimiter.check(identifier);
}

export function getRateLimitStatus(identifier: string) {
  return rateLimiter.status(identifier);
}