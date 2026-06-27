export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { discoverHiddenPatterns } from '@/services/gemini';
import { getJournalsForPatternDiscovery } from '@/services/journal';

export async function GET() {
  try {
    const journals = await getJournalsForPatternDiscovery();

    if (!journals || journals.length === 0) {
      return NextResponse.json({ patterns: [] });
    }

    // Pass the text content of the journals to the AI
    const patterns = await discoverHiddenPatterns(journals.map(j => j.content));

    return NextResponse.json({ patterns });
  } catch (error) {
    console.error('Error fetching patterns:', error);
    return NextResponse.json({ error: 'Failed to discover patterns' }, { status: 500 });
  }
}
