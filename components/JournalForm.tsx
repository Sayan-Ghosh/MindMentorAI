"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { journalFormSchema } from "@/lib/validations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { JournalAnalysisResult } from "@/types";

import { memo } from "react";

interface JournalFormProps {
  onAnalysisComplete: (result: JournalAnalysisResult) => void;
}

export const JournalForm = memo(function JournalForm({ onAnalysisComplete }: JournalFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof journalFormSchema>>({
    resolver: zodResolver(journalFormSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof journalFormSchema>) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to analyze journal');
      }

      const data = await response.json();
      onAnalysisComplete(data as JournalAnalysisResult);
      reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full bg-white/5 backdrop-blur-lg border-white/10 text-white shadow-xl">
      <CardHeader>
        <CardTitle>Daily Wellness Journal</CardTitle>
        <CardDescription className="text-gray-400">
          Write about your study sessions, mock tests, stress, sleep, confidence, or anything else on your mind.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Today I took a mock test and felt really anxious about the physics section..."
              className="min-h-[200px] resize-none bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500"
              {...register("content")}
            />
            {errors.content && (
              <p className="text-sm text-red-400">{errors.content.message}</p>
            )}
          </div>
          
          {error && <p className="text-sm text-red-400">{error}</p>}
          
          <Button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Journal...
              </>
            ) : (
              "Submit & Analyze"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
});
