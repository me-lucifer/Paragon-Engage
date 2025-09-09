
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
      name: 'Q3 CPA Outreach',
      segment: 'Accounting (CPAs)',
      status: 'Active',
      dailyCap: '480/500',
      openRate: '62%',
      replyRate: '11%',
      positiveIntent: '3%',
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
     {
      name: 'New CPA Prospects',
      segment: 'Accounting (CPAs)',
      status: 'Draft',
      dailyCap: 'N/A',
      openRate: 'N/A',
      replyRate: 'N/A',
      positiveIntent: 'N/A',
      owner: 'A. Bhandari',
    },
    {
      name: 'US IT Services Push',
      segment: 'IT MSPs',
      status: 'Active',
      dailyCap: '350/400',
      openRate: '65%',
      replyRate: '14%',
      positiveIntent: '4%',
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
