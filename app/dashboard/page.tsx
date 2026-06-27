"use client";

import { useState, useEffect, useCallback } from "react";
import { JournalForm } from "@/components/JournalForm";
import { AnalysisCards } from "@/components/AnalysisCards";
import { PatternCards } from "@/components/PatternCards";
import { WellnessCoach } from "@/components/WellnessCoach";
import { WellnessReport } from "@/components/WellnessReport";
import { CrisisAlert } from "@/components/CrisisAlert";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { JournalAnalysisResult, ReportApiResponse } from "@/types";

export default function DashboardPage() {
  const [analysis, setAnalysis] = useState<JournalAnalysisResult | null>(null);
  const [patterns, setPatterns] = useState<string[]>([]);
  const [reportData, setReportData] = useState<ReportApiResponse | null>(null);
  const [isLoadingPatterns, setIsLoadingPatterns] = useState(true);
  const [isLoadingReport, setIsLoadingReport] = useState(true);

  /** Fetches discovered patterns from the API. */
  const fetchPatterns = useCallback(async () => {
    try {
      setIsLoadingPatterns(true);
      const res = await fetch('/api/patterns');
      const data = await res.json();
      if (data.patterns) {
        setPatterns(data.patterns as string[]);
      }
    } catch (err) {
      console.error('Failed to fetch patterns:', err);
    } finally {
      setIsLoadingPatterns(false);
    }
  }, []);

  // Fetch report data and patterns on mount
  useEffect(() => {
    async function fetchReport() {
      try {
        setIsLoadingReport(true);
        const res = await fetch('/api/report');
        const data: ReportApiResponse = await res.json();
        if (!data.error) {
          setReportData(data);
        }
      } catch (err) {
        console.error('Failed to fetch report:', err);
      } finally {
        setIsLoadingReport(false);
      }
    }
    fetchReport();
    fetchPatterns();
  }, [fetchPatterns]);

  const handleAnalysisComplete = useCallback((result: JournalAnalysisResult) => {
    setAnalysis(result);
    fetchPatterns();
  }, [fetchPatterns]);

  return (
    <ErrorBoundary>
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
                <h2 className="text-2xl font-bold mb-4 text-gray-200">Today&apos;s Insights</h2>
                <AnalysisCards analysis={analysis} />
                <WellnessCoach analysis={analysis} />
              </div>
            )}
          </div>

          {/* Right Column: Historical & Long-Term Feedback */}
          <div className="lg:col-span-5 space-y-8">
            {isLoadingPatterns ? (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-[300px] animate-pulse"></div>
            ) : patterns.length > 0 ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <PatternCards patterns={patterns} />
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center text-gray-400 backdrop-blur-sm">
                <p>Complete a few journal entries to discover hidden patterns.</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section: Weekly Wellness Report */}
        <div className="mt-8 w-full">
          {isLoadingReport ? (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-[400px] animate-pulse"></div>
          ) : reportData && reportData.chartData && reportData.chartData.length > 0 ? (
            <WellnessReport 
              report={reportData.report} 
              stats={reportData.stats} 
              chartData={reportData.chartData} 
            />
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center text-gray-400 backdrop-blur-sm">
              <p>Complete a few journal entries to generate your weekly wellness report.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </ErrorBoundary>
  );
}
