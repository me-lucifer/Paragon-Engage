
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HelpCircle, Star, Users, Building, Globe, Smile, TrendingUp, Cpu, Calendar, BrainCircuit } from 'lucide-react';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface ExplainScoreDialogProps {
  company: {
    name: string;
    score: number;
    explanation: { [key: string]: number };
  };
  criteria: {
    id: string;
    label: string;
    icon: React.ReactNode;
  }[];
}

export default function ExplainScoreDialog({ company, criteria }: ExplainScoreDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <HelpCircle className="mr-2 h-4 w-4" /> Explain Score
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Score Explanation for {company.name}</DialogTitle>
          <DialogDescription>
            This company has a fit score of <Badge variant="default">{company.score}</Badge> based on your rubric.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {criteria.map((criterion) => (
            <div key={criterion.id} className="grid gap-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 font-medium text-muted-foreground">
                  {criterion.icon}
                  <span>{criterion.label}</span>
                </div>
                <span className="font-semibold text-primary">{company.explanation[criterion.id] || 0}/10</span>
              </div>
              <Progress value={(company.explanation[criterion.id] || 0) * 10} className="h-2" />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
