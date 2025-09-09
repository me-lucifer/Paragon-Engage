
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
      name: 'HF/AM Q4 Pipeline Lift',
      segment: 'Hedge Funds & Asset Managers',
      status: 'Active',
      dailyCap: '1150/1200',
      openRate: '55%',
      replyRate: '8%',
      positiveIntent: '2.1%',
      owner: 'A. Bhandari',
    },
    {
      name: 'Boards & IR Warm Intro',
      segment: 'Corporate Boards & IR',
      status: 'Paused',
      dailyCap: '300/600',
      openRate: '72%',
      replyRate: '18%',
      positiveIntent: '6.5%',
      owner: 'J. Doe',
    },
    {
      name: 'PE Platforms Discovery',
      segment: 'Private Equity Firms',
      status: 'Draft',
      dailyCap: 'N/A',
      openRate: 'N/A',
      replyRate: 'N/A',
      positiveIntent: 'N/A',
      owner: 'A. Bhandari',
    },
     {
      name: 'IT MSP Engagement',
      segment: 'IT MSPs',
      status: 'Active',
      dailyCap: '495/500',
      openRate: '58%',
      replyRate: '9%',
      positiveIntent: '2.5%',
      owner: 'J. Doe',
    },
    {
      name: 'Dental Clinic Welcome',
      segment: 'Dental Clinics',
      status: 'Paused',
      dailyCap: '80/100',
      openRate: '71%',
      replyRate: '15%',
      positiveIntent: '5%',
      owner: 'System',
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
          <Button>
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
