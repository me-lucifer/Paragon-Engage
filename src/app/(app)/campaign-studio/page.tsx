

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Play, Pause, BarChart3, Settings } from 'lucide-react';
import Link from 'next/link';

const campaigns = [
  {
    name: 'Q3 Investor Outreach',
    status: 'Active',
    stats: '5,210 Sent / 68% Open / 12% Reply',
    steps: 5,
    segment: 'Hedge Funds & Asset Managers'
  },
  {
    name: 'New Board Member Welcome',
    status: 'Paused',
    stats: '850 Sent / 75% Open / 18% Reply',
    steps: 3,
    segment: 'Corporate Boards & IR'
  },
  {
    name: 'PE Deal Sourcing - Fintech',
    status: 'Draft',
    stats: 'N/A',
    steps: 7,
    segment: 'Private Equity Firms'
  }
];

export default function CampaignStudioPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Campaign Studio
          </h1>
          <p className="text-muted-foreground">
            Design, launch, and manage your outreach campaigns.
          </p>
        </div>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
          <PlusCircle className="mr-2 h-4 w-4" /> New Campaign
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <Card key={campaign.name} className="flex flex-col">
            <CardHeader>
              <CardTitle>{campaign.name}</CardTitle>
              <div className="flex items-center gap-2 pt-1">
                 <Badge variant={
                    campaign.status === 'Active' ? 'default' :
                    campaign.status === 'Paused' ? 'secondary' : 'outline'
                 }
                 className={campaign.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                 >{campaign.status}</Badge>
                 <span className="text-sm text-muted-foreground">{campaign.segment}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Performance</p>
                <p>{campaign.stats}</p>
              </div>
               <div>
                <p className="text-sm font-medium text-muted-foreground">Steps</p>
                <p>{campaign.steps} steps in sequence</p>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
                <div className="flex w-full justify-between items-center">
                    <div>
                        <Button variant="ghost" size="icon" title="Run/Pause">
                            {campaign.status === 'Active' ? <Pause className="h-5 w-5"/> : <Play className="h-5 w-5"/>}
                        </Button>
                        <Button variant="ghost" size="icon" title="Reports">
                            <BarChart3 className="h-5 w-5"/>
                        </Button>
                    </div>
                    <Link href="#" passHref>
                        <Button variant="outline">
                            Edit Campaign <Settings className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
