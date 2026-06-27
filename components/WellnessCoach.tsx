import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JournalAnalysisResult } from "@/types";
import { BrainCircuit, Wind, Sparkles } from "lucide-react";

import { memo } from "react";

interface WellnessCoachProps {
  analysis: JournalAnalysisResult;
}

export const WellnessCoach = memo(function WellnessCoach({ analysis }: WellnessCoachProps) {
  return (
    <Card className="bg-white/5 border-white/10 text-white backdrop-blur-sm mt-6">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <BrainCircuit className="mr-2 h-5 w-5 text-indigo-400" />
          Personalized AI Wellness Coach
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-indigo-300 flex items-center mb-2">
            <Sparkles className="h-4 w-4 mr-2" />
            Coaching Recommendation
          </h4>
          <ul className="list-disc pl-5 text-sm text-gray-300 leading-relaxed space-y-1">
            {analysis.recommendedActions.map((action, i) => (
              <li key={i}>{action}</li>
            ))}
          </ul>
        </div>

        {analysis.breathingExercise && (
          <div className="bg-teal-500/10 border border-teal-500/20 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-teal-300 flex items-center mb-2">
              <Wind className="h-4 w-4 mr-2" />
              Mindfulness Exercise
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed">{analysis.breathingExercise}</p>
          </div>
        )}

        {analysis.motivationMessage && (
          <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-amber-300 flex items-center mb-2">
              <Sparkles className="h-4 w-4 mr-2" />
              Motivation
            </h4>
            <p className="text-sm italic text-gray-300">&quot;{analysis.motivationMessage}&quot;</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
});
