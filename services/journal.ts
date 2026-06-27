import { PrismaClient } from '@prisma/client';
import { JournalAnalysisResult } from '@/types';

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL || "file:./dev.db",
});

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

export async function getRecentJournals(limit: number = 10) {
  return await prisma.journal.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

export async function getJournalsForPatternDiscovery() {
  // Fetch up to 30 recent journals for pattern analysis
  return await prisma.journal.findMany({
    orderBy: { createdAt: 'desc' },
    take: 30,
    select: {
      content: true,
      primaryEmotion: true,
      stressScore: true,
      emotionalTriggers: true,
    }
  });
}
