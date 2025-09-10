
'use client';

import { useState } from 'react';
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
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { PlusCircle, Inbox, RefreshCw, AlertCircle, HelpCircle } from 'lucide-react';
import InboxSettingsDialog from '@/components/inbox-settings-dialog';
import AddInboxWizard from '@/components/add-inbox-wizard';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const initialInboxes = [
  {
    email: 'sales@paragon.com',
    domain: 'paragon.com',
    provider: 'Google Workspace',
    healthFactors: { auth: 30, bounce: 25, spam: 25, warmup: 10, errors: 8 }, // 98
    fromName: 'Paragon Outreach',
    signature: 'Best,\nThe Paragon Team',
    warmup: {
        enabled: true,
        schedule: 'balanced',
    },
    dailySendCap: 500,
  },
  {
    email: 'outreach@paragon.com',
    domain: 'paragon.com',
    provider: 'Outlook 365',
    healthFactors: { auth: 30, bounce: 25, spam: 25, warmup: 10, errors: 5 }, // 95
    fromName: 'Paragon Outreach',
    signature: 'Best,\nThe Paragon Team',
     warmup: {
        enabled: true,
        schedule: 'balanced',
    },
    dailySendCap: 500,
  },
  {
    email: 'contact@paragon.net',
    domain: 'paragon.net',
    provider: 'Zoho Mail',
    healthFactors: { auth: 30, bounce: 20, spam: 15, warmup: 5, errors: 5 }, // 75
    fromName: 'Paragon Outreach',
    signature: 'Best,\nThe Paragon Team',
     warmup: {
        enabled: true,
        schedule: 'aggressive',
    },
    dailySendCap: 100,
  },
  {
    email: 'backup@paragon.org',
    domain: 'paragon.org',
    provider: 'Google Workspace',
    healthFactors: { auth: 0, bounce: 20, spam: 20, warmup: 10, errors: 0 }, // 50
    fromName: 'Paragon Outreach',
    signature: 'Best,\nThe Paragon Team',
     warmup: {
        enabled: false,
        schedule: 'conservative',
    },
    dailySendCap: 500,
  },
];

const calculateHealth = (factors: (typeof initialInboxes)[0]['healthFactors']) => {
    return Object.values(factors).reduce((acc, curr) => acc + curr, 0);
}

const getStatusFromHealth = (health: number) => {
    if (health >= 90) return 'Connected';
    if (health >= 70) return 'Warming';
    return 'Error';
}

export type Inbox = Omit<(typeof initialInboxes)[0], 'healthFactors'> & {
  status: string;
  health: number;
  dailyCap: string;
  healthFactors: (typeof initialInboxes)[0]['healthFactors'];
};


