
'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Bot, GitCommit, BrainCircuit } from 'lucide-react';

interface LeadExplanationSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: {
    name: string;
    intent: 'Positive' | 'Neutral' | 'Negative';
    explanation: {
      ruleMatch?: string;
      mlScore?: number;
      llmRationale?: string;
    };
  };
}

export default function LeadExplanationSheet({
  open,
  onOpenChange,
  lead,
}: LeadExplanationSheetProps) {
  const { explanation, intent } = lead;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Why was this lead labeled?</SheetTitle>
          <SheetDescription>
            Explanation for {lead.name}'s reply being classified as{' '}
            <Badge
              variant={intent === 'Positive' ? 'default' : intent === 'Negative' ? 'destructive' : 'secondary'}
              className={
                  intent === 'Positive' ? 'bg-green-100 text-green-800' :
                  intent === 'Negative' ? 'bg-red-100 text-red-800' : ''
              }
            >
              {intent}
            </Badge>
            .
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-6">
          {explanation.ruleMatch && (
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <GitCommit className="h-4 w-4 text-primary" /> Matched Rule
              </h4>
              <p className="text-sm text-muted-foreground ml-6">
                Contained an exact match for the phrase: <span className="font-mono bg-muted p-1 rounded-sm">"{explanation.ruleMatch}"</span>
              </p>
            </div>
          )}

          {explanation.mlScore && (
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <BrainCircuit className="h-4 w-4 text-primary" /> ML Score
              </h4>
              <p className="text-sm text-muted-foreground ml-6">
                The machine learning model assigned a score of <span className="font-semibold text-foreground">{explanation.mlScore}</span> for the <span className="font-semibold text-foreground">{intent}</span> category.
              </p>
            </div>
          )}
          
          {explanation.llmRationale && (
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Bot className="h-4 w-4 text-primary" /> LLM Rationale
              </h4>
              <p className="text-sm text-muted-foreground ml-6 italic">
                "{explanation.llmRationale}"
              </p>
            </div>
          )}
        </div>
        <Separator />
        <SheetFooter className="pt-6">
          <div className="flex w-full justify-between">
            <Button variant="secondary">Reclassify</Button>
            <div className="flex gap-2">
                <Button variant="outline">Keep in Queue</Button>
                <Button variant="destructive">Confirm & Suppress</Button>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
