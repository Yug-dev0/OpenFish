/**
 * Exponential Backoff Utility for Agent Automation
 */

export interface RetryOptions {
  maxAttempts?: number;
  initialDelayMs?: number;
  backoffFactor?: number;
}

export async function withRetry<T>(
  operation: (attempt: number) => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const maxAttempts = options.maxAttempts ?? 3;
  let delay = options.initialDelayMs ?? 1000;
  const factor = options.backoffFactor ?? 2;

  let lastError: any;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation(attempt);
    } catch (err) {
      lastError = err;
      if (attempt === maxAttempts) break;
      await new Promise(r => setTimeout(r, delay));
      delay *= factor;
    }
  }
  throw lastError;
}
