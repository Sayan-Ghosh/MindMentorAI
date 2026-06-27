import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

import { memo } from "react";

interface PatternCardsProps {
  patterns: string[];
}

export const PatternCards = memo(function PatternCards({ patterns }: PatternCardsProps) {
  if (!patterns || patterns.length === 0) return null;

  return (
    <Card className="bg-white/5 border-white/10 text-white backdrop-blur-sm mt-6">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Lightbulb className="mr-2 h-5 w-5 text-amber-400" />
          Hidden Emotional Patterns
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {patterns.map((pattern, idx) => (
            <li key={idx} className="flex items-start bg-white/5 p-3 rounded-md border border-white/5">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mr-3 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-sm text-gray-200">{pattern}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
});
