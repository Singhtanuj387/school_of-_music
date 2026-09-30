import { hash, verify } from "@node-rs/argon2";

/**
 * Argon2id password hashing options adhering to OWASP recommendations.
 * Memory cost: 64 MB (65536 KB)
 * Time cost / iterations: 3
 * Parallelism: 1 thread
 */
const ARGON2_OPTIONS = {
  algorithm: 2 as const, // Algorithm.Argon2id = 2
  memoryCost: 65536,
  timeCost: 3,
  outputLen: 32,
  parallelism: 1,
};

/**
 * Hash a plain text password using Argon2id.
 */
export async function hashPassword(password: string): Promise<string> {
  return hash(password, ARGON2_OPTIONS);
}

/**
 * Verify a plain text password against an Argon2id hash.
 */
export async function verifyPassword(
  hash: string,
  plainText: string,
): Promise<boolean> {
  try {
    return await verify(hash, plainText, ARGON2_OPTIONS);
  } catch {
    return false;
  }
}
