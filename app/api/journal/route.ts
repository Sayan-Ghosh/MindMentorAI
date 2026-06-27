export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { analyzeJournalEntry } from '@/services/gemini';
import { createJournalEntry } from '@/services/journal';

export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    if (!content || typeof content !== 'string') {
      return NextResponse.json({ error: 'Invalid journal content' }, { status: 400 });
    }

    // Call Gemini API for analysis
    const analysis = await analyzeJournalEntry(content);

    // Save to SQLite
    const savedJournal = await createJournalEntry(content, analysis);

    return NextResponse.json(savedJournal);
  } catch (error) {
    console.error('Error processing journal:', error);
    return NextResponse.json({ error: 'Failed to process journal entry' }, { status: 500 });
  }
}
