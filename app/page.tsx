import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain, LineChart, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white selection:bg-indigo-500/30 font-sans flex flex-col items-center justify-center p-6 text-center">
      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      
      <div className="absolute top-0 w-full h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
      
      <div className="z-10 max-w-4xl space-y-8">
        <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm text-indigo-300 backdrop-blur-md mb-4">
          <Sparkles className="mr-2 h-4 w-4" />
          <span>Powered by Google Gemini</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          <span className="block">Your Personal</span>
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Wellness Coach
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          For students facing high-stakes exams. Identify emotional patterns, manage burnout, and optimize your academic performance.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link href="/dashboard">
            <Button size="lg" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-6 rounded-full shadow-lg shadow-indigo-900/20">
              Start Journaling
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-16 border-t border-white/10">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
            <Brain className="h-10 w-10 text-indigo-400 mb-4 mx-auto" />
            <h3 className="text-lg font-bold text-gray-200 mb-2">Smart Analysis</h3>
            <p className="text-sm text-gray-400">Gemini AI analyzes your daily entries to detect stress, motivation, and burnout risk instantly.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
            <Sparkles className="h-10 w-10 text-purple-400 mb-4 mx-auto" />
            <h3 className="text-lg font-bold text-gray-200 mb-2">Hidden Patterns</h3>
            <p className="text-sm text-gray-400">Discover correlations between your study habits, sleep, and emotional wellbeing over time.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
            <LineChart className="h-10 w-10 text-pink-400 mb-4 mx-auto" />
            <h3 className="text-lg font-bold text-gray-200 mb-2">Weekly Reports</h3>
            <p className="text-sm text-gray-400">Get personalized coaching and action plans to keep you on track towards your goals.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
