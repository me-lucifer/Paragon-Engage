

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Bot, BrainCircuit, GitCommit, Loader2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

type Result = {
  type: string;
  matchedRules: string[];
  mlScore: number;
  llmNote: string | null;
};

const intents = ['unsubscribe', 'ooo', 'bounce', 'positive', 'neutral', 'negative', 'referral'];
const rules = ['not interested', 'remove me', 'out of office', 'forwarded', 'unsubscribe'];
const unsubscribeKeywords = ['unsubscribe', 'remove me', 'opt out'];

function simulateClassification(text: string): Result {
  const lowerText = text.toLowerCase();
  
  // Simulate rule matching
  const matchedRules = rules.filter(rule => lowerText.includes(rule));

  // Simulate type detection
  let detectedType = intents[Math.floor(Math.random() * intents.length)];
  if (unsubscribeKeywords.some(keyword => lowerText.includes(keyword))) {
    detectedType = 'unsubscribe';
  } else if (matchedRules.includes('out of office')) {
    detectedType = 'ooo';
  } else if (lowerText.includes('interested') || lowerText.includes('let\'s talk')) {
    detectedType = 'positive';
  } else if (matchedRules.includes('not interested')) {
      detectedType = 'negative';
  }

  // Simulate ML score
  const mlScore = Math.random();

  // Simulate LLM note
  let llmNote = null;
  if (detectedType === 'unsubscribe') {
      llmNote = "Unsubscribe keyword is definitive and overrides other models.";
  } else if (detectedType === 'negative') {
      llmNote = "Strong negative signal detected. Marked for auto-suppression.";
  } else if (Math.random() > 0.5) {
      llmNote = "The user expressed curiosity about pricing but did not commit to a meeting.";
  }


  return {
    type: detectedType,
    matchedRules,
    mlScore: parseFloat(mlScore.toFixed(2)),
    llmNote,
  };
}


export function ClassifierTestTool() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText) return;
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const simulatedResult = simulateClassification(inputText);
      setResult(simulatedResult);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Input Text</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="classifier-input">Text to classify</Label>
              <Textarea
                id="classifier-input"
                rows={10}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste email body or other text here..."
              />
            </div>
            <Button type="submit" disabled={loading || !inputText}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Classifying...' : 'Run Classification'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Classification Result</CardTitle>
          <CardDescription>The output of the classification model.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex items-center justify-center h-48 text-muted-foreground">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              <p>Running models...</p>
            </div>
          )}
          {result && !loading && (
            <div className="space-y-6">
              <div>
                <Label className="text-xs uppercase text-muted-foreground">Detected Type</Label>
                <Badge className="text-lg" variant={result.type === 'negative' || result.type === 'unsubscribe' ? 'destructive' : 'default'}>{result.type}</Badge>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                    <GitCommit className="h-4 w-4 text-primary" /> Matched Rules
                </h4>
                {result.matchedRules.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {result.matchedRules.map(rule => (
                            <Badge key={rule} variant="secondary">{rule}</Badge>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">No rules matched.</p>
                )}
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                    <BrainCircuit className="h-4 w-4 text-primary" /> ML Score
                </h4>
                <p className="text-sm">
                    The model assigned a score of <span className="font-semibold text-foreground">{result.mlScore}</span>.
                </p>
              </div>

              {result.llmNote && (
                <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                        <Bot className="h-4 w-4 text-primary" /> LLM Note
                    </h4>
                    <p className="text-sm text-muted-foreground italic">"{result.llmNote}"</p>
                </div>
              )}
            </div>
          )}
           {!result && !loading && (
             <div className="flex items-center justify-center h-48 text-muted-foreground">
                <p>Results will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
