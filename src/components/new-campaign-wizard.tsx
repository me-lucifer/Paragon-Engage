
'use client';

import { useState, useMemo } from 'react';
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
import { ArrowRight, Inbox, AlertTriangle, CalendarDays, Info, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface NewCampaignWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inboxes: { email: string; status: string; dailySendCap: number, health: number }[];
}

export function NewCampaignWizard({ open, onOpenChange, inboxes }: NewCampaignWizardProps) {
  const [step, setStep] = useState(1);
  const [touches, setTouches] = useState(250);

  const reset = () => {
    setStep(1);
    setTouches(250);
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
  const warmedInboxes = useMemo(() => inboxes.filter(ib => ib.status === 'Connected'), [inboxes]);
  const totalInboxes = inboxes.length;
  const aggregateCapacity = Math.floor(warmedInboxes.reduce((acc, ib) => acc + ib.dailySendCap, 0) * 0.8);
  const daysToComplete = aggregateCapacity > 0 ? Math.ceil(500 / aggregateCapacity) : 'N/A';
  const bottlenecks = useMemo(() => inboxes.filter(ib => ib.status === 'Warming'), [inboxes]);
  
  const plan = useMemo(() => {
    const weightedInboxes = warmedInboxes.map(ib => ({
      ...ib,
      weight: ib.health * ib.dailySendCap,
    }));

    const totalWeight = weightedInboxes.reduce((sum, ib) => sum + ib.weight, 0);

    if (totalWeight === 0) return [];
    
    return weightedInboxes.map(ib => ({
      email: ib.email,
      sends: Math.floor((ib.weight / totalWeight) * touches),
    }));
  }, [warmedInboxes, touches]);


  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>New Campaign</DialogTitle>
          <DialogDescription>
            Step {step} of 3: {
                step === 1 ? 'Select Segment & Sequence' :
                step === 2 ? 'Capacity & Schedule' :
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
               <div className="grid md:grid-cols-2 gap-6">
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
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Throttles</CardTitle>
                        </CardHeader>
                         <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-touches">Max new first-touches/day</Label>
                                <Input id="first-touches" type="number" value={touches} onChange={e => setTouches(parseInt(e.target.value, 10) || 0)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="domain-cap">Per-domain cap/day</Label>
                                <Input id="domain-cap" type="number" defaultValue="400" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="inbox-cap">Per-inbox cap/day (from Inbox Mgr)</Label>
                                <Input id="inbox-cap" defaultValue={Math.min(...warmedInboxes.map(ib => ib.dailySendCap))} readOnly />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Today's Plan</CardTitle>
                             <CardDescription>Estimated sends per inbox.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <Table>
                               <TableHeader>
                                   <TableRow>
                                       <TableHead>Inbox</TableHead>
                                       <TableHead className="text-right">Sends</TableHead>
                                   </TableRow>
                               </TableHeader>
                               <TableBody>
                                   {plan.map(p => (
                                       <TableRow key={p.email}>
                                           <TableCell className="text-xs truncate">{p.email}</TableCell>
                                           <TableCell className="text-right font-medium">{p.sends}</TableCell>
                                       </TableRow>
                                   ))}
                                    <TableRow className="font-bold bg-muted/50">
                                        <TableCell>Total</TableCell>
                                        <TableCell className="text-right">{plan.reduce((sum, p) => sum + p.sends, 0)}</TableCell>
                                    </TableRow>
                               </TableBody>
                           </Table>
                        </CardContent>
                    </Card>
                </div>
               </div>
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
