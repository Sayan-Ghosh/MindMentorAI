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
