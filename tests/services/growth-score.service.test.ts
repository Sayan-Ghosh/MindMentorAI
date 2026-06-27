import { describe, it, expect } from 'vitest';
import { GrowthScoreService, JournalStats } from '@/services/growth-score.service';

describe('Growth Score Calculation', () => {
  const basePrevious: JournalStats[] = [
    { confidenceScore: 5, stressScore: 5, motivationScore: 5, burnoutLevel: "Moderate" }
  ];

  it('should calculate positive improvement correctly', () => {
    // Current confidence is 8 (+3), stress is 2 (-3)
    // Score change = (8 - 5)*3 + (5 - 2)*3 = 9 + 9 = 18
    // Base 50 + 18 = 68
    const current = { confidenceScore: 8, stressScore: 2, motivationScore: 8, burnoutLevel: "Low" };
    const score = GrowthScoreService.calculateScore(current, basePrevious);
    expect(score).toBe(68);
  });

  it('should calculate regression correctly', () => {
    // Current confidence is 2 (-3), stress is 8 (+3)
    // Score change = (2 - 5)*3 + (5 - 8)*3 = -9 - 9 = -18
    // Base 50 - 18 = 32
    const current = { confidenceScore: 2, stressScore: 8, motivationScore: 2, burnoutLevel: "High" };
    const score = GrowthScoreService.calculateScore(current, basePrevious);
    expect(score).toBe(32);
  });

  it('should remain stable when no changes occur', () => {
    const current = { confidenceScore: 5, stressScore: 5, motivationScore: 5, burnoutLevel: "Moderate" };
    const score = GrowthScoreService.calculateScore(current, basePrevious);
    expect(score).toBe(50);
  });

  it('should clamp scores between 0 and 100', () => {
    const extremeCurrent = { confidenceScore: 10, stressScore: 0, motivationScore: 10, burnoutLevel: "Low" };
    const extremePrevious = [{ confidenceScore: 0, stressScore: 10, motivationScore: 0, burnoutLevel: "Critical" }];
    // Score change = (10-0)*3 + (10-0)*3 = 60
    // 50 + 60 = 110 -> clamped to 100
    const score = GrowthScoreService.calculateScore(extremeCurrent, extremePrevious);
    expect(score).toBe(100);
    
    const worstCurrent = { confidenceScore: 0, stressScore: 10, motivationScore: 0, burnoutLevel: "Critical" };
    const bestPrevious = [{ confidenceScore: 10, stressScore: 0, motivationScore: 10, burnoutLevel: "Low" }];
    // Score change = (0-10)*3 + (0-10)*3 = -60
    // 50 - 60 = -10 -> clamped to 0
    const worstScore = GrowthScoreService.calculateScore(worstCurrent, bestPrevious);
    expect(worstScore).toBe(0);
  });
});
