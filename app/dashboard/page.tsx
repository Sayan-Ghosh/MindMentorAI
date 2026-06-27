"use client";

import { useState, useEffect } from "react";
import { JournalForm } from "@/components/JournalForm";
import { AnalysisCards } from "@/components/AnalysisCards";
import { PatternCards } from "@/components/PatternCards";
import { WellnessCoach } from "@/components/WellnessCoach";
import { WellnessReport } from "@/components/WellnessReport";
import { CrisisAlert } from "@/components/CrisisAlert";
import { JournalAnalysisResult } from "@/types";

export default function DashboardPage() {
  const [analysis, setAnalysis] = useState<JournalAnalysisResult | null>(null);
  const [patterns, setPatterns] = useState<string[]>([]);
  const [reportData, setReportData] = useState<any>(null);

  // Fetch report data on mount
  useEffect(() => {
    fetch('/api/report')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setReportData(data);
        }
      })
      .catch(console.error);
  }, []);

  const handleAnalysisComplete = (result: JournalAnalysisResult) => {
    setAnalysis(result);
    
    // After a new journal, fetch patterns
    fetch('/api/patterns')
      .then(res => res.json())
      .then(data => {
        if (data.patterns) {
          setPatterns(data.patterns);
        }
      })
      .catch(console.error);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-12 font-sans selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            MindMentor AI Dashboard
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Track your emotional wellness and optimize your study performance.
          </p>
        </header>

        {analysis && <CrisisAlert isCrisis={analysis.isCrisis} />}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Journaling & Immediate Feedback */}
          <div className="lg:col-span-7 space-y-8">
            <JournalForm onAnalysisComplete={handleAnalysisComplete} />
            
            {analysis && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-4 text-gray-200">Today's Insights</h2>
                <AnalysisCards analysis={analysis} />
                <WellnessCoach analysis={analysis} />
              </div>
            )}
          </div>

          {/* Right Column: Historical & Long-Term Feedback */}
          <div className="lg:col-span-5 space-y-8">
            {patterns.length > 0 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <PatternCards patterns={patterns} />
              </div>
            )}

            {reportData && reportData.chartData.length > 0 && (
              <WellnessReport 
                report={reportData.report} 
                stats={reportData.stats} 
                chartData={reportData.chartData} 
              />
            )}
            
            {!reportData?.chartData?.length && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center text-gray-400 backdrop-blur-sm">
                <p>Complete a few journal entries to generate your weekly wellness report and discover hidden patterns.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
