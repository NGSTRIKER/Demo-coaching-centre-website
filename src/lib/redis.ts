import { Redis } from "@upstash/redis";

// In-memory fallback cache
const memoryCache = new Map<string, { val: any; expiresAt: number }>();

let redisClient: Redis | null = null;

export function getRedis(): Redis | null {
  if (process.env.REDIS_ENABLED === "false") return null;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) return null;

  if (!redisClient) {
    try {
      redisClient = new Redis({
        url,
        token,
      });
    } catch (e) {
      console.warn("Failed to initialize Upstash Redis client:", e);
      return null;
    }
  }

  return redisClient;
}

/**
 * Get cached item with automatic fallback
 */
export async function cacheGet<T = any>(key: string): Promise<T | null> {
  const redis = getRedis();
  if (redis) {
    try {
      const data = await redis.get<T>(key);
      return data;
    } catch (err) {
      console.warn("Redis GET error, falling back to memory:", err);
    }
  }

  // Memory fallback
  const item = memoryCache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiresAt) {
    memoryCache.delete(key);
    return null;
  }
  return item.val as T;
}

/**
 * Set cached item with TTL in seconds
 */
export async function cacheSet(key: string, value: any, ttlSeconds: number = 86400): Promise<void> {
  const redis = getRedis();
  if (redis) {
    try {
      await redis.set(key, value, { ex: ttlSeconds });
      return;
    } catch (err) {
      console.warn("Redis SET error, saving to memory fallback:", err);
    }
  }

  // Memory fallback
  memoryCache.set(key, {
    val: value,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });
}

/**
 * Rate limit check per IP/user
 * Max requests in windowSeconds
 */
export async function checkRateLimit(
  identifier: string,
  limit: number = 30,
  windowSeconds: number = 60
): Promise<{ allowed: boolean; remaining: number }> {
  const key = `ratelimit:${identifier}`;
  const redis = getRedis();

  if (redis) {
    try {
      const current = await redis.incr(key);
      if (current === 1) {
        await redis.expire(key, windowSeconds);
      }
      return {
        allowed: current <= limit,
        remaining: Math.max(0, limit - current),
      };
    } catch (err) {
      console.warn("Redis rate limit fallback:", err);
    }
  }

  // In-memory rate limiting fallback
  const now = Date.now();
  const entry = memoryCache.get(key);
  let count = 1;

  if (entry && now < entry.expiresAt) {
    count = (entry.val as number) + 1;
    memoryCache.set(key, { val: count, expiresAt: entry.expiresAt });
  } else {
    memoryCache.set(key, { val: 1, expiresAt: now + windowSeconds * 1000 });
  }

  return {
    allowed: count <= limit,
    remaining: Math.max(0, limit - count),
  };
}
