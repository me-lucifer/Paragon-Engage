
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ChevronRight, FileDown, HelpCircle, Rocket, ShieldCheck, Target } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useEffect, useState } from 'react';

const enrichmentRules = {
  emailDiscovery: ['Hunter', 'Apollo', 'Clearbit'],
  validationThresholds: 'Must be valid or catch-all with confidence >= 0.75',
  roleTargeting: ['Owner', 'Founder', 'Managing Partner', 'CFO', 'Head of IR', 'CIO', 'Dentist'],
};

function getDaysAgo(maxDays: number): string {
    const days = Math.floor(Math.random() * maxDays) + 1;
    return `${days}d ago`;
}

const initialSampleResults = [
  { name: 'Sarah Chen', email: 's.chen@precision...com', confidence: 95, source: 'Apollo', lastSeen: '' },
  { name: 'David Lee', email: 'david.l@keystone...com', confidence: 88, source: 'Hunter', lastSeen: '' },
  { name: 'Kevin Brown', email: 'kevin@secureit...com', confidence: 99, source: 'Clearbit', lastSeen: '' },
  { name: 'Dr. A. Williams', email: 'dr.williams@bright...com', confidence: 92, source: 'Apollo', lastSeen: '' },
  { name: 'Lukas Weber', email: 'lukas@eurobalance...de', confidence: 78, source: 'Hunter', lastSeen: '' },
];

export default function EnrichmentPage() {
    const [sampleResults, setSampleResults] = useState(initialSampleResults);

    useEffect(() => {
        setSampleResults(initialSampleResults.map(result => ({
            ...result,
            lastSeen: getDaysAgo(90)
        })));
    }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Data Enrichment
          </h1>
          <p className="text-muted-foreground">
            Define rules and test your data enrichment profiles.
          </p>
        </div>
        <Button>
          <FileDown className="mr-2 h-4 w-4" /> Save as Enrichment Profile v1
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Enrichment Rule Stack</CardTitle>
            <CardDescription>
              Define the priority and criteria for data enrichment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-primary" />
                    <span>Email Discovery Priority</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal list-inside space-y-2 pl-2">
                    {enrichmentRules.emailDiscovery.map((source, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="font-medium text-primary">{index + 1}.</span>
                        <span>{source}</span>
                      </li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <span>Validation Thresholds</span>
                     <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <div>
                                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help ml-1" />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="max-w-xs">
                                    Set the minimum confidence score for email validation. A "catch-all" server accepts all emails, making verification difficult. Requiring a high confidence score for catch-all domains reduces bounces.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="pl-2">{enrichmentRules.validationThresholds}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                    <div className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        <span>Role Targeting</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-wrap gap-2 pl-2">
                        {enrichmentRules.roleTargeting.map(role => (
                            <Badge key={role} variant="secondary">{role}</Badge>
                        ))}
                    </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Batch Tester</CardTitle>
                    <CardDescription>
                    Paste up to 20 domains to run enrichment and see results.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea
                    placeholder="precisionaccounts.com&#10;secureitsolutions.com&#10;brightsmiledental.com"
                    rows={5}
                    />
                    <Button className="w-full">
                        Run Enrichment <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Test Results</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Contact</TableHead>
                                <TableHead>Confidence</TableHead>
                                <TableHead>Source</TableHead>
                                <TableHead>Last Seen</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sampleResults.map(result => (
                                <TableRow key={result.email}>
                                    <TableCell>
                                        <div className="font-medium">{result.name}</div>
                                        <div className="text-xs text-muted-foreground">{result.email}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={result.confidence > 90 ? 'default' : 'secondary'}
                                            className={result.confidence > 90 ? 'bg-green-100 text-green-800' : ''}>
                                            {result.confidence}%
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{result.source}</TableCell>
                                    <TableCell>{result.lastSeen}</TableCell>
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
