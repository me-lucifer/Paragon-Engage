
'use client';

import { useState, useEffect } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import type { Inbox } from '@/app/(app)/inbox-manager/page';
import { useToast } from '@/hooks/use-toast';
import { Separator } from './ui/separator';

interface InboxSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inbox: Inbox;
  onSave: (inbox: Inbox) => void;
}

const WARMUP_CAPS = {
  conservative: 50,
  balanced: 100,
  aggressive: 200,
};

export default function InboxSettingsDialog({
  open,
  onOpenChange,
  inbox,
  onSave,
}: InboxSettingsDialogProps) {
  const [currentSettings, setCurrentSettings] = useState(inbox);
  const { toast } = useToast();

  useEffect(() => {
    setCurrentSettings(inbox);
  }, [inbox]);

  const handleSave = () => {
    onSave(currentSettings);
    toast({
        title: "Settings Saved",
        description: `Settings for ${inbox.email} have been updated.`,
    });
  };
  
  const handleTestSend = () => {
      toast({
          title: "Test Sent",
          description: `A test email has been sent from ${inbox.email}.`
      })
  }

  const handleWarmupScheduleChange = (value: "conservative" | "balanced" | "aggressive") => {
    setCurrentSettings(prev => ({
        ...prev,
        warmup: { ...prev.warmup, schedule: value },
        // Reset daily send cap if it exceeds the new warm-up cap
        dailySendCap: Math.min(prev.dailySendCap, WARMUP_CAPS[value]),
    }));
  }

  const warmupCap = WARMUP_CAPS[currentSettings.warmup.schedule];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Inbox Settings — {inbox.email}</DialogTitle>
          <DialogDescription>
            Configure the sending behavior for this mailbox.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto pr-6 pl-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label>Provider</Label><p className="text-sm text-muted-foreground">{inbox.provider}</p></div>
                <div><Label>Domain</Label><p className="text-sm text-muted-foreground">{inbox.domain}</p></div>
                <div><Label>Status</Label><p><Badge variant={inbox.status === 'Connected' ? 'default' : 'secondary'}>{inbox.status}</Badge></p></div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="from-name">From Name</Label>
                    <Input id="from-name" value={currentSettings.fromName} onChange={e => setCurrentSettings(s => ({...s, fromName: e.target.value}))} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="reply-to">Reply-To Address (Optional)</Label>
                    <Input id="reply-to" placeholder="e.g., replies@paragon.com" />
                </div>
                 <div className="space-y-2 col-span-2">
                    <Label htmlFor="signature">Signature</Label>
                    <Textarea id="signature" rows={4} value={currentSettings.signature} onChange={e => setCurrentSettings(s => ({...s, signature: e.target.value}))}/>
                </div>
            </div>

            <Separator />
            
            <div className="space-y-4">
                <h4 className="font-semibold text-lg">Warm-up</h4>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <Label htmlFor="warmup-enabled">Enable Warm-up</Label>
                    <Switch id="warmup-enabled" checked={currentSettings.warmup.enabled} onCheckedChange={checked => setCurrentSettings(s => ({...s, warmup: {...s.warmup, enabled: checked}}))} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <Label htmlFor="warmup-schedule">Schedule</Label>
                        <Select value={currentSettings.warmup.schedule} onValueChange={handleWarmupScheduleChange} disabled={!currentSettings.warmup.enabled}>
                            <SelectTrigger id="warmup-schedule">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="conservative">Conservative</SelectItem>
                                <SelectItem value="balanced">Balanced</SelectItem>
                                <SelectItem value="aggressive">Aggressive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label>Today's Warm-up Cap</Label>
                        <Input value={currentSettings.warmup.enabled ? warmupCap : 'N/A'} readOnly disabled />
                    </div>
                </div>
            </div>

            <Separator />

            <div className="space-y-4">
                <h4 className="font-semibold text-lg">Sending Rules</h4>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Label htmlFor="daily-cap">Daily Send Cap</Label>
                        <span className="text-sm text-muted-foreground font-medium">{currentSettings.dailySendCap} emails</span>
                    </div>
                    <Slider id="daily-cap" value={[currentSettings.dailySendCap]} onValueChange={value => setCurrentSettings(s => ({...s, dailySendCap: value[0]}))} max={currentSettings.warmup.enabled ? warmupCap : 1000} min={20} step={10} />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <Label htmlFor="send-window">Business hours by recipient timezone</Label>
                    <Switch id="send-window" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <Label htmlFor="delay-jitter">Random Delay Jitter (±20%)</Label>
                    <Switch id="delay-jitter" defaultChecked />
                </div>
            </div>
        </div>
        <DialogFooter className="border-t pt-4 gap-2">
            <Button variant="secondary" onClick={handleTestSend} className="mr-auto">Test Send</Button>
            <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="accent" onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
