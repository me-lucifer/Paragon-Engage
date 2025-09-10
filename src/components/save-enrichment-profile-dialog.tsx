
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';

interface SaveEnrichmentProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SaveEnrichmentProfileDialog({
  open,
  onOpenChange,
}: SaveEnrichmentProfileDialogProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save Enrichment Profile</DialogTitle>
          <DialogDescription>
            Save the current enrichment rules as a new profile.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="profile-name">Profile Name</Label>
                <Input id="profile-name" placeholder="e.g., PE Add-on Discovery" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="profile-desc">Description (Optional)</Label>
                <Textarea id="profile-desc" placeholder="Describe the use case for this profile..." />
            </div>
             <div className="flex items-center justify-between p-3 border rounded-lg">
                <Label htmlFor="org-wide" className="font-medium">Organization-wide</Label>
                <Switch id="org-wide" defaultChecked />
            </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Save Profile</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
