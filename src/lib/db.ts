import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

const rawConnectionString = process.env.DATABASE_URL || "";
const isSupabaseOrSsl =
  rawConnectionString.includes("supabase.co") ||
  rawConnectionString.includes("sslmode=");

// Clean connection string so pg driver uses explicit ssl object without forcing verify-full
let connectionString = rawConnectionString;

// Automatically route Supabase connections to the dedicated PgBouncer / Supavisor connection pooler (port 6543)
// so that concurrent multi-browser / multi-user requests never exhaust direct connection limits (port 5432)
if (connectionString.includes(".supabase.co:5432")) {
  connectionString = connectionString.replace(".supabase.co:5432", ".supabase.co:6543");
}

if (isSupabaseOrSsl && connectionString.includes("sslmode=")) {
  connectionString = connectionString
    .replace(/([?&])sslmode=[^&]+(&|$)/, "$1")
    .replace(/[?&]$/, "");
}

const pool =
  globalForPrisma.pool ??
  new Pool({
    connectionString,
    ssl: isSupabaseOrSsl ? { rejectUnauthorized: false } : undefined,
    max: 8,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
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

