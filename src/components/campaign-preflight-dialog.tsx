
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle, Inbox, Shield } from 'lucide-react';
import Link from 'next/link';

export type InboxIssue = {
  email: string;
  issues: string[];
};

interface CampaignPreflightDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaignName: string;
  issues: InboxIssue[];
}

export function CampaignPreflightDialog({
  open,
  onOpenChange,
  campaignName,
  issues,
}: CampaignPreflightDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <DialogTitle className="text-center mt-4">Campaign Pre-flight Check Failed</DialogTitle>
          <DialogDescription className="text-center">
            Cannot start "{campaignName}" because some inboxes have critical issues.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="max-h-60 overflow-y-auto rounded-md border p-4 space-y-3">
            {issues.map((inboxIssue) => (
              <div key={inboxIssue.email}>
                <p className="font-semibold">{inboxIssue.email}</p>
                <ul className="list-disc pl-5 text-sm text-muted-foreground">
                  {inboxIssue.issues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter className="sm:justify-between flex-col sm:flex-row gap-2">
            <div className="flex gap-2">
                 <Link href="/inbox-manager">
                    <Button variant="outline"><Inbox className="mr-2 h-4 w-4" /> Fix in Inbox Manager</Button>
                </Link>
                 <Link href="/deliverability">
                    <Button variant="outline"><Shield className="mr-2 h-4 w-4" /> Fix in Deliverability</Button>
                </Link>
            </div>
            <Button disabled>Start Anyway</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
