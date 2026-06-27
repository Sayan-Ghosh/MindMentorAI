import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

/**
 * Centralized Prisma client singleton.
 * Parses DATABASE_URL to extract the authToken for Turso's LibSQL adapter.
 */
function createPrismaClient(): PrismaClient {
  const rawUrl = process.env.DATABASE_URL || 'file:./dev.db';

  // If it's a libsql:// URL (Turso), split into url + authToken
  if (rawUrl.startsWith('libsql://')) {
    const urlObj = new URL(rawUrl);
    const authToken = urlObj.searchParams.get('authToken') || undefined;
    // Remove the authToken from the URL so it's a clean base URL
    urlObj.searchParams.delete('authToken');
    const cleanUrl = urlObj.toString();

    const adapter = new PrismaLibSql({
      url: cleanUrl,
      authToken,
    });
    return new PrismaClient({ adapter });
  }

  // Fallback for local file-based SQLite
  const adapter = new PrismaLibSql({ url: rawUrl });
  return new PrismaClient({ adapter });
}

// Singleton pattern to avoid creating multiple connections in dev/serverless
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