export default function InboxManagerPage() {
  const [inboxes, setInboxes] = useState<Inbox[]>(initialInboxes.map(ib => {
      const health = calculateHealth(ib.healthFactors);
      const status = getStatusFromHealth(health);
      return {
          ...ib,
          health,
          status,
          dailyCap: `${status === 'Error' ? 0 : status === 'Warming' ? Math.min(50, ib.dailySendCap) : Math.floor(Math.random() * 20 + 480)}/${ib.dailySendCap}`
      }
  }));
  const [selectedInbox, setSelectedInbox] = useState<Inbox | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAddWizardOpen, setIsAddWizardOpen] = useState(false);
  const { toast } = useToast();

  const handleOpenSettings = (inbox: Inbox) => {
    setSelectedInbox(inbox);
    setIsSettingsOpen(true);
  };

  const handleSaveSettings = (updatedInbox: Inbox) => {
    setInboxes(prev =>
      prev.map(ib => (ib.email === updatedInbox.email ? updatedInbox : ib))
    );
    setIsSettingsOpen(false);
  };

  const handleAddInbox = (newInboxData: Omit<Inbox, 'dailyCap' | 'status' | 'health'>) => {
    const health = calculateHealth(newInboxData.healthFactors);
    const status = getStatusFromHealth(health);
    const newInbox: Inbox = {
        ...newInboxData,
        health,
        status,
        dailyCap: `0/${newInboxData.dailySendCap}`,
    };
    setInboxes(prev => [...prev, newInbox]);
    setIsAddWizardOpen(false);
    toast({
        title: "Inbox Added",
        description: `${newInbox.email} is now being warmed up.`
    });
  }


  return (
    <>
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Inbox Manager
            </h1>
            <p className="text-muted-foreground">
              Connect and manage your sending inboxes.
            </p>
          </div>
          <Button onClick={() => setIsAddWizardOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Inbox
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {inboxes.map((inbox) => (
            <Card key={inbox.email}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Inbox className="h-6 w-6 text-primary" />
                    <div>
                      <CardTitle>{inbox.email}</CardTitle>
                      <CardDescription>{inbox.provider}</CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant={
                      inbox.status === 'Connected'
                        ? 'default'
                        : inbox.status === 'Warming'
                        ? 'secondary'
                        : 'destructive'
                    }
                    className={
                      inbox.status === 'Connected'
                        ? 'bg-green-100 text-green-800'
                        : inbox.status === 'Warming' ? 'bg-yellow-100 text-yellow-800' : ''
                    }
                  >
                    {inbox.status === 'Error' && (
                      <AlertCircle className="mr-1 h-3 w-3" />
                    )}
                    {inbox.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <Label
                        htmlFor={`health-${inbox.email}`}
                        className="text-sm font-medium"
                        >
                        Inbox Health
                        </Label>
                         <Tooltip>
                            <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <div className="p-2 space-y-2">
                                    <h4 className="font-semibold">Health Factors</h4>
                                    <div className="flex justify-between text-xs"><span className="text-muted-foreground">Auth Score (30%)</span> <span>{inbox.healthFactors.auth}/30</span></div>
                                    <div className="flex justify-between text-xs"><span className="text-muted-foreground">Bounce Rate (25%)</span> <span>{inbox.healthFactors.bounce}/25</span></div>
                                    <div className="flex justify-between text-xs"><span className="text-muted-foreground">Spam Rate (25%)</span> <span>{inbox.healthFactors.spam}/25</span></div>
                                    <div className="flex justify-between text-xs"><span className="text-muted-foreground">Warm-up (10%)</span> <span>{inbox.healthFactors.warmup}/10</span></div>
                                    <div className="flex justify-between text-xs"><span className="text-muted-foreground">Send Errors (10%)</span> <span>{inbox.healthFactors.errors}/10</span></div>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <span className="text-sm font-bold text-primary">
                      {inbox.health}%
                    </span>
                  </div>
                  <Progress
                    id={`health-${inbox.email}`}
                    value={inbox.health}
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <Label
                      htmlFor={`cap-${inbox.email}`}
                      className="text-sm font-medium"
                    >
                      Daily Send Cap
                    </Label>
                    <span className="text-sm text-muted-foreground">
                      {inbox.dailyCap}
                    </span>
                  </div>
                  <Progress
                    id={`cap-${inbox.email}`}
                    value={
                      (parseInt(inbox.dailyCap.split('/')[0]) /
                        parseInt(inbox.dailyCap.split('/')[1])) *
                      100
                    }
                    className="h-2"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 border-t pt-4">
                <Button variant="ghost" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" /> Refresh
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleOpenSettings(inbox)}>
                  Settings
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      </TooltipProvider>
      {selectedInbox && (
        <InboxSettingsDialog
          open={isSettingsOpen}
          onOpenChange={setIsSettingsOpen}
          inbox={selectedInbox}
          onSave={handleSaveSettings}
        />
      )}
       <AddInboxWizard
        open={isAddWizardOpen}
        onOpenChange={setIsAddWizardOpen}
        onAddInbox={handleAddInbox}
      />
    </>
  );
}
