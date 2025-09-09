
'use client';

import { useState } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const fitProfiles = {
  conservative: {
    name: 'Conservative',
    threshold: 78,
    weights: { fte: 7, seniority: 9, industry: 8, geo: 6, sentiment: 5, hiring: 8, tech: 7, growth: 9, ownership: 4, recency: 6 },
  },
  balanced: {
    name: 'Balanced',
    threshold: 65,
    weights: { fte: 6, seniority: 7, industry: 7, geo: 7, sentiment: 6, hiring: 7, tech: 6, growth: 7, ownership: 5, recency: 7 },
  },
  aggressive: {
    name: 'Aggressive',
    threshold: 52,
    weights: { fte: 5, seniority: 5, industry: 6, geo: 8, sentiment: 7, hiring: 6, tech: 5, growth: 6, ownership: 6, recency: 8 },
  },
};

const scoringCriteria = [
    { id: 'fte', label: 'FTE Band Match', icon: <Users className="h-5 w-5 text-primary" /> },
    { id: 'seniority', label: 'Owner Seniority/Age Proxy', icon: <Star className="h-5 w-5 text-primary" /> },
    { id: 'industry', label: 'Industry Niche Match', icon: <Building className="h-5 w-5 text-primary" /> },
    { id: 'geo', label: 'Geography Preference', icon: <Globe className="h-5 w-5 text-primary" /> },
    { id: 'sentiment', label: 'Review Sentiment', icon: <Smile className="h-5 w-5 text-primary" /> },
    { id: 'hiring', label: 'Hiring Velocity', icon: <TrendingUp className="h-5 w-5 text-primary" /> },
    { id: 'tech', label: 'Tech Signals', icon: <Cpu className="h-5 w-5 text-primary" /> },
    { id: 'growth', label: 'Growth Proxies', icon: <TrendingUp className="h-5 w-5 text-primary" /> },
    { id: 'ownership', label: 'Ownership Concentration', icon: <BrainCircuit className="h-5 w-5 text-primary" /> },
    { id: 'recency', label: 'Website Recency', icon: <Calendar className="h-5 w-5 text-primary" /> },
];

const allCompanies = [
  { name: 'Secure IT Solutions', score: 98, explanation: { fte: 10, seniority: 10, industry: 9, geo: 9, sentiment: 10, hiring: 10, tech: 10, growth: 10, ownership: 10, recency: 10 } },
  { name: 'Precision Accounts', score: 95, explanation: { fte: 9, seniority: 10, industry: 9, geo: 10, sentiment: 9, hiring: 9, tech: 10, growth: 9, ownership: 10, recency: 10 } },
  { name: 'Cloud Cover MSP', score: 92, explanation: { fte: 9, seniority: 9, industry: 10, geo: 8, sentiment: 9, hiring: 10, tech: 9, growth: 9, ownership: 9, recency: 10 } },
  { name: 'Bright Smile Dental', score: 89, explanation: { fte: 10, seniority: 8, industry: 8, geo: 9, sentiment: 8, hiring: 9, tech: 9, growth: 10, ownership: 8, recency: 10 } },
  { name: 'Keystone CPA', score: 88, explanation: { fte: 8, seniority: 9, industry: 9, geo: 8, sentiment: 9, hiring: 8, tech: 8, growth: 9, ownership: 10, recency: 10 } },
  { name: 'Proactive Tech', score: 87, explanation: { fte: 9, seniority: 8, industry: 9, geo: 8, sentiment: 8, hiring: 9, tech: 8, growth: 9, ownership: 9, recency: 10 } },
  { name: 'Veritas Financials', score: 85, explanation: { fte: 8, seniority: 8, industry: 8, geo: 9, sentiment: 9, hiring: 8, tech: 9, growth: 8, ownership: 10, recency: 10 } },
  { name: 'Summit Tax', score: 75, explanation: { fte: 7, seniority: 8, industry: 8, geo: 7, sentiment: 7, hiring: 7, tech: 7, growth: 8, ownership: 9, recency: 7 } },
  { name: 'EuroBalance', score: 72, explanation: { fte: 6, seniority: 7, industry: 7, geo: 8, sentiment: 8, hiring: 6, tech: 7, growth: 7, ownership: 8, recency: 8 } },
  { name: 'Maple Leaf Tax', score: 68, explanation: { fte: 7, seniority: 6, industry: 7, geo: 7, sentiment: 6, hiring: 7, tech: 6, growth: 7, ownership: 8, recency: 7 } },
  { name: 'Apex Audit', score: 64, explanation: { fte: 6, seniority: 6, industry: 6, geo: 7, sentiment: 7, hiring: 6, tech: 6, growth: 6, ownership: 7, recency: 7 } },
  { name: 'Golden Gate CPA', score: 58, explanation: { fte: 5, seniority: 6, industry: 6, geo: 6, sentiment: 5, hiring: 6, tech: 6, growth: 6, ownership: 6, recency: 6 } },
  { name: 'Pacific Coast Tax', score: 55, explanation: { fte: 6, seniority: 5, industry: 5, geo: 6, sentiment: 6, hiring: 5, tech: 5, growth: 5, ownership: 7, recency: 5 } },
  { name: 'Alpha Omega Advisors', score: 49, explanation: { fte: 4, seniority: 5, industry: 5, geo: 5, sentiment: 4, hiring: 5, tech: 5, growth: 5, ownership: 6, recency: 5 } },
];


