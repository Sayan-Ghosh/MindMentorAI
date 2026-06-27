import { describe, it, expect, vi } from 'vitest';

// Mock the PrismaClient instance before importing memory
const { mockFindMany } = vi.hoisted(() => {
  return { mockFindMany: vi.fn() };
});

vi.mock('@prisma/client', () => {
  return {
    PrismaClient: class {
      journal = {
        findMany: mockFindMany,
      };
    }
  };
});

import { retrieveRelevantContext } from '@/services/memory';

describe('Memory Retrieval Layer', () => {
  it('should return recent journals', async () => {
    const mockJournals = [
      { content: "Journal 1", primaryEmotion: "Happy" },
      { content: "Journal 2", primaryEmotion: "Sad" }
    ];
    mockFindMany.mockResolvedValue(mockJournals);

    const result = await retrieveRelevantContext("Test");
    expect(result).toHaveLength(2);
    expect(result[0].content).toBe("Journal 1");
  });

  it('should handle empty history gracefully', async () => {
    mockFindMany.mockResolvedValue([]);
    const result = await retrieveRelevantContext("Test");
    expect(result).toHaveLength(0);
  });
});
