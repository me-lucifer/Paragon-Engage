
'use client';

import { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Inbox, AlertTriangle, CalendarDays, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface NewCampaignWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inboxes: { email: string; status: string; dailySendCap: number }[];
}

export function NewCampaignWizard({ open, onOpenChange, inboxes }: NewCampaignWizardProps) {
  const [step, setStep] = useState(1);

  const reset = () => {
    setStep(1);
  };
  
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      reset();
    }
    onOpenChange(isOpen);
  };
  
  const handleNextStep = () => {
      setStep(s => s + 1);
  }

  // Capacity Planner calculations
  const warmedInboxes = inboxes.filter(ib => ib.status === 'Connected');
  const totalInboxes = inboxes.length;
  const aggregateCapacity = Math.floor(warmedInboxes.reduce((acc, ib) => acc + ib.dailySendCap, 0) * 0.8);
  const daysToComplete = aggregateCapacity > 0 ? Math.ceil(500 / aggregateCapacity) : 'N/A';
  const bottlenecks = inboxes.filter(ib => ib.status === 'Warming');
  

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>New Campaign</DialogTitle>
          <DialogDescription>
            Step {step} of 3: {
                step === 1 ? 'Select Segment & Sequence' :
                step === 2 ? 'Review & Plan Capacity' :
                'Confirm & Launch'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
            {step === 1 && (
                <div className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="campaign-name">Campaign Name</Label>
                        <Input id="campaign-name" placeholder="e.g., Q4 Accounting Outreach" />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="segment">Segment</Label>
                        <Select>
                            <SelectTrigger id="segment">
                                <SelectValue placeholder="Select a segment" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="accounting">Accounting (CPAs)</SelectItem>
                                <SelectItem value="it-msp">IT MSPs</SelectItem>
                                <SelectItem value="dental">Dental Clinics</SelectItem>
                            </SelectContent>
                        </Select>
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="sequence">Sequence</Label>
                        <Select>
                            <SelectTrigger id="sequence">
                                <SelectValue placeholder="Select a sequence" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pe-intro">PE Intro (A/B Test)</SelectItem>
                                <SelectItem value="hf-am-intro">HF-AM Intro (A/B Test)</SelectItem>
                                <SelectItem value="it-msp-intro">IT MSP Intro v1</SelectItem>
                            </SelectContent>
                        </Select>
                     </div>
                </div>
            )}
            {step === 2 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">Send Capacity Planner</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Inbox className="h-4 w-4" />
                                <span>Inbox Pool</span>
                            </div>
                            <span className="font-medium">{warmedInboxes.length}/{totalInboxes} Warmed</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <ArrowRight className="h-4 w-4" />
                                <span>Aggregate Daily Capacity</span>
                            </div>
                            <span className="font-medium">{aggregateCapacity} First-touches</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <CalendarDays className="h-4 w-4" />
                                <span>Est. Days to Complete 500</span>
                            </div>
                            <span className="font-medium">{daysToComplete} Days</span>
                        </div>
                        {bottlenecks.length > 0 && (
                            <div className="flex justify-between items-start pt-2">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                    <span>Bottlenecks</span>
                                </div>
                                <div className="text-right">
                                    {bottlenecks.map(b => (
                                        <Badge key={b.email} variant="secondary" className="font-normal">{b.email} (warming)</Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="flex items-start gap-3 rounded-lg border bg-muted/50 p-3 text-xs mt-4">
                            <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <p className="text-muted-foreground">
                                First-touches respect Max New/Day and follow-ups are scheduled separately.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
             {step === 3 && (
                <div className="text-center py-8">
                    <h3 className="font-semibold">Ready to Launch?</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                        Your campaign will be activated and contacts will begin to be processed.
                    </p>
                </div>
            )}
        </div>

        <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            {step < 3 ? (
                <Button type="button" onClick={handleNextStep}>
                    {step === 1 ? 'Next: Plan Capacity' : 'Next: Confirm'}
                </Button>
            ) : (
                 <Button type="submit" onClick={() => onOpenChange(false)}>
                    Launch Campaign
                </Button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
