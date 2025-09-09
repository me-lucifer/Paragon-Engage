
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
import { ArrowRight, Users, Building, Briefcase } from 'lucide-react';

const segmentsData = [
  {
    name: 'Hedge Funds & Asset Managers',
    count: '18,420',
    icon: <Users className="h-8 w-8 text-primary" />,
    rules: [
      { type: 'Roles', values: ['Analyst', 'Portfolio Manager', 'Trader'] },
      { type: 'Firm Size', values: ['10-1000'] },
      { type: 'Region', values: ['Global'] },
    ],
  },
  {
    name: 'Corporate Boards & IR',
    count: '7,860',
    icon: <Building className="h-8 w-8 text-primary" />,
    rules: [
      { type: 'Roles', values: ['Board Member', 'Investor Relations', 'C-Level'] },
      { type: 'Firm Size', values: ['500+'] },
      { type: 'Region', values: ['North America', 'Europe'] },
    ],
  },
  {
    name: 'Private Equity Firms',
    count: '9,240',
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    rules: [
      { type: 'Roles', values: ['Partner', 'Associate', 'Analyst'] },
      { type: 'Firm Size', values: ['10-500'] },
      { type: 'Region', values: ['North America'] },
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
              <h4 className="font-semibold text-sm">Rules</h4>
              <div className="space-y-2">
                {segment.rules.map((rule) => (
                  <div key={rule.type}>
                    <p className="text-xs font-medium text-muted-foreground">{rule.type}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {rule.values.map(value => (
                        <Badge key={value} variant="secondary">{value}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                Send to Campaign Studio <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
