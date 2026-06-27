export interface JournalAnalysisResult {
  summary: string;
  primaryEmotion: string;
  secondaryEmotion: string | null;
  stressScore: number;
  confidenceScore: number;
  motivationScore: number;
  burnoutRisk: string;
  emotionalTriggers: string[];
  negativeThoughtPatterns: string[];
  positiveBehaviors: string[];
  recommendedActions: string[];
  studyAdvice: string;
  breathingExercise: string | null;
  motivationMessage: string | null;
  tomorrowPrediction: string | null;
  explanation: string;
  confidenceInAnalysis: number;
  reflectionQuestion: string;
  isCrisis: boolean;
}

export interface WeeklyReportResult {
  summary: string;
  wins: string[];
  challenges: string[];
  actionableGoals: string[];
}

/** A single data point for the wellness trend chart. */
export interface ChartDataPoint {
  date: string;
  stress: number;
  confidence: number;
  motivation: number;
}

/** Aggregated averages for the wellness report stats panel. */
export interface ReportStats {
  avgStress: string;
  avgConfidence: string;
  avgMotivation: string;
}

/** The full shape of the /api/report response payload. */
export interface ReportApiResponse {
  report: WeeklyReportResult | null;
  stats: ReportStats;
  chartData: ChartDataPoint[];
  error?: string;
}
