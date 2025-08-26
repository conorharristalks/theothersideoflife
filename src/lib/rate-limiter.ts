interface AttemptRecord {
  count: number;
  firstAttempt: number;
  blockedUntil?: number;
}

class RateLimiter {
  private attempts = new Map<string, AttemptRecord>();
  private readonly maxAttempts: number;
  private readonly windowMs: number;
  private readonly blockDurationMs: number;

  constructor(
    maxAttempts = 5, 
    windowMs = 15 * 60 * 1000, // 15 minutes
    blockDurationMs = 30 * 60 * 1000 // 30 minutes
  ) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
    this.blockDurationMs = blockDurationMs;
    
    // Clean up old entries every 10 minutes
    setInterval(() => this.cleanup(), 10 * 60 * 1000);
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, record] of this.attempts.entries()) {
      // Remove records that are beyond the window and not blocked
      if (!record.blockedUntil && (now - record.firstAttempt) > this.windowMs) {
        this.attempts.delete(key);
      }
      // Remove records where block period has expired
      else if (record.blockedUntil && now > record.blockedUntil) {
        this.attempts.delete(key);
      }
    }
  }

  isBlocked(identifier: string): boolean {
    const record = this.attempts.get(identifier);
    if (!record) return false;

    const now = Date.now();
    
    // Check if currently blocked
    if (record.blockedUntil && now < record.blockedUntil) {
      return true;
    }

    // Reset if block period expired
    if (record.blockedUntil && now >= record.blockedUntil) {
      this.attempts.delete(identifier);
      return false;
    }

    // Reset if window expired
    if ((now - record.firstAttempt) > this.windowMs) {
      this.attempts.delete(identifier);
      return false;
    }

    return false;
  }

  recordAttempt(identifier: string, success: boolean): { blocked: boolean; remainingAttempts: number; blockDuration?: number } {
    const now = Date.now();
    
    if (success) {
      // Reset on successful attempt
      this.attempts.delete(identifier);
      return { blocked: false, remainingAttempts: this.maxAttempts };
    }

    let record = this.attempts.get(identifier);
    
    if (!record) {
      // First failed attempt
      record = {
        count: 1,
        firstAttempt: now
      };
      this.attempts.set(identifier, record);
      return { blocked: false, remainingAttempts: this.maxAttempts - 1 };
    }

    // Check if window expired
    if ((now - record.firstAttempt) > this.windowMs) {
      // Reset window
      record = {
        count: 1,
        firstAttempt: now
      };
      this.attempts.set(identifier, record);
      return { blocked: false, remainingAttempts: this.maxAttempts - 1 };
    }

    // Increment attempt count
    record.count++;

    // Block if max attempts exceeded
    if (record.count >= this.maxAttempts) {
      record.blockedUntil = now + this.blockDurationMs;
      this.attempts.set(identifier, record);
      return { 
        blocked: true, 
        remainingAttempts: 0, 
        blockDuration: this.blockDurationMs 
      };
    }

    this.attempts.set(identifier, record);
    return { 
      blocked: false, 
      remainingAttempts: this.maxAttempts - record.count 
    };
  }

  getRemainingBlockTime(identifier: string): number {
    const record = this.attempts.get(identifier);
    if (!record || !record.blockedUntil) return 0;

    const remaining = record.blockedUntil - Date.now();
    return Math.max(0, remaining);
  }

  // Get current status without recording an attempt
  getStatus(identifier: string): { blocked: boolean; remainingAttempts: number; remainingBlockTime: number } {
    if (this.isBlocked(identifier)) {
      return {
        blocked: true,
        remainingAttempts: 0,
        remainingBlockTime: this.getRemainingBlockTime(identifier)
      };
    }

    const record = this.attempts.get(identifier);
    const remainingAttempts = record ? this.maxAttempts - record.count : this.maxAttempts;

    return {
      blocked: false,
      remainingAttempts,
      remainingBlockTime: 0
    };
  }
}

// Create a singleton instance for admin authentication
export const adminRateLimiter = new RateLimiter(
  5,                    // Max 5 attempts
  15 * 60 * 1000,      // Within 15 minutes
  30 * 60 * 1000       // Block for 30 minutes
);

export default RateLimiter;