export default function FitScoringPage() {
  const [activeProfile, setActiveProfile] = useState<keyof typeof fitProfiles>('balanced');
  const [weights, setWeights] = useState(fitProfiles[activeProfile].weights);

  const handleProfileChange = (profile: string) => {
    const newProfile = profile as keyof typeof fitProfiles;
    setActiveProfile(newProfile);
    setWeights(fitProfiles[newProfile].weights);
  };
  
  const handleSliderChange = (id: string, value: number[]) => {
    setWeights(prev => ({...prev, [id]: value[0]}));
  };

  const currentProfile = fitProfiles[activeProfile];
  const filteredCompanies = allCompanies.filter(c => c.score >= currentProfile.threshold);


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

       <Tabs value={activeProfile} onValueChange={handleProfileChange}>
        <TabsList className="grid w-full grid-cols-3 sm:w-auto sm:grid-cols-3 mb-4">
          <TabsTrigger value="conservative">Conservative (≥{fitProfiles.conservative.threshold})</TabsTrigger>
          <TabsTrigger value="balanced">Balanced (≥{fitProfiles.balanced.threshold})</TabsTrigger>
          <TabsTrigger value="aggressive">Aggressive (≥{fitProfiles.aggressive.threshold})</TabsTrigger>
        </TabsList>

        <div className="grid gap-6 lg:grid-cols-2">
            <Card>
            <CardHeader>
                <CardTitle>Training Rubrics: "{currentProfile.name}" Profile</CardTitle>
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
                        value={[weights[criterion.id as keyof typeof weights]]}
                        onValueChange={(value) => handleSliderChange(criterion.id, value)}
                        max={10}
                        step={1}
                        className="flex-1"
                    />
                    <span className="w-8 text-right text-sm font-medium text-primary">
                        {weights[criterion.id as keyof typeof weights]}
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

            <div className="space-y-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Live Preview</CardTitle>
                            <CardDescription>
                                {filteredCompanies.length} companies match the ≥{currentProfile.threshold} threshold.
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
                            {filteredCompanies.map((company) => (
                            <TableRow key={company.name}>
                                <TableCell className="font-medium">{company.name}</TableCell>
                                <TableCell className="text-center">
                                    <Badge className="text-lg" variant={company.score > 90 ? 'default' : company.score > 75 ? 'secondary' : 'outline'}>{company.score}</Badge>
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
      </Tabs>
    </div>
  );
}
