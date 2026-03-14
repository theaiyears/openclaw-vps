type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type MemoryStore = Map<string, RateLimitEntry>;

declare global {
  // eslint-disable-next-line no-var
  var __trendforgeRateLimitStore: MemoryStore | undefined;
}

function getStore(): MemoryStore {
  if (!globalThis.__trendforgeRateLimitStore) {
    globalThis.__trendforgeRateLimitStore = new Map<string, RateLimitEntry>();
  }
  return globalThis.__trendforgeRateLimitStore;
}

export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  return headers.get('x-real-ip') || 'unknown';
}

export function checkRateLimit(
  key: string,
  {
    max,
    windowMs
  }: {
    max: number;
    windowMs: number;
  }
): { allowed: boolean; retryAfterSec: number } {
  const store = getStore();
  const now = Date.now();
  const current = store.get(key);

  if (!current || now > current.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSec: 0 };
  }

  if (current.count >= max) {
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((current.resetAt - now) / 1000))
    };
  }

  current.count += 1;
  store.set(key, current);
  return { allowed: true, retryAfterSec: 0 };
}
