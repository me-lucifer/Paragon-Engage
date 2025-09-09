
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const leadsData = [
  // Positive Intent
  { name: 'John Smith', company: 'Precision Accounts', thread: 'Re: Your services', intent: 'Positive', nextAction: 'Schedule Meeting', owner: 'A. Bhandari' },
  { name: 'Maria Garcia', company: 'Veritas Financials', thread: 'Great, thanks!', intent: 'Positive', nextAction: 'Follow-up in 1w', owner: 'J. Doe' },
  { name: 'Dr. Anna Williams', company: 'Bright Smile Dental', thread: 'Yes, let\'s talk', intent: 'Positive', nextAction: 'Schedule Meeting', owner: 'A. Bhandari' },
  { name: 'Kevin Brown', company: 'Secure IT Solutions', thread: 'Looks interesting', intent: 'Positive', nextAction: 'Send Info', owner: 'J. Doe' },
  { name: 'Daniel Rodriguez', company: 'Cloud Cover MSP', thread: 'Can you call me?', intent: 'Positive', nextAction: 'Schedule Meeting', owner: 'A. Bhandari' },

  // Neutral Intent
  { name: 'David Lee', company: 'Keystone CPA', thread: 'Got it, thanks', intent: 'Neutral', nextAction: 'Send Info', owner: 'System' },
  { name: 'Dr. Mark Harris', company: 'Prestige Dentistry', thread: 'Acknowledged', intent: 'Neutral', nextAction: 'Archive', owner: 'System' },
  { name: 'Rachel Green', company: 'Proactive Tech', thread: 'Is this automated?', intent: 'Neutral', nextAction: 'Send Info', owner: 'J. Doe' },
  { name: 'Lukas Weber', company: 'EuroBalance', thread: 'What are your rates?', intent: 'Neutral', nextAction: 'Send Info', owner: 'System' },

  // Negative Intent
  { name: 'Emily White', company: 'Summit Tax', thread: 'Not interested', intent: 'Negative', nextAction: 'DNC', owner: 'System' },
  { name: 'Max Muller', company: 'Berlin IT Services', thread: 'Unsubscribe', intent: 'Negative', nextAction: 'DNC', owner: 'System' },
  { name: 'Dr. Schmidt', company: 'ZahnKlinik Berlin', thread: 'Remove me', intent: 'Negative', nextAction: 'DNC', owner: 'System' },
];


export default function LeadsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Lead Triage
            </h1>
            <p className="text-muted-foreground">
                Review, qualify, and take action on incoming leads.
            </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Lead Manually
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Incoming Leads</CardTitle>
           <CardDescription>
            Showing all new and unassigned leads.
          </CardDescription>
        </CardHeader>
        <CardContent>
           {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
           ) : (
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Contact</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Thread Preview</TableHead>
                    <TableHead>Intent</TableHead>
                    <TableHead>Next Action</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>
                    <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {leadsData.map((lead) => (
                    <TableRow key={lead.name}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>{lead.company}</TableCell>
                    <TableCell className="text-muted-foreground">{lead.thread}</TableCell>
                    <TableCell>
                        <Badge 
                            variant={lead.intent === 'Positive' ? 'default' : lead.intent === 'Negative' ? 'destructive' : 'secondary'}
                            className={
                                lead.intent === 'Positive' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' :
                                lead.intent === 'Negative' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200' : ''
                            }
                        >
                            {lead.intent}
                        </Badge>
                    </TableCell>
                    <TableCell>{lead.nextAction}</TableCell>
                    <TableCell>{lead.owner}</TableCell>
                    <TableCell>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Assign</DropdownMenuItem>
                            <DropdownMenuItem>Snooze</DropdownMenuItem>
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                            <DropdownMenuItem>Convert to Meeting</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
