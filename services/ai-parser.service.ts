import { JournalAnalysisResult } from "@/types";

export class AIParser {
  static parseJournalAnalysis(jsonString: string): JournalAnalysisResult {
    try {
      // Remove any markdown code blocks if the model accidentally includes them
      const cleanJson = jsonString.replace(/```json\n?|\n?```/g, '').trim();
      const raw = JSON.parse(cleanJson);
      
      // Provide defaults and safe fallbacks for all fields
      return {
        summary: raw.summary || "No summary provided.",
        primaryEmotion: raw.primaryEmotion || "Unknown",
        secondaryEmotion: raw.secondaryEmotion || null,
        stressScore: typeof raw.stressScore === 'number' ? raw.stressScore : 5,
        confidenceScore: typeof raw.confidenceScore === 'number' ? raw.confidenceScore : 5,
        motivationScore: typeof raw.motivationScore === 'number' ? raw.motivationScore : 5,
        burnoutRisk: raw.burnoutRisk || "Moderate",
        emotionalTriggers: Array.isArray(raw.emotionalTriggers) ? raw.emotionalTriggers : [],
        negativeThoughtPatterns: Array.isArray(raw.negativeThoughtPatterns) ? raw.negativeThoughtPatterns : [],
        positiveBehaviors: Array.isArray(raw.positiveBehaviors) ? raw.positiveBehaviors : [],
        recommendedActions: Array.isArray(raw.recommendedActions) ? raw.recommendedActions : [],
        studyAdvice: raw.studyAdvice || "Keep going, you can do this.",
        breathingExercise: raw.breathingExercise || null,
        motivationMessage: raw.motivationMessage || null,
        tomorrowPrediction: raw.tomorrowPrediction || null,
        explanation: raw.explanation || "The AI detected these patterns based on your entry.",
        confidenceInAnalysis: typeof raw.confidenceInAnalysis === 'number' ? raw.confidenceInAnalysis : 80,
        reflectionQuestion: raw.reflectionQuestion || "How are you feeling right now?",
        isCrisis: Boolean(raw.isCrisis)
      };
    } catch {
      throw new Error("Failed to parse AI JSON response");
    }
  }
}
