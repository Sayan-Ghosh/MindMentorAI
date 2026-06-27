import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Phone } from "lucide-react";

import { memo } from "react";

interface CrisisAlertProps {
  isCrisis: boolean;
}

export const CrisisAlert = memo(function CrisisAlert({ isCrisis }: CrisisAlertProps) {
  if (!isCrisis) return null;

  return (
    <Alert variant="destructive" className="mt-6 border-red-500/50 bg-red-500/10 text-red-200">
      <AlertTriangle className="h-5 w-5" />
      <AlertTitle className="text-lg font-semibold">You don&apos;t have to face this alone.</AlertTitle>
      <AlertDescription className="mt-2 text-sm leading-relaxed">
        It sounds like you&apos;re going through a very difficult time right now. Please remember that this AI is not a substitute for professional help.
        <br /><br />
        <strong>Please reach out to:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>A trusted parent or guardian</li>
          <li>Your school counselor</li>
          <li>A mental health professional</li>
        </ul>
        <div className="mt-4 flex items-center p-3 bg-red-950/50 rounded-md border border-red-500/30">
          <Phone className="h-4 w-4 mr-2" />
          <span>National Helpline (Kiran): <strong>1800-599-0019</strong> (India)</span>
        </div>
      </AlertDescription>
    </Alert>
  );
});
