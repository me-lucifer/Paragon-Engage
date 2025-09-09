'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { handleRecommendContent } from '@/app/(app)/recommendations/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Lightbulb, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const initialState = {
  recommendations: [],
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        'Get Recommendations'
      )}
    </Button>
  );
}

export default function RecommendationsForm() {
  const [state, formAction] = useFormState(handleRecommendContent, initialState);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form action={formAction} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="userProfile">User Profile</Label>
          <Textarea
            id="userProfile"
            name="userProfile"
            placeholder="e.g., Marketing manager in a B2B SaaS company, interested in lead generation and analytics."
            rows={5}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="userBehavior">User Behavior</Label>
          <Textarea
            id="userBehavior"
            name="userBehavior"
            placeholder="e.g., Viewed articles on 'Advanced SEO Techniques' and 'Email Marketing Best Practices'. Spent 15 minutes on the pricing page."
            rows={5}
            required
          />
        </div>
        <SubmitButton />
      </form>
      
      <div className="space-y-6">
        {state?.error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
            </Alert>
        )}
        
        {state?.recommendations && state.recommendations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {state.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Lightbulb className="h-3 w-3" />
                    </div>
                    <span className="flex-1 text-sm text-foreground">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
