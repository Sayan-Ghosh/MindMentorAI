import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { JournalAnalysisResult } from "@/types";
import { Activity, Brain, HeartPulse, Zap } from "lucide-react";

interface AnalysisCardsProps {
  analysis: JournalAnalysisResult;
}

export function AnalysisCards({ analysis }: AnalysisCardsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return "bg-green-500";
    if (score >= 5) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  const getStressColor = (score: number) => {
    if (score >= 8) return "bg-red-500";
    if (score >= 5) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Emotion */}
      <Card className="bg-white/5 border-white/10 text-white backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">Primary Emotion</CardTitle>
          <HeartPulse className="h-4 w-4 text-rose-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analysis.primaryEmotion}</div>
          <Badge variant="outline" className="mt-2 border-rose-400/50 text-rose-400">
            Detected
          </Badge>
        </CardContent>
      </Card>

      {/* Stress */}
      <Card className="bg-white/5 border-white/10 text-white backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">Stress Level</CardTitle>
          <Activity className="h-4 w-4 text-orange-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analysis.stressScore}/10</div>
          <Progress value={analysis.stressScore * 10} className="mt-3 h-2" indicatorColor={getStressColor(analysis.stressScore)} />
        </CardContent>
      </Card>

      {/* Confidence */}
      <Card className="bg-white/5 border-white/10 text-white backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">Confidence</CardTitle>
          <Brain className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analysis.confidenceScore}/10</div>
          <Progress value={analysis.confidenceScore * 10} className="mt-3 h-2" indicatorColor={getScoreColor(analysis.confidenceScore)} />
        </CardContent>
      </Card>

      {/* Motivation */}
      <Card className="bg-white/5 border-white/10 text-white backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">Motivation</CardTitle>
          <Zap className="h-4 w-4 text-yellow-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analysis.motivationScore}/10</div>
          <Progress value={analysis.motivationScore * 10} className="mt-3 h-2" indicatorColor={getScoreColor(analysis.motivationScore)} />
        </CardContent>
      </Card>
    </div>
  );
}
