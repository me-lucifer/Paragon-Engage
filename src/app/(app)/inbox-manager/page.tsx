
'use client';

import { useState, useEffect } from 'react';
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
import { PlusCircle, Inbox, RefreshCw, AlertCircle, HelpCircle, Loader2, Pencil, Save } from 'lucide-react';
import InboxSettingsDialog from '@/components/inbox-settings-dialog';
import AddInboxWizard from '@/components/add-inbox-wizard';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { InboxHealthSheet } from '@/components/inbox-health-sheet';
import { Slider } from '@/components/ui/slider';

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
        schedule: 'balanced' as "conservative" | "balanced" | "aggressive",
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
        schedule: 'balanced' as "conservative" | "balanced" | "aggressive",
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
        schedule: 'aggressive' as "conservative" | "balanced" | "aggressive",
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
        schedule: 'conservative' as "conservative" | "balanced" | "aggressive",
    },
    dailySendCap: 500,
  },
];

const WARMUP_CAPS = {
  conservative: 50,
  balanced: 100,
  aggressive: 200,
};

const calculateHealth = (factors: (typeof initialInboxes)[0]['healthFactors']) => {
    return Object.values(factors).reduce((acc, curr) => acc + curr, 0);
}

const getStatusFromHealth = (health: number) => {
    if (health >= 90) return 'Connected';
    if (health >= 70) return 'Warming';
    return 'Error';
}

export type Inbox = {
  email: string;
  domain: string;
  provider: string;
  healthFactors: { auth: number; bounce: number; spam: number; warmup: number; errors: number; };
  fromName: string;
  signature: string;
  warmup: {
      enabled: boolean;
      schedule: "conservative" | "balanced" | "aggressive";
  };
  dailySendCap: number;
  status: string;
  health: number;
  dailyCapUsed: number;
};


