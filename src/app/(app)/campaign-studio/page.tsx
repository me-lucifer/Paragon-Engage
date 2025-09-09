

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
  import { Badge } from '@/components/ui/badge';
  import { Button } from '@/components/ui/button';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
  import { PlusCircle } from 'lucide-react';
  
  const campaignsData = [
    {
      name: 'Q3 Investor Outreach',
      segment: 'Hedge Funds & Asset Managers',
      status: 'Active',
      dailyCap: '500/500',
      openRate: '68%',
      replyRate: '12%',
      positiveIntent: '4%',
      owner: 'A. Bhandari',
    },
    {
      name: 'New Board Member Welcome',
      segment: 'Corporate Boards & IR',
      status: 'Paused',
      dailyCap: '100/100',
      openRate: '75%',
      replyRate: '18%',
      positiveIntent: '6%',
      owner: 'System',
    },
    {
      name: 'PE Deal Sourcing - Fintech',
      segment: 'Private Equity Firms',
      status: 'Draft',
      dailyCap: 'N/A',
      openRate: 'N/A',
      replyRate: 'N/A',
      positiveIntent: 'N/A',
      owner: 'A. Bhandari',
    },
     {
      name: 'Web3 VC Engagement',
      segment: 'Crypto VCs',
      status: 'Active',
      dailyCap: '450/500',
      openRate: '55%',
      replyRate: '8%',
      positiveIntent: '2%',
      owner: 'J. Doe',
    },
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
  
        <Card>
            <CardHeader>
                <CardTitle>All Campaigns</CardTitle>
                <CardDescription>An overview of all your campaigns.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Segment</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Daily Cap</TableHead>
                            <TableHead>Open %</TableHead>
                            <TableHead>Reply %</TableHead>
                            <TableHead>Positive Intent %</TableHead>
                            <TableHead>Owner</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {campaignsData.map((campaign) => (
                            <TableRow key={campaign.name}>
                                <TableCell className="font-medium">{campaign.name}</TableCell>
                                <TableCell>{campaign.segment}</TableCell>
                                <TableCell>
                                    <Badge
                                    variant={
                                        campaign.status === 'Active' ? 'default'
                                        : campaign.status === 'Paused' ? 'secondary'
                                        : 'outline'
                                    }
                                    className={campaign.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                                    >
                                    {campaign.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{campaign.dailyCap}</TableCell>
                                <TableCell>{campaign.openRate}</TableCell>
                                <TableCell>{campaign.replyRate}</TableCell>
                                <TableCell>{campaign.positiveIntent}</TableCell>
                                <TableCell>{campaign.owner}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    );
  }
  
