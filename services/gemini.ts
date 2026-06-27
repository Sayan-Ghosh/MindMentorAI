import { GoogleGenAI } from '@google/genai';
import { JOURNAL_ANALYSIS_PROMPT, PATTERN_DISCOVERY_PROMPT, WEEKLY_REPORT_PROMPT } from '@/lib/prompts';
import { JournalAnalysisResult, WeeklyReportResult } from '@/types';

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL_NAME = 'gemini-2.5-pro'; // or gemini-2.5-flash for speed, using pro for complex reasoning

export async function analyzeJournalEntry(content: string): Promise<JournalAnalysisResult> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing");
  }

  const prompt = `${JOURNAL_ANALYSIS_PROMPT}\n\nJournal Entry:\n${content}`;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      temperature: 0.2, // Low temperature for consistent JSON output
      responseMimeType: "application/json",
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from Gemini");
  
  try {
    return JSON.parse(text) as JournalAnalysisResult;
  } catch (error) {
    console.error("Failed to parse Gemini response", text);
    throw new Error("Failed to parse AI analysis");
  }
}

export async function discoverHiddenPatterns(journals: string[]): Promise<string[]> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing");
  }

  if (journals.length === 0) return [];

  const formattedJournals = journals.map((j, i) => `Entry ${i + 1}: ${j}`).join('\n\n');
  const prompt = `${PATTERN_DISCOVERY_PROMPT}\n\nPast Journal Entries:\n${formattedJournals}`;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      temperature: 0.4,
      responseMimeType: "application/json",
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from Gemini");

  try {
    return JSON.parse(text) as string[];
  } catch (error) {
    console.error("Failed to parse Gemini response", text);
    return [];
  }
}

export async function generateWeeklyReport(summaryData: string): Promise<WeeklyReportResult> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing");
  }

  const prompt = `${WEEKLY_REPORT_PROMPT}\n\nWeekly Summary Data:\n${summaryData}`;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      temperature: 0.4,
      responseMimeType: "application/json",
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from Gemini");

  try {
    return JSON.parse(text) as WeeklyReportResult;
  } catch (error) {
    console.error("Failed to parse Gemini response", text);
    throw new Error("Failed to generate report");
  }
}
