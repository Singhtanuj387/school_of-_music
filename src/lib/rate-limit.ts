import { RateLimitError } from "@/lib/errors";

interface RateLimitRecord {
  timestamps: number[];
}

/**
 * In-memory sliding window rate limiter.
 * In a distributed multi-node environment, this can be swapped with Redis / Upstash.
 */
class SlidingWindowRateLimiter {
  private store = new Map<string, RateLimitRecord>();
  private sweepInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Periodically clean up expired records every 5 minutes
    if (typeof setInterval !== "undefined") {
      this.sweepInterval = setInterval(() => this.cleanup(), 5 * 60 * 1000);
      if (this.sweepInterval.unref) {
        this.sweepInterval.unref();
      }
    }
  }

  /**
   * Check and consume one token from the rate limit bucket.
   * @param key Unique identifier (e.g., action + IP / email)
   * @param limit Maximum allowed requests within window
   * @param windowMs Window duration in milliseconds
   */
  public check(
    key: string,
    limit: number,
    windowMs: number,
  ): {
    success: boolean;
    limit: number;
    remaining: number;
    resetInSeconds: number;
  } {
    const now = Date.now();
    const windowStart = now - windowMs;

    let record = this.store.get(key);
    if (!record) {
      record = { timestamps: [] };
      this.store.set(key, record);
    }

    // Keep only timestamps within the current window
    record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

    if (record.timestamps.length >= limit) {
      const oldestInWindow = record.timestamps[0];
      const resetInSeconds = Math.max(
        1,
        Math.ceil((oldestInWindow + windowMs - now) / 1000),
      );

      return {
        success: false,
        limit,
        remaining: 0,
        resetInSeconds,
      };
    }

    record.timestamps.push(now);

    return {
      success: true,
      limit,
      remaining: limit - record.timestamps.length,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  /**
   * Assert rate limit and throw a typed RateLimitError if exceeded.
   */
  public assertLimit(
    key: string,
    limit: number,
    windowMs: number,
    errorMessage = "Too many requests. Please try again later.",
  ): void {
    const res = this.check(key, limit, windowMs);
    if (!res.success) {
      throw new RateLimitError(
        `${errorMessage} Try again in ${res.resetInSeconds}s.`,
      );
    }
  }

  private cleanup(): void {
    const now = Date.now();
    const maxWindow = 60 * 60 * 1000; // 1 hour max retention
    for (const [key, record] of this.store.entries()) {
      record.timestamps = record.timestamps.filter((ts) => now - ts < maxWindow);
      if (record.timestamps.length === 0) {
        this.store.delete(key);
      }
    }
  }
}

export const rateLimiter = new SlidingWindowRateLimiter();

/**
 * Pre-configured rate limit checkers for key auth & room endpoints
 */
export const AuthRateLimits = {
  /** 5 failed login attempts per 15 minutes per identifier */
  checkLogin(identifier: string) {
    rateLimiter.assertLimit(
      `login:${identifier.toLowerCase().trim()}`,
      5,
      15 * 60 * 1000,
      "Too many login attempts.",
    );
  },

  /** 5 signups per hour per IP */
  checkSignup(ipOrId: string) {
    rateLimiter.assertLimit(
      `signup:${ipOrId.trim()}`,
      5,
      60 * 60 * 1000,
      "Too many accounts created from this network.",
    );
  },

  /** 3 password reset requests per 30 minutes per email */
  checkForgotPassword(email: string) {
    rateLimiter.assertLimit(
      `forgot-pwd:${email.toLowerCase().trim()}`,
      3,
      30 * 60 * 1000,
      "Too many password reset requests.",
    );
  },

  /** 20 room token requests per minute per user/IP */
  checkRoomToken(userIdOrIp: string) {
    rateLimiter.assertLimit(
      `room-token:${userIdOrIp.trim()}`,
      20,
      60 * 1000,
      "Too many room token requests.",
    );
  },

  /** 10 booking requests per 5 minutes per user */
  checkBooking(userId: string) {
    rateLimiter.assertLimit(
      `booking:${userId.trim()}`,
      10,
      5 * 60 * 1000,
      "Too many booking requests. Please wait a moment before booking another lesson.",
    );
  },

  /** 600 webhook events per minute per IP — high limit to support concurrent classroom bursts */
  checkWebhook(ip: string) {
    rateLimiter.assertLimit(
      `webhook:${ip.trim()}`,
      600,
      60 * 1000,
      "Webhook rate limit exceeded.",
    );
  },

  /** 5 support tickets per 10 minutes per user */
  checkTicketCreation(userId: string) {
    rateLimiter.assertLimit(
      `ticket-create:${userId.trim()}`,
      5,
      10 * 60 * 1000,
      "Too many support tickets created. Please wait before creating another ticket.",
    );
  },

  /** 10 payment initiation attempts per 10 minutes per user */
  checkPayment(userId: string) {
    rateLimiter.assertLimit(
      `payment-init:${userId.trim()}`,
      10,
      10 * 60 * 1000,
      "Too many payment initialization requests. Please wait a moment before trying again.",
    );
  },

  /** 10 OTP requests per 10 minutes per phone */
  checkSendOtp(phone: string) {
    rateLimiter.assertLimit(
      `send-otp:${phone.trim()}`,
      10,
      10 * 60 * 1000,
      "Too many OTP requests for this phone number. Please wait a moment before trying again.",
    );
  },

  /** 25 OTP verification attempts per 10 minutes per phone */
  checkVerifyOtp(phone: string) {
    rateLimiter.assertLimit(
      `verify-otp:${phone.trim()}`,
      25,
      10 * 60 * 1000,
      "Too many verification attempts. Please wait or request a fresh OTP.",
    );
  },
};

