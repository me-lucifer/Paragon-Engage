

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Building, Briefcase, Target } from 'lucide-react';
import Link from 'next/link';

const segmentsData = [
  {
    id: 'accounting-cpas',
    name: 'Accounting (CPAs)',
    count: '60,210',
    icon: <Users className="h-8 w-8 text-primary" />,
    rules: [
      { type: 'Fit Score (Balanced)', values: ['≥65'] },
      { type: 'Roles', values: ['CPA', 'Managing Partner', 'Accountant', 'Tax Advisor'] },
      { type: 'Firm Size', values: ['5-50'] },
      { type: 'Region', values: ['US', 'CA', 'EU'] },
    ],
  },
  {
    id: 'it-msps',
    name: 'IT MSPs',
    count: '45,800',
    icon: <Building className="h-8 w-8 text-primary" />,
    rules: [
      { type: 'Fit Score (Balanced)', values: ['≥65'] },
      { type: 'Roles', values: ['CIO', 'IT Director', 'Owner', 'Head of Technology'] },
      { type: 'Firm Size', values: ['5-50'] },
      { type: 'Region', values: ['US', 'CA', 'EU'] },
    ],
  },
  {
    id: 'dental-clinics',
    name: 'Dental Clinics',
    count: '78,150',
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    rules: [
       { type: 'Fit Score (Balanced)', values: ['≥65'] },
      { type: 'Roles', values: ['Dentist', 'Owner', 'Clinic Manager'] },
      { type: 'Firm Size', values: ['5-50'] },
      { type: 'Region', values: ['US', 'CA', 'EU'] },
    ],
  },
];

export default function SegmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Segments
        </h1>
        <p className="text-muted-foreground">
          Define and manage your target audiences.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {segmentsData.map((segment) => (
          <Card key={segment.name} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start gap-4">
                {segment.icon}
                <div className="flex-1">
                  <CardTitle>{segment.name}</CardTitle>
                  <CardDescription>{segment.count} contacts</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
               <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-sm">Rules</h4>
                    <Link href="/fit-scoring">
                        <Button variant="link" className="p-0 h-auto text-xs">
                            <Target className="mr-1.5 h-3 w-3" />
                            View in Fit Scoring
                        </Button>
                    </Link>
                </div>
              <div className="space-y-2">
                {segment.rules.map((rule) => (
                  <div key={rule.type}>
                    <p className="text-xs font-medium text-muted-foreground">{rule.type}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {rule.values.map(value => (
                        <Badge key={value} variant={rule.type.includes('Fit Score') ? 'default' : 'secondary'}>{value}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
               <Link href={`/campaign-studio?fromSegment=${segment.id}`} className="w-full">
                <Button className="w-full">
                    Send to Campaign Studio <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
