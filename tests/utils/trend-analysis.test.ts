import { describe, it, expect } from 'vitest';
import { calculateTrend } from '@/utils/trend-analysis';

describe('Trend Analysis Utility', () => {
  it('should return Stable for empty previous data', () => {
    expect(calculateTrend(5, [])).toBe('Stable');
  });

  it('should return Increasing when current is significantly higher than average', () => {
    // average of [2, 2, 2] is 2. current is 5. diff is 3 (> 1.5)
    expect(calculateTrend(5, [2, 2, 2])).toBe('Increasing');
  });

  it('should return Decreasing when current is significantly lower than average', () => {
    // average of [8, 8, 8] is 8. current is 4. diff is -4 (< -1.5)
    expect(calculateTrend(4, [8, 8, 8])).toBe('Decreasing');
  });

  it('should return Stable when current is close to average', () => {
    // average of [5, 6, 4] is 5. current is 6. diff is 1 (not > 1.5)
    expect(calculateTrend(6, [5, 6, 4])).toBe('Stable');
  });
});
