
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { HelpCircle } from 'lucide-react';

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

const WARMUP_DESCRIPTIONS = {
    conservative: "Ramps sending slowly, adding ~10 emails/day.",
    balanced: "A moderate ramp, adding ~20 emails/day.",
    aggressive: "Ramps sending quickly, adding ~35 emails/day.",
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
    setCurrentSettings(prev => {
        const newWarmupCap = prev.warmup.enabled ? WARMUP_CAPS[value] : 1000;
        return {
            ...prev,
            warmup: { ...prev.warmup, schedule: value },
            dailySendCap: Math.min(prev.dailySendCap, newWarmupCap),
        }
    });
  }

  const warmupCap = currentSettings.warmup.enabled ? WARMUP_CAPS[currentSettings.warmup.schedule] : 1000;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Inbox Settings — {inbox.email}</DialogTitle>
          <DialogDescription>
            Configure the sending behavior for this mailbox.
          </DialogDescription>
        </DialogHeader>
        <TooltipProvider>
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
                                {Object.entries(WARMUP_DESCRIPTIONS).map(([value, description]) => (
                                    <Tooltip key={value} delayDuration={300}>
                                        <TooltipTrigger asChild>
                                            <SelectItem value={value}>
                                                {value.charAt(0).toUpperCase() + value.slice(1)}
                                            </SelectItem>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            <p>{description}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label>Today's Warm-up Cap</Label>
                        <Input value={currentSettings.warmup.enabled ? WARMUP_CAPS[currentSettings.warmup.schedule] : 'N/A'} readOnly disabled />
                    </div>
                </div>
            </div>

            <Separator />

            <div className="space-y-4">
                <h4 className="font-semibold text-lg">Sending Rules</h4>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-1.5">
                            <Label htmlFor="daily-cap">Daily Send Cap</Label>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>We distribute campaign volume across your inbox pool to protect reputation.</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <span className="text-sm text-muted-foreground font-medium">{currentSettings.dailySendCap} emails</span>
                    </div>
                    <Slider id="daily-cap" value={[currentSettings.dailySendCap]} onValueChange={value => setCurrentSettings(s => ({...s, dailySendCap: value[0]}))} max={warmupCap} min={20} step={10} />
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
        </TooltipProvider>
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
