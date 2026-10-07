import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const POOL_VERSION = 3;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
  connectionString: string | undefined;
  poolVersion: number | undefined;
};

const rawConnectionString = process.env.DATABASE_URL || "";
let connectionString = rawConnectionString;

// Auto-rewrite direct Supabase host to IPv4-compatible connection pooler
// Direct db.<ref>.supabase.co only provides IPv6 AAAA records which fails on standard IPv4 networks
if (connectionString.includes("db.kprifflfakbucchpimvz.supabase.co")) {
  if (!connectionString.includes("postgres.kprifflfakbucchpimvz:")) {
    connectionString = connectionString.replace("postgres:", "postgres.kprifflfakbucchpimvz:");
  }
  connectionString = connectionString.replace("db.kprifflfakbucchpimvz.supabase.co", "aws-0-ap-northeast-1.pooler.supabase.com");
}

const isSupabaseOrSsl =
  connectionString.includes("supabase.co") ||
  connectionString.includes("supabase.com") ||
  connectionString.includes("sslmode=");

// Clean connection string so pg driver uses explicit ssl object without forcing verify-full
if (isSupabaseOrSsl && connectionString.includes("sslmode=")) {
  connectionString = connectionString
    .replace(/([?&])sslmode=[^&]+(&|$)/, "$1")
    .replace(/[?&]$/, "");
}

// Invalidate stale cached pool and prisma instances across Turbopack HMR reloads
if (
  globalForPrisma.pool &&
  (globalForPrisma.poolVersion !== POOL_VERSION ||
    globalForPrisma.connectionString !== connectionString)
) {
  try {
    globalForPrisma.pool.end();
  } catch {}
  globalForPrisma.pool = undefined;
  globalForPrisma.prisma = undefined;
}
globalForPrisma.poolVersion = POOL_VERSION;
globalForPrisma.connectionString = connectionString;

// Supabase session pooler has a server-side limit of 15 connections (EMAXCONNSESSION).
// max: 10 ensures we stay strictly within server limits while queuing concurrent requests gracefully.
// Omitting connectionTimeoutMillis ensures queued queries wait for a connection without throwing "timeout exceeded when trying to connect".
const pool =
  globalForPrisma.pool ??
  new Pool({
    connectionString,
    ssl: isSupabaseOrSsl ? { rejectUnauthorized: false } : undefined,
    max: 10,
    idleTimeoutMillis: 15000,
    keepAlive: true,
    keepAliveInitialDelayMillis: 10000,
  });

// Catch background socket errors on idle clients so they do not crash or leak
pool.on("error", (err) => {
  console.warn("PostgreSQL connection pool client error (idle socket drop handled):", err.message);
});

if (!globalForPrisma.pool) {
  globalForPrisma.pool = pool;
}

const adapter = new PrismaPg(pool);

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = db;
}

