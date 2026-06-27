export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { generateWeeklyReport } from '@/services/gemini';
import { getRecentJournals } from '@/services/journal';

export async function GET() {
  try {
    const journals = await getRecentJournals(7); // Get up to 7 recent journals

    if (!journals || journals.length === 0) {
      return NextResponse.json({ 
        report: null, 
        stats: {
          avgStress: 0,
          avgConfidence: 0,
          avgMotivation: 0,
        },
        chartData: []
      });
    }

    // Calculate averages
    // Calculate averages
    const avgStress = journals.reduce((acc: number, curr: { stressScore: number }) => acc + curr.stressScore, 0) / journals.length;
    const avgConfidence = journals.reduce((acc: number, curr: { confidenceScore: number }) => acc + curr.confidenceScore, 0) / journals.length;
    const avgMotivation = journals.reduce((acc: number, curr: { motivationScore: number }) => acc + curr.motivationScore, 0) / journals.length;

    const summaryData = JSON.stringify({
      averageStress: avgStress.toFixed(1),
      averageConfidence: avgConfidence.toFixed(1),
      averageMotivation: avgMotivation.toFixed(1),
      recentTriggers: journals.flatMap((j: { emotionalTriggers: string }) => {
        try {
          return JSON.parse(j.emotionalTriggers);
        } catch {
          return [];
        }
      }),
      excerpts: journals.map((j: { content: string }) => j.content.substring(0, 50) + "..."),
    });

    const report = await generateWeeklyReport(summaryData);

    const chartData = journals.reverse().map((j: { createdAt: Date, stressScore: number, confidenceScore: number, motivationScore: number }) => ({
      date: new Date(j.createdAt).toLocaleDateString('en-US', { weekday: 'short' }),
      stress: j.stressScore,
      confidence: j.confidenceScore,
      motivation: j.motivationScore,
    }));

    return NextResponse.json({
      report,
      stats: {
        avgStress: avgStress.toFixed(1),
        avgConfidence: avgConfidence.toFixed(1),
        avgMotivation: avgMotivation.toFixed(1),
      },
      chartData
    });

  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}
