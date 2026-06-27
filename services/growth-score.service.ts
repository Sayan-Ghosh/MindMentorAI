export interface JournalStats {
  confidenceScore: number;
  stressScore: number;
  motivationScore: number;
  burnoutLevel: string; // mapped to a number internally
}

export class GrowthScoreService {
  /**
   * Calculate growth score (0-100) based on emotional history.
   */
  static calculateScore(current: JournalStats, previous: JournalStats[]): number {
    if (previous.length === 0) return 50; // Baseline
    
    // Calculate averages of previous stats
    const avgPrevConfidence = previous.reduce((sum, j) => sum + j.confidenceScore, 0) / previous.length;
    const avgPrevStress = previous.reduce((sum, j) => sum + j.stressScore, 0) / previous.length;
    
    let score = 50; // Starting baseline
    
    // Confidence change (+ is good)
    score += (current.confidenceScore - avgPrevConfidence) * 3;
    
    // Stress change (- is good)
    score += (avgPrevStress - current.stressScore) * 3;
    
    // Clamp to 0-100
    return Math.max(0, Math.min(100, Math.round(score)));
  }
}
