import { prisma } from '@/lib/db';
import { JournalAnalysisResult } from '@/types';

/** Maximum number of journals to retrieve for pattern discovery. */
const PATTERN_DISCOVERY_LIMIT = 30;

/**
 * Persists a new journal entry along with its AI-generated analysis to the database.
 * Array fields (triggers, patterns, behaviors, actions) are serialized as JSON strings.
 */
export async function createJournalEntry(content: string, analysis: JournalAnalysisResult) {
  return await prisma.journal.create({
    data: {
      content,
      primaryEmotion: analysis.primaryEmotion,
      secondaryEmotion: analysis.secondaryEmotion,
      stressScore: analysis.stressScore,
      confidenceScore: analysis.confidenceScore,
      motivationScore: analysis.motivationScore,
      burnoutRisk: analysis.burnoutRisk,
      emotionalTriggers: JSON.stringify(analysis.emotionalTriggers),
      negativeThoughtPatterns: JSON.stringify(analysis.negativeThoughtPatterns),
      positiveBehaviors: JSON.stringify(analysis.positiveBehaviors),
      recommendedActions: JSON.stringify(analysis.recommendedActions),
      explanation: analysis.explanation,
      confidenceInAnalysis: analysis.confidenceInAnalysis,
      studyAdvice: analysis.studyAdvice,
      breathingExercise: analysis.breathingExercise,
      motivationMessage: analysis.motivationMessage,
      tomorrowPrediction: analysis.tomorrowPrediction,
      reflectionQuestion: analysis.reflectionQuestion,
      isCrisis: analysis.isCrisis,
    }
  });
}

/**
 * Retrieves the most recent journal entries, ordered by creation date (newest first).
 * @param limit - Maximum number of journals to return (default: 10).
 */
export async function getRecentJournals(limit: number = 10) {
  return await prisma.journal.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

/**
 * Retrieves recent journal entries with a minimal projection for pattern analysis.
 * Only selects fields needed by the AI pattern discovery service.
 */
export async function getJournalsForPatternDiscovery() {
  return await prisma.journal.findMany({
    orderBy: { createdAt: 'desc' },
    take: PATTERN_DISCOVERY_LIMIT,
    select: {
      content: true,
      primaryEmotion: true,
      stressScore: true,
      emotionalTriggers: true,
    }
  });
}
