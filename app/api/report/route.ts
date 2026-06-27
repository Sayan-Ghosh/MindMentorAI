export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { generateWeeklyReport } from '@/services/gemini';
import { getRecentJournals } from '@/services/journal';
import type { ChartDataPoint, ReportApiResponse } from '@/types';

/** Shape of a journal row returned by Prisma. */
interface JournalRow {
  createdAt: Date;
  content: string;
  stressScore: number;
  confidenceScore: number;
  motivationScore: number;
  emotionalTriggers: string;
}

/** Safely parses a JSON string, returning a fallback on failure. */
function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/** GET /api/report — generates the weekly wellness report with aggregated stats. */
export async function GET() {
  try {
    const journals = await getRecentJournals(7) as JournalRow[];

    if (!journals || journals.length === 0) {
      const emptyResponse: ReportApiResponse = {
        report: null,
        stats: { avgStress: '0', avgConfidence: '0', avgMotivation: '0' },
        chartData: [],
      };
      return NextResponse.json(emptyResponse);
    }

    // Single-pass aggregation for O(N) efficiency
    const totals = journals.reduce(
      (acc, curr) => ({
        stress: acc.stress + curr.stressScore,
        confidence: acc.confidence + curr.confidenceScore,
        motivation: acc.motivation + curr.motivationScore,
      }),
      { stress: 0, confidence: 0, motivation: 0 },
    );

    const count = journals.length;
    const avgStress = (totals.stress / count).toFixed(1);
    const avgConfidence = (totals.confidence / count).toFixed(1);
    const avgMotivation = (totals.motivation / count).toFixed(1);

    const summaryData = JSON.stringify({
      averageStress: avgStress,
      averageConfidence: avgConfidence,
      averageMotivation: avgMotivation,
      recentTriggers: journals.flatMap((j) => safeJsonParse<string[]>(j.emotionalTriggers, [])),
      excerpts: journals.map((j) => j.content.substring(0, 50) + '...'),
    });

    const report = await generateWeeklyReport(summaryData);

    const chartData: ChartDataPoint[] = [...journals].reverse().map((j) => ({
      date: new Date(j.createdAt).toLocaleDateString('en-US', { weekday: 'short' }),
      stress: j.stressScore,
      confidence: j.confidenceScore,
      motivation: j.motivationScore,
    }));

    const response: ReportApiResponse = {
      report,
      stats: { avgStress, avgConfidence, avgMotivation },
      chartData,
    };
    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error generating report:', message, error);
    return NextResponse.json({ error: `Failed to generate report: ${message}` }, { status: 500 });
  }
}
