
'use client';

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
import { PlusCircle, Edit, Play, Pause } from 'lucide-react';
import SequenceEditorSheet from '@/components/sequence-editor-sheet';
import { useState } from 'react';
import { useDeliverability } from '@/hooks/use-deliverability';
import { WarningBanner } from '@/components/warning-banner';
import { CampaignPreflightDialog, InboxIssue } from '@/components/campaign-preflight-dialog';

const campaignsData = [
  {
    id: 'q4-pipeline-lift',
    name: 'HF/AM Q4 Pipeline Lift',
    segment: 'Hedge Funds & Asset Managers',
    status: 'Active',
    dailyCap: '1150/1200',
    openRate: '55%',
    replyRate: '8%',
    positiveIntent: '2.1%',
    owner: 'A. Bhandari',
    sequenceName: 'HF-AM Intro (A/B Test)',
    inboxPool: ['sales@paragon.com', 'outreach@paragon.com'],
  },
  {
    id: 'boards-ir-warm-intro',
    name: 'Boards & IR Warm Intro',
    segment: 'Corporate Boards & IR',
    status: 'Paused',
    dailyCap: '300/600',
    openRate: '72%',
    replyRate: '18%',
    positiveIntent: '6.5%',
    owner: 'J. Doe',
    sequenceName: 'Boards/IR Intro (A/B Test)',
    inboxPool: ['sales@paragon.com', 'contact@paragon.net'],
  },
  {
    id: 'pe-platforms-discovery',
    name: 'PE Platforms Discovery',
    segment: 'Private Equity Firms',
    status: 'Draft',
    dailyCap: 'N/A',
    openRate: 'N/A',
    replyRate: 'N/A',
    positiveIntent: 'N/A',
    owner: 'A. Bhandari',
    sequenceName: 'PE Intro (A/B Test)',
    inboxPool: ['backup@paragon.org'],
  },
  {
    id: 'it-msp-engagement',
    name: 'IT MSP Engagement',
    segment: 'IT MSPs',
    status: 'Active',
    dailyCap: '495/500',
    openRate: '58%',
    replyRate: '9%',
    positiveIntent: '2.5%',
    owner: 'J. Doe',
    sequenceName: 'IT MSP Intro v1',
    inboxPool: ['outreach@paragon.com'],
  },
  {
    id: 'dental-clinic-welcome',
    name: 'Dental Clinic Welcome',
    segment: 'Dental Clinics',
    status: 'Paused',
    dailyCap: '80/100',
    openRate: '71%',
    replyRate: '15%',
    positiveIntent: '5%',
    owner: 'System',
    sequenceName: 'Dental Welcome v1',
    inboxPool: ['contact@paragon.net'],
  },
];

const allInboxes = [
  { email: 'sales@paragon.com', health: 98, authPassing: true },
  { email: 'outreach@paragon.com', health: 95, authPassing: true },
  { email: 'contact@paragon.net', health: 75, authPassing: true },
  { email: 'backup@paragon.org', health: 50, authPassing: false },
];

type Campaign = (typeof campaignsData)[0];

export default function CampaignStudioPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isPreflightOpen, setIsPreflightOpen] = useState(false);
  const [preflightIssues, setPreflightIssues] = useState<InboxIssue[]>([]);
  const { isHealthPoor } = useDeliverability();

  const handleEditSequence = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsSheetOpen(true);
  };

  const handleSheetOpenChange = (open: boolean) => {
    setIsSheetOpen(open);
    if (!open) {
      setSelectedCampaign(null);
    }
  };
  
  const handleStartCampaign = (campaign: Campaign) => {
    const issues: InboxIssue[] = [];
    campaign.inboxPool.forEach(inboxEmail => {
        const inbox = allInboxes.find(i => i.email === inboxEmail);
        if (inbox) {
            const currentIssues: string[] = [];
            if (inbox.health < 70) {
                currentIssues.push(`Health is ${inbox.health}% (below 70%)`);
            }
            if (!inbox.authPassing) {
                currentIssues.push("Authentication not passing");
            }
            if (currentIssues.length > 0) {
                issues.push({ email: inbox.email, issues: currentIssues });
            }
        }
    });

    if (issues.length > 0) {
        setSelectedCampaign(campaign);
        setPreflightIssues(issues);
        setIsPreflightOpen(true);
    } else {
        // No issues, proceed to start the campaign
        console.log("Starting campaign:", campaign.name);
    }
  };

  return (
    <>
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

        {isHealthPoor && (
            <WarningBanner
                title="Fix deliverability before sending"
                message="Your inbox health is below the recommended threshold. Running campaigns may harm your domain reputation."
                actions={[
                    { href: '/deliverability', text: 'View Deliverability'},
                    { href: '/inbox-manager', text: 'Inbox Manager' },
                ]}
            />
        )}

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
                  <TableHead>Actions</TableHead>
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
                    <TableCell className="space-x-2">
                       {campaign.status === 'Active' ? (
                          <Button variant="outline" size="sm">
                            <Pause className="mr-2 h-4 w-4" />
                            Pause
                          </Button>
                        ) : (
                           <Button variant="outline" size="sm" onClick={() => handleStartCampaign(campaign)}>
                            <Play className="mr-2 h-4 w-4" />
                            Start
                          </Button>
                        )}
                      <Button variant="outline" size="sm" onClick={() => handleEditSequence(campaign)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      {selectedCampaign && (
        <SequenceEditorSheet
          open={isSheetOpen}
          onOpenChange={handleSheetOpenChange}
          campaign={selectedCampaign}
        />
      )}
       {selectedCampaign && (
        <CampaignPreflightDialog
          open={isPreflightOpen}
          onOpenChange={setIsPreflightOpen}
          campaignName={selectedCampaign.name}
          issues={preflightIssues}
        />
      )}
    </>
  );
}
