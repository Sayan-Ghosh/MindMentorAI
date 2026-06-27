import { prisma } from '@/lib/db';

/**
 * Retrieves the most contextually relevant journals.
 * Currently uses a recency-based retrieval, but designed to be modular
 * for future embedding/vector search integration.
 */
export async function retrieveRelevantContext(currentJournal: string, limit: number = 5) {
  // In a production vector DB setup, we would embed `currentJournal` and do a similarity search.
  // For now, we fallback to retrieving the most recent journals.
  const history = await prisma.journal.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
    select: {
      createdAt: true,
      content: true,
      primaryEmotion: true,
      stressScore: true,
      confidenceScore: true,
      emotionalTriggers: true,
    }
  });
  
  return history;
}
