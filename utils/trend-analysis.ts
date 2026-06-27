export function calculateTrend(current: number, previous: number[]): "Increasing" | "Decreasing" | "Stable" | "Mixed" {
  if (previous.length === 0) return "Stable";
  
  const avg = previous.reduce((sum, val) => sum + val, 0) / previous.length;
  const diff = current - avg;
  
  if (diff > 1.5) return "Increasing";
  if (diff < -1.5) return "Decreasing";
  return "Stable";
}
