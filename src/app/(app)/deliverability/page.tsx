

'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MailCheck, ShieldCheck, AlertTriangle, Inbox, CheckCircle, HelpCircle, Info } from 'lucide-react';
import ReportsChart from '@/components/reports-chart';
import { useIntegrationStatus } from '@/hooks/use-integration-status';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { WarningBanner } from '@/components/warning-banner';
import { DnsSetupHelper } from '@/components/dns-setup-helper';
import { DmarcPolicyPlanner } from '@/components/dmarc-policy-planner';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { SeedInboxTestDialog } from '@/components/seed-inbox-test-dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const deliverabilityStats = [
  { id: 'inbox', title: 'Inbox Placement Rate', value: '98.2%', icon: <Inbox className="h-6 w-6 text-primary" />, progress: 98.2, domain: 'paragon.com', tooltip: '% of delivered emails that landed in Inbox, not Spam, over last 7 days.' },
  { id: 'spam', title: 'Spam Placement Rate', value: '1.1%', icon: <AlertTriangle className="h-6 w-6 text-yellow-500" />, progress: 1.1, domain: 'paragon.com', tooltip: '% of delivered emails that landed in Spam over last 7 days. Keep <5%.' },
  { id: 'bounce', title: 'Block/Bounce Rate', value: '0.7%', icon: <AlertTriangle className="h-6 w-6 text-red-500" />, progress: 0.7, domain: 'paragon.com', tooltip: '% of attempted sends rejected as soft/hard bounces. Keep <3%.' },
  { id: 'auth', title: 'Authentication', value: 'Passing', icon: <ShieldCheck className="h-6 w-6 text-green-500" />, status: 'Passing', domain: 'paragon.com', tooltip: 'SPF + DKIM must pass; DMARC set to p=none/quarantine/reject.' },
];

const initialIntegrationStates = {
    mailgun: true,
    sendgrid: false,
};


export default function DeliverabilityPage() {
    const { statuses: integrationStatuses } = useIntegrationStatus(initialIntegrationStates);
    const [lastTestTimestamp, setLastTestTimestamp] = useState<string | null>(null);
    const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);
    
    const isMailgunConnected = integrationStatuses.mailgun;
    const isSendgridConnected = integrationStatuses.sendgrid;
    const authProviderConnected = isMailgunConnected || isSendgridConnected;

    const handleTestComplete = () => {
        setLastTestTimestamp(new Date().toLocaleString());
    };

  return (
    <>
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Deliverability
        </h1>
        <p className="text-muted-foreground">
          Monitor and improve your email deliverability.
        </p>
      </div>
      
       {!authProviderConnected && (
            <WarningBanner
                title="No mail provider configured—sending disabled"
                message="Please connect Mailgun or SendGrid to enable email sending."
                actions={[{ href: '/settings?tab=integrations', text: 'Connect Provider' }]}
            />
        )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
            <TooltipProvider>
                <div className="grid gap-6 md:grid-cols-2">
                    {deliverabilityStats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                        {stat.icon}
                        <CardTitle className="text-base font-medium flex items-center gap-1">
                            {stat.title}
                            <Tooltip>
                            <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="max-w-xs">{stat.tooltip}</p>
                            </TooltipContent>
                            </Tooltip>
                        </CardTitle>
                        </CardHeader>
                        <CardContent>
                        {stat.progress !== undefined ? (
                            <>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <Progress value={stat.progress} className="mt-2 h-2" />
                            </>
                        ) : (
                            <Badge className={stat.status === 'Passing' ? 'bg-green-100 text-green-800' : ''}>{stat.status}</Badge>
                        )}
                        <div className="text-xs text-muted-foreground mt-2">{stat.domain}</div>
                        {stat.id === 'auth' && lastTestTimestamp && (
                            <p className="text-xs text-muted-foreground mt-1">Last test: {lastTestTimestamp}</p>
                        )}
                        </CardContent>
                        {stat.id === 'auth' && (
                            <>
                            <CardFooter>
                                <Button variant="secondary" className="w-full" onClick={() => setIsTestDialogOpen(true)}>
                                    Send Seed Test
                                </Button>
                            </CardFooter>
                             <Accordion type="single" collapsible className="w-full px-6 pb-2">
                                <AccordionItem value="item-1" className="border-b-0">
                                    <AccordionTrigger className="text-xs py-2 text-muted-foreground hover:no-underline">
                                        Hints
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="space-y-2 text-xs text-muted-foreground list-disc pl-4">
                                            <li>Make From: domain align with DKIM d= domain for DMARC pass.</li>
                                            <li>Use a custom tracking domain such as t.{stat.domain}.</li>
                                            <li>Keep SPF includes &lt; 10 to avoid DNS lookup limits.</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            </>
                        )}
                    </Card>
                    ))}
                </div>
            </TooltipProvider>

            <Card>
                <CardHeader>
                    <CardTitle>Inbox Placement by Mailbox Provider</CardTitle>
                    <CardDescription>Performance across major email providers for the last 7 days.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ReportsChart chartType="bar" />
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1 space-y-6">
            <DnsSetupHelper />
            <DmarcPolicyPlanner />
        </div>
      </div>
    </div>
     <SeedInboxTestDialog
        open={isTestDialogOpen}
        onOpenChange={setIsTestDialogOpen}
        onTestComplete={handleTestComplete}
      />
    </>
  );
}
