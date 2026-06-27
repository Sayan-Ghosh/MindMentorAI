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
    const avgStress = journals.reduce((acc, curr) => acc + curr.stressScore, 0) / journals.length;
    const avgConfidence = journals.reduce((acc, curr) => acc + curr.confidenceScore, 0) / journals.length;
    const avgMotivation = journals.reduce((acc, curr) => acc + curr.motivationScore, 0) / journals.length;

    const summaryData = JSON.stringify({
      averageStress: avgStress.toFixed(1),
      averageConfidence: avgConfidence.toFixed(1),
      averageMotivation: avgMotivation.toFixed(1),
      recentTriggers: journals.map(j => j.trigger),
      excerpts: journals.map(j => j.content.substring(0, 50) + "..."),
    });

    const report = await generateWeeklyReport(summaryData);

    const chartData = journals.reverse().map(j => ({
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
