import RecommendationsForm from '@/components/recommendations-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function RecommendationsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          AI Content Recommendations
        </h1>
        <p className="text-muted-foreground">
          Leverage AI to recommend relevant content to users based on their profiles and behavior.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recommendation Tool</CardTitle>
          <CardDescription>
            Enter user details and recent activity to generate personalized content suggestions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecommendationsForm />
        </CardContent>
      </Card>
    </div>
  );
}