export default function InboxManagerPage() {
  const [inboxes, setInboxes] = useState<Inbox[]>(initialInboxes.map(ib => {
      const health = calculateHealth(ib.healthFactors);
      const status = getStatusFromHealth(health);
      const dailyCapUsed = status === 'Error' ? 0 : status === 'Warming' ? Math.floor(health / 2) : Math.floor((health / 100) * ib.dailySendCap * 0.95);
      return {
          ...ib,
          health,
          status,
          dailyCapUsed
      }
  }));
  const [selectedInbox, setSelectedInbox] = useState<Inbox | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHealthSheetOpen, setIsHealthSheetOpen] = useState(false);
  const [isAddWizardOpen, setIsAddWizardOpen] = useState(false);
  const [refreshingInbox, setRefreshingInbox] = useState<string | null>(null);
  const [editingCap, setEditingCap] = useState<string | null>(null);
  const [tempCap, setTempCap] = useState(0);
  const { toast } = useToast();

  const handleOpenSettings = (inbox: Inbox) => {
    setSelectedInbox(inbox);
    setIsSettingsOpen(true);
  };
  
  const handleOpenHealthSheet = (inbox: Inbox) => {
    setSelectedInbox(inbox);
    setIsHealthSheetOpen(true);
  };

  const handleSaveInbox = (updatedInbox: Inbox) => {
    setInboxes(prev =>
      prev.map(ib => (ib.email === updatedInbox.email ? updatedInbox : ib))
    );
    // This can be called from either dialog
    setIsSettingsOpen(false);
    setIsHealthSheetOpen(false);
  };

  const handleAddInbox = (newInboxData: Omit<Inbox, 'dailyCapUsed' | 'status' | 'health'>) => {
    const health = calculateHealth(newInboxData.healthFactors);
    const status = getStatusFromHealth(health);
    const newInbox: Inbox = {
        ...newInboxData,
        health,
        status,
        dailyCapUsed: 0,
    };
    setInboxes(prev => [...prev, newInbox]);
    setIsAddWizardOpen(false);
    toast({
        title: "Inbox Added",
        description: `${newInbox.email} is now being warmed up.`
    });
  }

  const handleRefresh = (email: string) => {
    setRefreshingInbox(email);
    setTimeout(() => {
        setInboxes(prev => prev.map(inbox => {
            if (inbox.email === email) {
                // Simulate new data
                const newHealthFactors = {
                    auth: Math.random() > 0.1 ? 30 : 0,
                    bounce: Math.floor(Math.random() * 26),
                    spam: Math.floor(Math.random() * 26),
                    warmup: Math.floor(Math.random() * 11),
                    errors: Math.floor(Math.random() * 11),
                };
                const newHealth = calculateHealth(newHealthFactors);
                const newStatus = getStatusFromHealth(newHealth);
                const newDailyUsed = newStatus === 'Error' ? 0 : newStatus === 'Warming' ? Math.floor(newHealth / 2) : Math.floor((newHealth / 100) * inbox.dailySendCap * 0.95);
                
                return {
                    ...inbox,
                    healthFactors: newHealthFactors,
                    health: newHealth,
                    status: newStatus,
                    dailyCapUsed: newDailyUsed,
                }
            }
            return inbox;
        }));
        setRefreshingInbox(null);
    }, 1500);
  }

  const handleStartEditingCap = (inbox: Inbox) => {
      setEditingCap(inbox.email);
      setTempCap(inbox.dailySendCap);
  }

  const handleSaveCap = (email: string) => {
      setInboxes(prev => prev.map(inbox => {
          if (inbox.email === email) {
              return { ...inbox, dailySendCap: tempCap };
          }
          return inbox;
      }));
      setEditingCap(null);
      toast({
          title: "Daily Cap Updated",
          description: `Daily send cap for ${email} set to ${tempCap}.`,
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
          {inboxes.map((inbox) => {
            const warmupCap = inbox.warmup.enabled ? WARMUP_CAPS[inbox.warmup.schedule] : 1000;
            return (
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
                                <div className="p-2 space-y-2 max-w-xs">
                                    <h4 className="font-semibold">Health Score Formula</h4>
                                    <p className="text-xs text-muted-foreground">30% Auth + 25% Bounce + 25% Spam + 10% Warm-up + 10% Errors</p>
                                    <h4 className="font-semibold">Current Values</h4>
                                     <ul className="text-xs text-muted-foreground list-disc pl-4">
                                        <li>Auth: {inbox.healthFactors.auth > 0 ? 'Passing' : 'Failing'}</li>
                                        <li>Bounce Rate: {((25 - inbox.healthFactors.bounce) / 25 * 5).toFixed(1)}%</li>
                                        <li>Spam Rate: {((25 - inbox.healthFactors.spam) / 25 * 8).toFixed(1)}%</li>
                                        <li>Sending Errors (24h): {10-inbox.healthFactors.errors}</li>
                                    </ul>
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
                  {inbox.health < 90 && (
                    <Button variant="link" size="sm" className="p-0 h-auto text-xs mt-1" onClick={() => handleOpenHealthSheet(inbox)}>
                        Why is my health low?
                    </Button>
                  )}
                </div>
                <div>
                   <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <Label
                                htmlFor={`cap-${inbox.email}`}
                                className="text-sm font-medium"
                            >
                                Daily Send Cap
                            </Label>
                            {editingCap !== inbox.email && (
                                <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => handleStartEditingCap(inbox)}>
                                    <Pencil className="h-3 w-3 text-muted-foreground" />
                                </Button>
                            )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                            {editingCap === inbox.email ? tempCap : inbox.dailyCapUsed}/{inbox.dailySendCap}
                        </span>
                    </div>

                    {editingCap === inbox.email ? (
                        <div className="space-y-2">
                             <Slider
                                value={[tempCap]}
                                onValueChange={(value) => setTempCap(value[0])}
                                max={warmupCap}
                                min={20}
                                step={10}
                            />
                            <div className="flex justify-between items-center">
                               <p className="text-xs text-muted-foreground">Cannot exceed warm-up cap of {warmupCap}.</p>
                               <Button size="sm" onClick={() => handleSaveCap(inbox.email)}>
                                   <Save className="mr-2 h-3 w-3" /> Save
                               </Button>
                            </div>
                        </div>
                    ) : (
                        <Progress
                            id={`cap-${inbox.email}`}
                            value={(inbox.dailyCapUsed / inbox.dailySendCap) * 100}
                            className="h-2"
                        />
                    )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 border-t pt-4">
                <Button variant="ghost" size="sm" onClick={() => handleRefresh(inbox.email)} disabled={refreshingInbox === inbox.email}>
                  {refreshingInbox === inbox.email ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="mr-2 h-4 w-4" />
                  )}
                   Refresh
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleOpenSettings(inbox)}>
                  Settings
                </Button>
              </CardFooter>
            </Card>
          )})}
        </div>
      </div>
      </TooltipProvider>
      {selectedInbox && (
        <InboxSettingsDialog
          open={isSettingsOpen}
          onOpenChange={setIsSettingsOpen}
          inbox={selectedInbox}
          onSave={handleSaveInbox}
        />
      )}
      {selectedInbox && (
        <InboxHealthSheet
            open={isHealthSheetOpen}
            onOpenChange={setIsHealthSheetOpen}
            inbox={selectedInbox}
            onSave={handleSaveInbox}
        />
      )}
       <AddInboxWizard
        open={isAddWizardOpen}
        onOpenChange={setIsAddWizardOpen}
        onAddInbox={handleAddInbox}
        inboxes={inboxes}
      />
    </>
  );
}
