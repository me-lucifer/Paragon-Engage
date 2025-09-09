
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, FilePlus, Copy, PlayCircle, Star, Target, Building, Users, Globe, Smile, TrendingUp, Cpu, BrainCircuit, Calendar, FileText } from 'lucide-react';
import ExplainScoreDialog from '@/components/explain-score-dialog';

const scoringCriteria = [
    { id: 'fte', label: 'FTE Band Match', icon: <Users className="h-5 w-5 text-primary" />, defaultValue: 8 },
    { id: 'seniority', label: 'Owner Seniority/Age Proxy', icon: <Star className="h-5 w-5 text-primary" />, defaultValue: 9 },
    { id: 'industry', label: 'Industry Niche Match', icon: <Building className="h-5 w-5 text-primary" />, defaultValue: 7 },
    { id: 'geo', label: 'Geography Preference', icon: <Globe className="h-5 w-5 text-primary" />, defaultValue: 6 },
    { id: 'sentiment', label: 'Review Sentiment', icon: <Smile className="h-5 w-5 text-primary" />, defaultValue: 5 },
    { id: 'hiring', label: 'Hiring Velocity', icon: <TrendingUp className="h-5 w-5 text-primary" />, defaultValue: 8 },
    { id: 'tech', label: 'Tech Signals', icon: <Cpu className="h-5 w-5 text-primary" />, defaultValue: 7 },
    { id: 'growth', label: 'Growth Proxies', icon: <TrendingUp className="h-5 w-5 text-primary" />, defaultValue: 9 },
    { id: 'ownership', label: 'Ownership Concentration', icon: <BrainCircuit className="h-5 w-5 text-primary" />, defaultValue: 4 },
    { id: 'recency', label: 'Website Recency', icon: <Calendar className="h-5 w-5 text-primary" />, defaultValue: 6 },
];

const sampleCompanies = [
  { name: 'QuantumLeap', score: 98, explanation: { fte: 10, seniority: 10, industry: 9, geo: 9, sentiment: 10, hiring: 10, tech: 10, growth: 10, ownership: 10, recency: 10 } },
  { name: 'InnovateHub', score: 95, explanation: { fte: 9, seniority: 10, industry: 9, geo: 10, sentiment: 9, hiring: 9, tech: 10, growth: 9, ownership: 10, recency: 10 } },
  { name: 'Synergy Corp', score: 92, explanation: { fte: 9, seniority: 9, industry: 10, geo: 8, sentiment: 9, hiring: 10, tech: 9, growth: 9, ownership: 9, recency: 10 } },
  { name: 'NextGen Solutions', score: 89, explanation: { fte: 10, seniority: 8, industry: 8, geo: 9, sentiment: 8, hiring: 9, tech: 9, growth: 10, ownership: 8, recency: 10 } },
  { name: 'Apex Enterprises', score: 88, explanation: { fte: 8, seniority: 9, industry: 9, geo: 8, sentiment: 9, hiring: 8, tech: 8, growth: 9, ownership: 10, recency: 10 } },
];

export default function FitScoringPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Fit Scoring Models
        </h1>
        <p className="text-muted-foreground">
          Train and apply your ideal customer profile rubrics.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Training Rubrics */}
        <Card>
          <CardHeader>
            <CardTitle>Training Rubrics: v2.1 "High-Growth Tech"</CardTitle>
            <CardDescription>
              Adjust the weights to refine your scoring model.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {scoringCriteria.map(criterion => (
              <div key={criterion.id} className="grid gap-2">
                <div className="flex items-center gap-2">
                  {criterion.icon}
                  <Label htmlFor={criterion.id} className="font-medium">{criterion.label}</Label>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    id={criterion.id}
                    defaultValue={[criterion.defaultValue]}
                    max={10}
                    step={1}
                    className="flex-1"
                  />
                  <span className="w-8 text-right text-sm font-medium text-primary">
                    {criterion.defaultValue}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
          <CardContent className="flex justify-end gap-2 border-t pt-6">
             <Button variant="outline">
              <FilePlus className="mr-2" /> Clone Profile
            </Button>
            <Button>
              <Copy className="mr-2" /> Save Profile
            </Button>
          </CardContent>
        </Card>

        {/* Live Preview */}
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Live Preview</CardTitle>
                        <CardDescription>
                            Top 50 matching companies based on the current rubric.
                        </CardDescription>
                    </div>
                    <Button variant="secondary">
                        <PlayCircle className="mr-2" /> Test on Sample
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-center">Fit Score</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sampleCompanies.map((company) => (
                        <TableRow key={company.name}>
                            <TableCell className="font-medium">{company.name}</TableCell>
                            <TableCell className="text-center">
                                <Badge className="text-lg" variant={company.score > 90 ? 'default' : 'secondary'}>{company.score}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <ExplainScoreDialog company={company} criteria={scoringCriteria} />
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
