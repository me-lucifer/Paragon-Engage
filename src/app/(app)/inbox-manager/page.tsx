
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
import { PlusCircle, Inbox, RefreshCw, AlertCircle } from 'lucide-react';
import InboxSettingsDialog from '@/components/inbox-settings-dialog';

const inboxes = [
  {
    email: 'sales@paragon.com',
    domain: 'paragon.com',
    provider: 'Google Workspace',
    status: 'Connected',
    health: 98,
    dailyCap: '500/500',
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
    status: 'Connected',
    health: 95,
    dailyCap: '480/500',
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
    status: 'Warming',
    health: 75,
    dailyCap: '50/100',
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
    status: 'Error',
    health: 0,
    dailyCap: '0/500',
    fromName: 'Paragon Outreach',
    signature: 'Best,\nThe Paragon Team',
     warmup: {
        enabled: false,
        schedule: 'conservative',
    },
    dailySendCap: 500,
  },
];

export type Inbox = (typeof inboxes)[0];

export default function InboxManagerPage() {
  const [selectedInbox, setSelectedInbox] = useState<Inbox | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleOpenSettings = (inbox: Inbox) => {
    setSelectedInbox(inbox);
    setIsSettingsOpen(true);
  };

  const handleSaveSettings = (updatedInbox: Inbox) => {
    // In a real app, you would save this to a backend.
    console.log("Saving inbox settings:", updatedInbox);
    // For this prototype, we'll just close the dialog.
    setIsSettingsOpen(false);
  };

  return (
    <>
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
          <Button>
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
                        : ''
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
                    <Label
                      htmlFor={`health-${inbox.email}`}
                      className="text-sm font-medium"
                    >
                      Inbox Health
                    </Label>
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
      {selectedInbox && (
        <InboxSettingsDialog
          open={isSettingsOpen}
          onOpenChange={setIsSettingsOpen}
          inbox={selectedInbox}
          onSave={handleSaveSettings}
        />
      )}
    </>
  );
}
