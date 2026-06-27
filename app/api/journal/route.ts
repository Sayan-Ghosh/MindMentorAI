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

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured' }, { status: 500 });
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'DATABASE_URL is not configured' }, { status: 500 });
    }

    // Call Gemini API for analysis
    const analysis = await analyzeJournalEntry(content);

    // Save to database
    const savedJournal = await createJournalEntry(content, analysis);

    return NextResponse.json(savedJournal);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error processing journal:', message, error);
    return NextResponse.json({ error: `Failed to process journal entry: ${message}` }, { status: 500 });
  }
}
