
'use client';

import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, LineChart, Shield, CalendarClock, Download, Link as LinkIcon, Thermometer } from 'lucide-react';
import { type Inbox } from '@/app/(app)/inbox-manager/page';
import { useToast } from '@/hooks/use-toast';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { Progress } from './ui/progress';
import { useRouter } from 'next/navigation';

interface InboxHealthSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inbox: Inbox;
  onSave: (inbox: Inbox) => void;
}

const healthFactorsConfig = [
    { key: 'auth', label: 'Auth', weight: 30, color: 'bg-blue-500' },
    { key: 'bounce', label: 'Bounce', weight: 25, color: 'bg-red-500' },
    { key: 'spam', label: 'Spam', weight: 25, color: 'bg-yellow-500' },
    { key: 'warmup', label: 'Warm-up', weight: 10, color: 'bg-green-500' },
    { key: 'errors', label: 'Errors', weight: 10, color: 'bg-orange-500' },
];

const mockChartData = [
  { day: 'M', value: 5 }, { day: 'T', value: 4 }, { day: 'W', value: 6 },
  { day: 'T', value: 3 }, { day: 'F', value: 7 }, { day: 'S', value: 2 }, { day: 'S', value: 1 },
];

const mockIssues = [
    "Spam placement 6.2% at Outlook",
    "DMARC p=none",
    "Warm-up day 3/14",
];


export function InboxHealthSheet({
  open,
  onOpenChange,
  inbox,
  onSave,
}: InboxHealthSheetProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [currentInbox, setCurrentInbox] = useState(inbox);

  const handleReduceCap = () => {
    const newCap = Math.floor(currentInbox.dailySendCap * 0.75);
    const updatedInbox = { ...currentInbox, dailySendCap: newCap };
    setCurrentInbox(updatedInbox);
    onSave(updatedInbox);
    toast({
      title: 'Action Applied',
      description: `Daily cap for ${inbox.email} reduced to ${newCap}.`,
    });
  };
  
  const handleExtendWarmup = () => {
      const scheduleOrder: ("aggressive" | "balanced" | "conservative")[] = ["aggressive", "balanced", "conservative"];
      const currentIndex = scheduleOrder.indexOf(currentInbox.warmup.schedule);
      if (currentIndex < scheduleOrder.length - 1) {
          const newSchedule = scheduleOrder[currentIndex + 1];
          const updatedInbox = { ...currentInbox, warmup: {...currentInbox.warmup, schedule: newSchedule } };
          setCurrentInbox(updatedInbox);
          onSave(updatedInbox);
           toast({
              title: 'Action Applied',
              description: `Warm-up for ${inbox.email} set to ${newSchedule}.`,
            });
      } else {
           toast({
              variant: 'destructive',
              title: 'Action Not Applicable',
              description: `Warm-up schedule is already at the most conservative setting.`,
            });
      }
  }
  
  const handleOpenDnsHelper = () => {
      router.push('/deliverability');
      onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl w-full">
        <SheetHeader>
          <SheetTitle>Health Analysis for {inbox.email}</SheetTitle>
          <SheetDescription>
            Review the health factors and take action to improve deliverability.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-6">
            <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">Health Breakdown</h4>
                <div className="space-y-3">
                {healthFactorsConfig.map(factor => {
                    const value = inbox.healthFactors[factor.key as keyof typeof inbox.healthFactors];
                    const percentage = (value / factor.weight) * 100;
                    return (
                        <div key={factor.key} className="grid grid-cols-4 items-center gap-2 text-sm">
                            <span className="text-muted-foreground col-span-1">{factor.label}</span>
                            <div className="col-span-3 flex items-center gap-2">
                                <Progress value={percentage} indicatorClassName={factor.color} className="h-2 flex-grow"/>
                                <span className="font-medium w-12 text-right">{value}/{factor.weight}</span>
                            </div>
                        </div>
                    );
                })}
                </div>
            </div>

            <Separator />

             <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">Last 7 Days</h4>
                <div className="grid grid-cols-3 gap-4">
                    {['Bounce %', 'Spam %', 'Sends/Day'].map(label => (
                        <div key={label} className="text-center">
                            <p className="text-xs text-muted-foreground">{label}</p>
                            <div className="h-16">
                                <ChartContainer config={{}} className="w-full h-full">
                                    <BarChart accessibilityLayer data={mockChartData}>
                                        <Bar dataKey="value" fill="hsl(var(--primary))" />
                                        <XAxis dataKey="day" hide />
                                    </BarChart>
                                </ChartContainer>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

             <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">Top Issues</h4>
                <div className="flex flex-wrap gap-2">
                    {mockIssues.map(issue => (
                        <Badge key={issue} variant="destructive">{issue}</Badge>
                    ))}
                </div>
             </div>
             
             <Separator />

             <div className="space-y-4">
                <h4 className="font-semibold">Recommended Actions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Button variant="outline" onClick={handleReduceCap}><Thermometer className="mr-2" /> Reduce cap by 25%</Button>
                    <Button variant="outline"><CalendarClock className="mr-2" /> Pause this inbox 24h</Button>
                    <Button variant="outline" onClick={handleOpenDnsHelper}><Shield className="mr-2" /> Open DNS Helper</Button>
                    <Button variant="outline" onClick={handleExtendWarmup}><Download className="mr-2" /> Extend warm-up</Button>
                </div>
             </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
