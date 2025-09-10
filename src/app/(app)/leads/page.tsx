
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
import { PlusCircle, MoreHorizontal, CheckCircle, ShieldAlert, HelpCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import ConvertLeadDialog from '@/components/convert-lead-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import LeadExplanationSheet from '@/components/lead-explanation-sheet';


type LeadExplanation = {
  ruleMatch?: string;
  mlScore?: number;
  llmRationale?: string;
};

type Lead = {
  name: string;
  company: string;
  thread: string;
  intent: 'Positive' | 'Neutral' | 'Negative';
  nextAction: string;
  owner: string;
  explanation: LeadExplanation;
  status?: 'default' | 'suppressed' | 'meeting_created';
  suppressionReason?: string;
};

const initialLeadsData: Lead[] = [
  // Positive Intent
  { name: 'John Smith', company: 'Precision Accounts', thread: 'Re: Your services', intent: 'Positive', nextAction: 'Schedule Meeting', owner: 'A. Bhandari', explanation: { mlScore: 0.92, llmRationale: "User expresses clear interest in scheduling a meeting." } },
  { name: 'Maria Garcia', company: 'Veritas Financials', thread: 'Great, thanks!', intent: 'Positive', nextAction: 'Follow-up in 1w', owner: 'J. Doe', explanation: { mlScore: 0.88, llmRationale: "Positive sentiment and gratitude indicate interest." } },
  { name: 'Dr. Anna Williams', company: 'Bright Smile Dental', thread: 'Yes, let\'s talk', intent: 'Positive', nextAction: 'Schedule Meeting', owner: 'A. Bhandari', explanation: { ruleMatch: "let's talk", mlScore: 0.95 } },
  { name: 'Kevin Brown', company: 'Secure IT Solutions', thread: 'Looks interesting', intent: 'Positive', nextAction: 'Send Info', owner: 'J. Doe', explanation: { ruleMatch: "looks interesting", mlScore: 0.81 } },
  { name: 'Daniel Rodriguez', company: 'Cloud Cover MSP', thread: 'Can you call me?', intent: 'Positive', nextAction: 'Schedule Meeting', owner: 'A. Bhandari', explanation: { mlScore: 0.93, llmRationale: "Direct request for a call is a strong positive signal." } },

  // Neutral Intent
  { name: 'David Lee', company: 'Keystone CPA', thread: 'Got it, thanks', intent: 'Neutral', nextAction: 'Send Info', owner: 'System', explanation: { mlScore: 0.55, llmRationale: "Simple acknowledgement, no clear positive or negative intent." } },
  { name: 'Dr. Mark Harris', company: 'Prestige Dentistry', thread: 'Acknowledged', intent: 'Neutral', nextAction: 'Archive', owner: 'System', explanation: { mlScore: 0.51 } },
  { name: 'Rachel Green', company: 'Proactive Tech', thread: 'Is this automated?', intent: 'Neutral', nextAction: 'Send Info', owner: 'J. Doe', explanation: { mlScore: 0.60, llmRationale: "A question about the process, neither positive nor negative." } },
  { name: 'Lukas Weber', company: 'EuroBalance', thread: 'What are your rates?', intent: 'Neutral', nextAction: 'Send Info', owner: 'System', explanation: { ruleMatch: "what are your", mlScore: 0.65 } },

  // Negative Intent
  { name: 'Emily White', company: 'Summit Tax', thread: 'Not interested', intent: 'Negative', nextAction: 'DNC', owner: 'System', explanation: { ruleMatch: "not interested", mlScore: 0.98 } },
  { name: 'Max Muller', company: 'Berlin IT Services', thread: 'Unsubscribe', intent: 'Negative', nextAction: 'DNC', owner: 'System', explanation: { ruleMatch: "unsubscribe", mlScore: 0.99 } },
  { name: 'Dr. Schmidt', company: 'ZahnKlinik Berlin', thread: 'Remove me', intent: 'Negative', nextAction: 'DNC', owner: 'System', explanation: { ruleMatch: "remove me", mlScore: 0.97 } },
];


export default function LeadsPage() {
  const [loading, setLoading] = useState(true);
  const [leadsData, setLeadsData] = useState<Lead[]>(initialLeadsData);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isConvertDialogOpen, setIsConvertDialogOpen] = useState(false);
  const [isExplainSheetOpen, setIsExplainSheetOpen] = useState(false);
  const [explainedLead, setExplainedLead] = useState<Lead | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  
  const handleOpenConvertDialog = (lead: Lead) => {
    setSelectedLead(lead);
    setIsConvertDialogOpen(true);
  };
  
  const handleOpenExplainSheet = (lead: Lead) => {
    setExplainedLead(lead);
    setIsExplainSheetOpen(true);
  };

  const handleSuppress = (leadName: string) => {
    setLeadsData(prev => 
      prev.map(lead => 
        lead.name === leadName ? { ...lead, status: 'suppressed', nextAction: 'DNC', suppressionReason: 'Manual DNC' } : lead
      )
    );
  };

  const handleSaveMeeting = (leadName: string) => {
    setLeadsData(prev => 
      prev.map(lead => 
        lead.name === leadName ? { ...lead, status: 'meeting_created', nextAction: 'Meeting Created' } : lead
      )
    );
    setIsConvertDialogOpen(false);
  };


  return (
    <>
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
                      <TableRow key={lead.name} className={lead.status === 'suppressed' ? 'bg-muted/30' : ''}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>{lead.company}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {lead.status === 'suppressed' ? (
                             <Alert variant="destructive" className="p-2 text-xs">
                                <ShieldAlert className="h-4 w-4" />
                                <AlertTitle>Contact Suppressed</AlertTitle>
                                <AlertDescription>
                                    Reason: {lead.suppressionReason}
                                </AlertDescription>
                            </Alert>
                        ) : (
                             <div>{lead.thread}</div>
                        )}
                        <div className="text-xs text-gray-400 mt-1">Sent by: {lead.owner}</div>
                      </TableCell>
                      <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge 
                                variant={lead.intent === 'Positive' ? 'default' : lead.intent === 'Negative' ? 'destructive' : 'secondary'}
                                className={
                                    lead.intent === 'Positive' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' :
                                    lead.intent === 'Negative' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200' : ''
                                }
                            >
                                {lead.intent}
                            </Badge>
                             <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleOpenExplainSheet(lead)}>
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                             </Button>
                          </div>
                      </TableCell>
                      <TableCell>
                        {lead.status === 'suppressed' ? (
                            <Badge variant="outline" className="border-yellow-600 text-yellow-600">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Suppressed
                            </Badge>
                        ) : lead.status === 'meeting_created' ? (
                             <Badge variant="secondary">Meeting Created</Badge>
                        ) : (
                            lead.nextAction
                        )}
                      </TableCell>
                      <TableCell>{lead.owner}</TableCell>
                      <TableCell>
                          <DropdownMenu>
                          <DropdownMenuTrigger asChild disabled={lead.status === 'suppressed'}>
                              <Button aria-haspopup="true" size="icon" variant="ghost" disabled={lead.status === 'suppressed'}>
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                              </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Assign</DropdownMenuItem>
                              <DropdownMenuItem>Snooze</DropdownMenuItem>
                              <DropdownMenuItem>Archive</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleOpenConvertDialog(lead)}>Convert to Meeting</DropdownMenuItem>
                               <DropdownMenuItem onClick={() => handleSuppress(lead.name)} className="text-destructive">
                                Suppress
                              </DropdownMenuItem>
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
      {selectedLead && (
        <ConvertLeadDialog
          open={isConvertDialogOpen}
          onOpenChange={setIsConvertDialogOpen}
          lead={selectedLead}
          onSave={handleSaveMeeting}
        />
      )}
      {explainedLead && (
        <LeadExplanationSheet
          open={isExplainSheetOpen}
          onOpenChange={setIsExplainSheetOpen}
          lead={explainedLead}
        />
      )}
    </>
  );
}
