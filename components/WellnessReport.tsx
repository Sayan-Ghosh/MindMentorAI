"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface WellnessReportProps {
  report: {
    summary: string;
    recommendedActionPlan: string;
  } | null;
  stats: {
    avgStress: string;
    avgConfidence: string;
    avgMotivation: string;
  };
  chartData: any[];
}

export function WellnessReport({ report, stats, chartData }: WellnessReportProps) {
  if (chartData.length === 0) return null;

  return (
    <Card className="bg-white/5 border-white/10 text-white backdrop-blur-sm mt-6">
      <CardHeader>
        <CardTitle className="text-xl">Weekly Wellness Report</CardTitle>
        <CardDescription className="text-gray-400">
          Your emotional trends over the recent period.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-400">Avg Stress</p>
            <p className="text-2xl font-bold text-red-400">{stats.avgStress}</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-400">Avg Confidence</p>
            <p className="text-2xl font-bold text-blue-400">{stats.avgConfidence}</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-400">Avg Motivation</p>
            <p className="text-2xl font-bold text-yellow-400">{stats.avgMotivation}</p>
          </div>
        </div>

        <div className="h-[300px] w-full mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" domain={[0, 10]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                itemStyle={{ color: '#e5e7eb' }}
              />
              <Legend />
              <Line type="monotone" dataKey="stress" stroke="#f87171" strokeWidth={2} name="Stress" />
              <Line type="monotone" dataKey="confidence" stroke="#60a5fa" strokeWidth={2} name="Confidence" />
              <Line type="monotone" dataKey="motivation" stroke="#fbbf24" strokeWidth={2} name="Motivation" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {report && (
          <div className="space-y-4 border-t border-white/10 pt-4">
            <div>
              <h4 className="text-sm font-semibold text-indigo-300 mb-2">AI Summary</h4>
              <p className="text-sm text-gray-300 leading-relaxed">{report.summary}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-teal-300 mb-2">Recommended Action Plan</h4>
              <p className="text-sm text-gray-300 leading-relaxed">{report.recommendedActionPlan}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
