import { describe, it, expect } from 'vitest';
import { AIParser } from '@/services/ai-parser.service';

describe('AI JSON Parser', () => {
  it('should parse valid JSON correctly', () => {
    const validJson = JSON.stringify({
      summary: "Good day.",
      primaryEmotion: "Happy",
      stressScore: 2,
      burnoutRisk: "Low"
    });
    const parsed = AIParser.parseJournalAnalysis(validJson);
    expect(parsed.summary).toBe("Good day.");
    expect(parsed.primaryEmotion).toBe("Happy");
    expect(parsed.stressScore).toBe(2);
  });

  it('should apply defaults for missing required fields', () => {
    const missingFieldsJson = JSON.stringify({
      summary: "Had a rough time."
    });
    const parsed = AIParser.parseJournalAnalysis(missingFieldsJson);
    expect(parsed.primaryEmotion).toBe("Unknown");
    expect(parsed.stressScore).toBe(5); // Default value
    expect(parsed.emotionalTriggers).toEqual([]);
    expect(parsed.isCrisis).toBe(false);
  });

  it('should handle malformed JSON gracefully', () => {
    const malformedJson = '{ summary: "Unquoted keys" }';
    expect(() => AIParser.parseJournalAnalysis(malformedJson)).toThrow("Failed to parse AI JSON response");
  });

  it('should safely ignore unknown fields', () => {
    const extraFieldsJson = JSON.stringify({
      summary: "Test",
      randomField: "Should be ignored"
    });
    const parsed = AIParser.parseJournalAnalysis(extraFieldsJson);
    expect(parsed.summary).toBe("Test");
    expect((parsed as any).randomField).toBeUndefined();
  });

  it('should parse JSON wrapped in markdown ticks', () => {
    const markdownJson = "```json\n{\n  \"summary\": \"Parsed from markdown\"\n}\n```";
    const parsed = AIParser.parseJournalAnalysis(markdownJson);
    expect(parsed.summary).toBe("Parsed from markdown");
  });
});
