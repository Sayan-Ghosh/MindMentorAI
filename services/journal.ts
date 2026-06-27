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
      stressScore: analysis.stressScore,
      confidenceScore: analysis.confidenceScore,
      motivationScore: analysis.motivationScore,
      burnoutRisk: analysis.burnoutRisk,
      trigger: analysis.trigger,
      recommendation: analysis.recommendation,
      cognitiveDistortion: analysis.cognitiveDistortion,
      studyHours: analysis.studyHours,
      sleepHours: analysis.sleepHours,
      breathingExercise: analysis.breathingExercise,
      motivationMessage: analysis.motivationMessage,
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
      trigger: true,
    }
  });
}
