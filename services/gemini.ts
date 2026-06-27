import { GoogleGenAI } from '@google/genai';
import { JOURNAL_ANALYSIS_PROMPT, PATTERN_DISCOVERY_PROMPT, WEEKLY_REPORT_PROMPT } from '@/lib/prompts';
import { JournalAnalysisResult, WeeklyReportResult } from '@/types';

/** Gemini client — initialized lazily with the server-side API key. */
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/** Model used for all AI reasoning tasks. Flash offers generous free-tier limits with strong reasoning. */
const MODEL_NAME = 'gemini-2.5-flash';

/** Lower temperature for deterministic, consistent JSON output. */
const ANALYSIS_TEMPERATURE = 0.2;

/** Slightly higher temperature for creative pattern discovery and report narratives. */
const CREATIVE_TEMPERATURE = 0.4;

/**
 * Analyzes a journal entry using Gemini Pro to extract emotional scores,
 * triggers, and personalized recommendations.
 * @throws {Error} If the API key is missing or the AI response cannot be parsed.
 */
export async function analyzeJournalEntry(content: string): Promise<JournalAnalysisResult> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is missing');
  }

  const prompt = `${JOURNAL_ANALYSIS_PROMPT}\n\nJournal Entry:\n${content}`;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      temperature: ANALYSIS_TEMPERATURE,
      responseMimeType: 'application/json',
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from Gemini");
  
  try {
    return JSON.parse(text) as JournalAnalysisResult;
  } catch {
    console.error("Failed to parse Gemini response", text);
    throw new Error("Failed to parse AI analysis");
  }
}

/**
 * Discovers hidden recurring emotional patterns across multiple journal entries.
 * Returns up to 5 key insights as plain-text strings.
 * @param journals - Array of raw journal content strings.
 */
export async function discoverHiddenPatterns(journals: string[]): Promise<string[]> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is missing');
  }

  if (journals.length === 0) return [];

  const formattedJournals = journals.map((j, i) => `Entry ${i + 1}: ${j}`).join('\n\n');
  const prompt = `${PATTERN_DISCOVERY_PROMPT}\n\nPast Journal Entries:\n${formattedJournals}`;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      temperature: CREATIVE_TEMPERATURE,
      responseMimeType: 'application/json',
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from Gemini");

  try {
    return JSON.parse(text) as string[];
  } catch {
    console.error("Failed to parse Gemini response", text);
    return [];
  }
}

/**
 * Generates a cohesive weekly wellness report from aggregated journal data.
 * @param summaryData - JSON string containing averaged scores, triggers, and excerpts.
 */
export async function generateWeeklyReport(summaryData: string): Promise<WeeklyReportResult> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is missing');
  }

  const prompt = `${WEEKLY_REPORT_PROMPT}\n\nWeekly Summary Data:\n${summaryData}`;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      temperature: CREATIVE_TEMPERATURE,
      responseMimeType: 'application/json',
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from Gemini");

  try {
    return JSON.parse(text) as WeeklyReportResult;
  } catch {
    console.error("Failed to parse Gemini response", text);
    throw new Error("Failed to generate report");
  }
}
